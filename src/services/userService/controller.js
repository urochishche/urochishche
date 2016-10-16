import firebase from 'firebase';

export default class UserService {
    constructor($firebaseObject) {
        'ngInject';

        this.database = firebase.database();
        this.$firebaseObject = $firebaseObject;
    }

    getUser(key) {
        const ref = this.database.ref(`users/${key}`)
        const obj = this.$firebaseObject(ref);
        return obj.$loaded()
            .then(result => {
                return {
                    id: result.$id,
                    name: result.name
                };
            });
    }
};
