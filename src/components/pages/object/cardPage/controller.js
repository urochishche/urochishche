export default class ObjectCardPageController {
    constructor($q, ObjectService, NgMap) {
        'ngInject';

        $q.all([
            this._initMap(NgMap),
            this._initObject(ObjectService)
        ])
        .then(result => {
            const map = result[0];
            const { latitude, longitude } = result[1];
            const latlng = new google.maps.LatLng(latitude, longitude);
            map.setCenter(latlng);
        });

        this._initIsEdit();
    }

    _initIsEdit() {
        this.isEdit = true;
    }

    _initMap(NgMap) {
        return NgMap.getMap();
    }

    _initObject(ObjectService) {
        this._startLoadProgress();
        return ObjectService.getObject(this.id)
            .then(result => {
                this.object = result;
                this.objectPosition = [
                    result.latitude,
                    result.longitude
                ];
                this._stopLoadProgress();
                return result;
            });
    }

    isRequire() {
        return this.object.visitors < 3;
    }

    getInaccessibilityDimension() {
        const { inaccessibility } = this.object;
        let result;
        if (inaccessibility === 1) {
            result = 'балл';
        } else if (inaccessibility < 5) {
            result = 'балла';
        } else {
            result = 'баллов';
        }
        return result;
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }
};
