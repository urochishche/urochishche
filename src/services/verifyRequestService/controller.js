import firebase from 'firebase';

export default class VerifyRequestService {
    constructor($firebaseArray, $firebaseObject) {
        'ngInject';

        this.database = firebase.database();

        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
    }

    _getRequestRef(key) {
        return key ? this.database.ref(`request/${key}`) : this.database.ref('request');
    }

    addRequest(data) {
        const ref = this._getRequestRef();
        const list = this.$firebaseArray(ref);
        return list.$add({
                ...data,
                createTimestamp: Date.now()
            })
            .then(ref => {
                return ref.key;
            });
    }

    loadRequests() {
        const ref = this._getRequestRef();
        const list = this.$firebaseArray(ref);
        return list.$loaded();
    }

    getRequest(key) {
        const ref = this._getRequestRef(key);
        const obj = this.$firebaseObject(ref);
        return obj.$loaded();
    }

    removeRequest(key) {
        const ref = this._getObjectRef(key); 
        const obj = this.$firebaseObject(ref);
        return obj.$remove();
    }
};
