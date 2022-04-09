import { makeAutoObservable } from "mobx"

class Store {
    chats
    userInfo
    selectedContact
    contactList
    isLoggedOn
    registrationErrors
    unreadMessageSet

    constructor() {
        this.reset();
        makeAutoObservable(this);
    }
    reset() {
        this.chats = {};
        this.userInfo = {};
        this.selectedContact = null;
        this.contactList = [];
        this.isLoggedOn = false;
        this.registrationErrors = {};
        this.unreadMessageSet = new Set();
    }

    setUserInfo({ username, country, gender, age }) {
        this.userInfo.username = username;
        this.userInfo.country = country;
        this.userInfo.gender = gender;
        this.userInfo.age = age;
    }

    sendMessage(message) {
        const receiver = message.receiver;
        if (!this.chats[receiver]) {
            this.chats[receiver] = [message];
        } else {
            this.chats[receiver].push(message);
        }
        this.chats[receiver].slice();

        const idx = this.contactList.findIndex(contact => contact.username === receiver);
        if (idx > 0) {
            const contact = this.contactList[idx];
            delete this.contactList[idx];
            this.contactList.unshift(contact);
            this.contactList.slice();
        }
    }
    readMessage(username) {
        this.unreadMessageSet.delete(username);
    }

    receiveMessage(chatMessage) {
        if (!Array.isArray(this.chats[chatMessage.sender])) {
            this.chats[chatMessage.sender] = [];
        }
        this.chats[chatMessage.sender].push(chatMessage);
        this.chats[chatMessage.sender].slice();
        if(chatMessage.sender !== this.selectedContact){
            this.unreadMessageSet.add(chatMessage.sender);
        }
        
        const idx = this.contactList.findIndex(contact => contact.username === chatMessage.sender);
        if (idx > 0) {
            const contact = this.contactList[idx];
            delete this.contactList[idx];
            this.contactList.unshift(contact);
            this.contactList.slice();
        }
    }

    setSelectedContact(username) {
        this.selectedContact = username;
    }
    setContactList(contactList) {
        this.contactList = contactList;
    }

    userInfoUpdate(userInfo) {
        const idx = this.contactList.findIndex(elem => elem.username === userInfo.user.username);
        // handle remove
        if (!userInfo.online) {
            if (idx >= 0) {
                delete this.contactList[idx];
            }
        } else {
            if (idx < 0) {
                this.contactList.push(userInfo.user);
            }
        }
    }

    userRegister(registration) {
        this.registrationErrors = registration.errors;
        if (registration.errors != null && Object.keys(registration.errors).length === 0) {
            this.setUserInfo(registration.user);
            this.isLoggedOn = true;
        } else {
            this.userInfo = {};
        }
    }
    setIsLoggedOn(isLoggedOn) {
        this.isLoggedOn = isLoggedOn;
    }
}

const store = new Store();
export default store;