import firebase from 'firebase';

export default class RatingService {
    constructor($q, $firebaseArray, $firebaseObject, ObjectService) {
        'ngInject';

        this.database = firebase.database();

        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;

        this.ObjectService = ObjectService;
    }

    removeUser(uid) {
        const ref = this.database.ref(`rating/${uid}`)
        const obj = this.$firebaseObject(ref);
        return obj.$remove();
    }

    addUser(user) {
        const ref = this.database.ref(`rating/${user.uid}`)
        const obj = this.$firebaseObject(ref);
        Object.assign(obj, {
            name: user.displayName,
            createTimestamp: Date.now()
        });
        return obj.$save();
    }

    loadRating() {
        const ref = this.database.ref('rating');
        const list = this.$firebaseArray(ref);

        return this.$q.all([
                list.$loaded(),
                this.ObjectService.loadObjects()
            ])
            .then(result => {
                const ratingList = result[0];
                const objectList = result[1];

                return ratingList.map(item => {
                    let visits = 0;
                    let rating = 0;
                    let objects = [];

                    if (item.objects) {
                        rating = Object.keys(item.objects).reduce((sum, key) => {
                            const count = item.objects[key];
                            const object = this._findObjectByKey(objectList, key);
                            visits += count;
                            return sum + count * parseInt(object.inaccessibility, 10);
                        }, 0);

                        objects = Object.keys(item.objects).map(key => {
                            const object = this._findObjectByKey(objectList, key);
                            const count = item.objects[key];
                            return Object.assign({}, object, { count });
                        });
                    }

                    return {
                        userName: item.name,
                        objects,
                        rating,
                        visits
                    };
                });
            });
    }

    _findObjectByKey(objects, key) {
        let result;
        objects.some(item => {
            return (item.$id === key) && (result = item);
        });
        return result;
    }

    incVisit(data) {
        const { uid, objectId } = data;
        const ref = this.database.ref(`rating/${uid}`);
        const obj = this.$firebaseObject(ref);

        return obj.$loaded()
            .then(result => {
                if (!result.objects) {
                    result.objects = {};
                }
                const value = result.objects[objectId];
                result.objects[objectId] = value ? value + 1 : 1;
                result.editTimestamp = Date.now();
                return obj.$save();
            })
            .then(() => {
                return this.ObjectService.getObject(objectId);
            })
            .then(object => {
                return this.ObjectService.saveObject(objectId, {
                    visitors: object.visitors + 1
                });
            });
    }
};
