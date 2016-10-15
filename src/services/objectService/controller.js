import firebase from 'firebase';

export default class ObjectService {
    constructor($q, $firebaseArray, $firebaseObject, AuthService) {
        'ngInject';

        this.database = firebase.database();

        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.AuthService = AuthService;
    }

    _getObjectRef(key) {
        return key ? this.database.ref(`objects/${key}`) : this.database.ref('objects');
    }

    loadObjects() {
        const ref = this._getObjectRef();
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
        const { uid } = this.AuthService.getAuth();
        return list.$add({
                ...data,
                createTimestamp: Date.now(),
                verifed: false,
                visitors: 1,
                uid
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
