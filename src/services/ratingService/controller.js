import firebase from 'firebase';

export default class RatingService {
    constructor($q, $firebaseArray, $firebaseObject, ObjectService, UserService) {
        'ngInject';

        this.database = firebase.database();

        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;

        this.ObjectService = ObjectService;
        this.UserService = UserService;
    }

    loadRating() {
        const ref = this.database.ref('rating');
        const list = this.$firebaseArray(ref);

        let ratingList;
        let objectList;

        return this.$q.all([
                list.$loaded(),
                this.ObjectService.loadObjects()
            ])
            .then(result => {
                ratingList = result[0];
                objectList = result[1];

                const requests = ratingList.map(item => {
                    return this.UserService.getUser(item.$id);
                });

                return this.$q.all(requests);
            })
            .then(users => {
                return ratingList.map(item => {
                    let visits = 0;

                    const rating = Object.keys(item.objects).reduce((sum, key) => {
                        const count = item.objects[key];
                        const object = this._findObjectByKey(objectList, key);
                        visits += count;
                        return sum + count * parseInt(object.inaccessibility, 10);
                    }, 0);

                    const objects = Object.keys(item.objects).map(key => {
                        const object = this._findObjectByKey(objectList, key);
                        const count = item.objects[key];
                        return Object.assign({}, object, { count });
                    });

                    const user = this._findUserById(users, item.$id);

                    return {
                        user,
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

    _findUserById(users, id) {
        let result;
        users.some(item => {
            return (item.id === id) && (result = item);
        });
        return result;
    }

    incVisit(data) {
        const { uid, objectId } = data;
        const ref = this.database.ref(`rating/${uid}`);
        const obj = this.$firebaseObject(ref);

        return obj.$loaded()
            .then(result => {
                const value = result.objects[objectId];
                result.objects[objectId] = value ? value + 1 : 1;
                Object.assign(result, {
                    editTimestamp: Date.now()
                });
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
