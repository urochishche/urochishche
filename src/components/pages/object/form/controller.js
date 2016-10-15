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
            .then(() => {
                this._gotoObjectCard();
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

    _gotoObjectCard() {
        this.$state.go('object.list');
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
