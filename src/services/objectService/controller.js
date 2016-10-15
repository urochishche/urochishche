import firebase from 'firebase';

export default class ObjectService {
    constructor($q, $firebaseArray, $firebaseObject) {
        'ngInject';

        this.database = firebase.database();

        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
    }

    _getObjectRef(key) {
        return key ? this.database.ref(`objects/${key}`) : this.database.ref('objects');
    }

    loadObjects() {
        const ref = this._getObjectRef();
        return this._load(ref);
    }

    _load(ref) {
        const list = this.$firebaseArray(ref);
        return list.$loaded();
    }

    getObject(key) {
        const ref = this._getObjectRef(key);
        return this._get(ref);
    }

    _get(ref) {
        const obj = this.$firebaseObject(ref);
        return obj.$loaded();
    }

    saveObject(key, data) {
        const ref = this._getObjectRef(key);
        const obj = this.$firebaseObject(ref);
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
        const ref = this._getObjectRef();
        return this._add(ref, data);
    }

    _add(ref, data) {
        const list = this.$firebaseArray(ref);
        return list.$add({
                ...data,
                createTimestamp: Date.now(),
                visitors: 1
            })
            .then(ref => {
                return ref.key;
            });
    }

    removeObject(key) {
        const ref = this._getObjectRef(key); 
        return this._remove(ref);
    }

    _remove(ref) {
        const obj = this.$firebaseObject(ref);
        return obj.$remove();
    }
};
