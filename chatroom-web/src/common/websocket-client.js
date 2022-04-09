import chatroomStore from './store';

class WebsocketClient {
    constructor(endpoint) {

    }

    connect() {
        return new Promise((resolve, reject) => {
            if (this.websocket != null) {
                try {
                    this.websocket.close();
                } catch (ex) {
                    console.error(ex);
                }
            }

            this.websocket = new WebSocket(process.env.REACT_APP_CHATROOM_WEBSOCKET_ENDPOINT);
            this.websocket.onopen = (event) => {
                resolve();
                console.log('websocket opened');

                this.heartbeatInterval = setInterval(()=>{
                    this.websocket.send(JSON.stringify({
                        type:'HEARTBEAT'
                    }));
                }, 30000);
            }
            this.websocket.onmessage = (message) => {
                const msg = JSON.parse(message.data);
                const messageBody = msg.body;
                console.log(msg);
                switch (msg.type) {
                    case 'USER':
                        chatroomStore.userInfoUpdate(messageBody);
                        break;
                    case 'MESSAGE':
                        chatroomStore.receiveMessage(messageBody);
                        break;
                    case 'REGISTER':
                        chatroomStore.userRegister(messageBody);
                        break;
                    case 'CONTACT_LIST':
                        chatroomStore.setContactList(messageBody.users);
                        break;
                    default:
                        console.error('Unknown message type', msg);
                }
            };

            this.websocket.onerror = (event) => {
                console.log('websocket error');
                console.log("error", event);
            };

            this.websocket.onclose = (event) => {
                console.log('websocket close');
                chatroomStore.setIsLoggedOn(false);
                clearInterval(this.heartbeatInterval);
                reject(event);
            };
        });
    }

    login(userInfo) {
        this.websocket.send(JSON.stringify({
            type: 'REGISTER',
            body: userInfo
        }));
    }

    sendMessage(message) {
        this.websocket.send(JSON.stringify({
            type: 'MESSAGE',
            body: message
        }));
    }

    logout() {
        clearInterval(this.heartbeatInterval);
        this.websocket != null && this.websocket.close();
        chatroomStore.reset();
    }

}

const websocketClient = new WebsocketClient();
export default websocketClient;