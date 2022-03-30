import { makeAutoObservable } from "mobx"

class Store {
    chats = {}
    userInfo = {}
    activeContact
    contactList = []
    connected = false
    constructor() {
        makeAutoObservable(this)
    }
    reset() {
        this.chats = {};
        this.userInfo = {};
        this.selectedContact = null;
        this.contactList = [];
    }

    setUserInfo(username, country, gender, age) {
        this.userInfo.username = username;
        this.userInfo.country = country;
        this.userInfo.gender = gender;
        this.userInfo.age = age;
    }

    addMessage(sender, receive, message) {

    }

    setActiveContact(username) {
        this.activeContact = username;
    }
    setContactList(contactList) {
        this.contactList = contactList;
    }

    userInfoUpdate(user) {

    }
    
    addContact(contact) {
        this.contactList.push(contact);
    }
    removeContact(contact) {
        const idx = this.contactList.findIndex(elem => elem.username === contact.username);
        if (idx >= 0) {
            delete this.contactList[idx];
        } else {
            console.error(contact.username + "is not found in the list!");
        }
    }
    isConnected(connected) {
        this.connected = connected;
    }
}

const store = new Store();
export default store;