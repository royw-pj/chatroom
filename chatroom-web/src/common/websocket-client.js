import chatroomStore from './store';

class WebsocketClient {
    constructor(endpoint) {

    }

    connect() {
        if (this.websocket != null) {
            try {
                this.websocket.close();
            } catch (ex) {
                console.error(ex);
            }
        }

        const queryString = new URLSearchParams(chatroomStore.userInfo).toString();
        this.websocket = new WebSocket("ws://localhost:8080/chatroom-ws?" + queryString);
        this.websocket.onopen = (event) => {
            chatroomStore.isConnected(true);

        }
        this.websocket.onmessage = (message) => {
            const msg = JSON.stringify(message);
            const messageBody = msg.body;
            switch (msg.type) {
                case 'USER':
                    chatroomStore.userInfoUpdate(messageBody);
                    break;
                case 'MSG':
                    chatroomStore.addMessage(messageBody);
                    break;
                case 'CONTACT_LIST':
                    chatroomStore.setContactList(messageBody.users);
                    break;
                default:
                    console.error('Unknown message type', msg);
            }
        };

        this.websocket.onerror = (event) => {
            console.error("error", event);
        };

        this.websocket.onclose = (event) => {
            chatroomStore.isConnected(false);
        };
    }
    close() {
        this.websocket != null && this.websocket.close();
    }

    sendMessage(message) {
        this.websocket.send(message);
    }

    sendContactListRequest() {
        this.websocket.send();
    }
}

const websocketClient = new WebsocketClient();
export default websocketClient;