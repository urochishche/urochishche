export default class GeolocationService {
    constructor($q) {
        'ngInject';

        this.pos = $q((resolve, reject) => {
            window.navigator.geolocation.getCurrentPosition((pos) => {
                resolve(pos);
            }, reject, {
                timeout: 5000,
                enableHighAccuracy: true
            });
        });

    }

    getPosition() {
        return this.pos;
    }
};
