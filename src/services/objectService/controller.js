import firebase from 'firebase';

export default class ObjectService {
    constructor($firebaseArray, $firebaseObject) {
        'ngInject';

        this.ref = firebase.database().ref('object').orderByChild('name');

        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
    }

    loadObjects() {
        const list = this.$firebaseArray(this.ref);
        return list.$loaded();
    }

    getEnabledObject() {
        return this.loadObjects()
            .then(result => {
                return result.filter(item => item.enabled);
            });
    }

    getObject(key) {
        const obj = this._getObj(key);
        return obj.$loaded();
    }

    saveObject(key, data) {
        const obj = this._getObj(key);
        return obj.$loaded()
            .then(result => {
                Object.assign(result, data, {
                    editTimestamp: Date.now()
                });
                return obj.$save();
            })
            .then(ref => {
                return ref.key;
            });
    }

    addObject(data) {
        const list = this.$firebaseArray(this.ref);
        return list.$add({
                ...data,
                createTimestamp: Date.now(),
                enabled: false,
                validated: false,
                visitors: 1
            })
            .then(ref => {
                return ref.key;
            });
    }

    removeObject(key) {
        const obj = this._getObj(key);
        return obj.$remove();
    }

    _getObj(key) {
        const ref = firebase.database().ref(`object/${key}`);
        return this.$firebaseObject(ref);
    }
};
