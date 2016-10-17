export default class ObjectCheckPageController {
    constructor($state, ObjectService, RatingService, AuthService) {
        'ngInject';

        this.$state = $state;
        this.RatingService = RatingService;
        this.AuthService = AuthService;
        
        this._initObject(ObjectService);
    }

    _initObject(ObjectService) {
        this._startLoadProgress();
        ObjectService.getObject(this.id)
            .then(result => {
                this.object = result;
                this.points = result.inaccessibility;
                this._stopLoadProgress();
            });
    }

    submit() {
        this._incVisit();
    }

    _incVisit() {
        const { uid } = this.AuthService.getAuth();
        const data = {
            uid,
            objectId: this.id
        };
        this._startSaveProgress();
        this.RatingService.incVisit(data)
            .then(() => {
                this._stopSaveProgress();
                this._gotoObjectCard();
            })
            .catch(() => {
                this._stopSaveProgress();
            });
    }

    onClickCancelButton() {
        this._gotoObjectCard();
    }

    removeFile() {
        this.file = null;
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

    _startSaveProgress() {
        this.disabledForm = this.saveProgress = true;
    }

    _stopSaveProgress() {
        this.disabledForm = this.saveProgress = false;
    }
};
