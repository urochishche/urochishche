export default class ObjectCardPageController {
    constructor($scope, ObjectService) {
        'ngInject';

        this.ObjectService = ObjectService;

        this._initObject();
    }

    _initObject() {
        this._startLoadProgress();
        this.ObjectService.getObject(this.id)
            .then(result => {
                this.object = result;
                this._stopLoadProgress();
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
