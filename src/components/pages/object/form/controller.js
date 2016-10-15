export default class ObjectFormPageController {
    constructor($scope, $state, ObjectService) {
        'ngInject';

        this.$scope = $scope;
        this.$state = $state;
        this.ObjectService = ObjectService;

        this._initObject();
    }

    _initObject() {
        if (this.id) {
            this._startLoadProgress();
            this.ObjectService.getObject(this.id)
                .then(result => {
                    this.object = result;
                    this._stopLoadProgress();
                });
        } else {
            this.object = {
                inaccessibility: '5'
            };
        }
    }

    isHasError(attrName) {
        const item = this.$scope.object[attrName];
        return item.$invalid && item.$dirty && item.$touched;
    }

    submit() {
        const {
            name,
            latitude,
            longitude,
            inaccessibility,
            description = ''
        } = this.object;

        this._startSaveProgress();

        const data = {
            name,
            latitude,
            longitude,
            inaccessibility,
            description
        };

        this._saveObject(data)
            .then(id => {
                this._gotoObjectCard(id);
            })
            .catch(error => {
                this._stopSaveProgress();
                throw Error(error);
            });
    }

    _saveObject(data) {
        let result;
        if (this.id) {
            result = this.ObjectService.saveObject(this.id, data);
        } else {
            result = this.ObjectService.addObject(data);
        }
        return result;
    }

    _gotoObjectCard(id) {
        this.$state.go('object.card', { id });
    }

    _gotoObjectList() {
        this.$state.go('object.list');
    }

    onClickCancelButton() {
        if (this.id) {
            this._gotoObjectCard(this.id);
        } else {
            this._gotoObjectList();
        }
    }

    onClickRemoveButton() {
        if (this.id) {
            this._removeObject(this.id);
        }
    }

    _removeObject(id) {
        this._startRemoveProgress();
        this.ObjectService.removeObject(id)
            .then(() => {
                this._gotoObjectList();
            })
            .catch(error => {
                this._stopRemoveProgress();
                throw Error(error);
            });
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }

    _startSaveProgress() {
        this.saveProgress = this.disabledForm = true;
    }

    _stopSaveProgress() {
        this.saveProgress = this.disabledForm = false;
    }

    _startRemoveProgress() {
        this.removeProgress = this.disabledForm = true;
    }

    _stopRemoveProgress() {
        this.removeProgress = this.disabledForm = false;
    }
};
