export default class ObjectFormPageController {
    constructor($scope, $state, $q, NgMap, ObjectService) {
        'ngInject';

        this.$q = $q;
        this.$scope = $scope;
        this.$state = $state;
        this.ObjectService = ObjectService;

        this._initObject()
            .then(result => {
                this.object = result;
            });
    }

    _initObject() {
        let result;
        if (this.id) {
            this._startLoadProgress();
            result = this.ObjectService.getObject(this.id)
                .then(result => {
                   this._stopLoadProgress();
                   return result;
                });
        } else {
            result = this.$q.resolve({
                inaccessibility: '5',
                latitude: null,
                longitude: null
            });
        }
        return result;
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

    cancel() {
        if (this.id) {
            this._gotoObjectCard(this.id);
        } else {
            this._gotoObjectList();
        }
    }

    remove() {
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
