export default class ObjectCheckPageController {
    constructor($state, ObjectService, FileStorageService, VerifyRequestService) {
        'ngInject';

        this.$state = $state;
        this.FileStorageService = FileStorageService;
        this.VerifyRequestService = VerifyRequestService;
        
        this._initObject(ObjectService);
    }

    _initObject(ObjectService) {
        this._startLoadProgress();
        ObjectService.getObject(this.id)
            .then(result => {
                this.object = result;
                this._stopLoadProgress();
            });
    }

    submit() {
        this.FileStorageService.uploadFile(this.file)
            .then(key => {
                return this.VerifyRequestService.addRequest({
                    uid: this.object.uid,
                    objectId: this.object.$id,
                    fileId: key
                });
            })
            .then(() => {
                this._gotoObjectCard();
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
};
