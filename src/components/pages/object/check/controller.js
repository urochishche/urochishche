export default class ObjectCheckPageController {
    constructor($state, ObjectService) {
        'ngInject';

        this.$state = $state;
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

    submit() {

    }

    onClickCancelButton() {
        this._gotoObjectCard();
    }

    _gotoObjectCard() {
        this.$state.go('object.card', { id: this.id });
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }
};
