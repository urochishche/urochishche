export default class ObjectListPageController {
    constructor(ObjectService) {
        'ngInject';

        this._initObjectList(ObjectService);
    }

    _initObjectList(ObjectService) {
        this._startLoadProgress();
        ObjectService.getEnabledObject()
            .then(result => {
                console.log(result)
                this.list = result;
                this._stopLoadProgress();
            });
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }
};
