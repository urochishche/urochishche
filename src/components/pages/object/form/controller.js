export default class ObjectFormPageController {
    constructor($scope, $state, $q, NgMap, ObjectService) {
        'ngInject';

        this.$q = $q;
        this.$scope = $scope;
        this.$state = $state;
        this.ObjectService = ObjectService;
        
        this.object = {
            inaccessibility: '5',
            latitude: null,
            longitude: null
        };

         this._initObject().then( res => {
             this._initMap(NgMap);
         });
    }
   
      _initMap(NgMap) {
        return NgMap.getMap({id:'newMap'})
            .then((map) => {
                // settings map
                map.setZoom(10);
                var latlng = new google.maps.LatLng(53.1948244, 44.7504436);
                map.setCenter(latlng);
                 
                // create new marker
                if (window.marker == undefined || window.marker == null) {
                    window.marker = this._createMarker(latlng, map);
                }
                
                if(this.object.latitude !== null && this.object.longitude !== null) {
                    var latLng = new google.maps.LatLng(this.object.latitude, this.object.longitude);
                    window.marker.setPosition(latLng);
                }
               
               google.maps.event.addListener(map, 'click', function(evt) {
                    var latitude = evt.latLng.lat().toPrecision(8);
                    var longitude = evt.latLng.lng().toPrecision(8);
               
                    window.marker.setPosition(evt.latLng);
               });
               return map;
            });
      }
    
    _createMarker(latLng, map) {
        var marker = new google.maps.Marker({
             position: latLng, 
             map: map,
             draggable: true,
             animation: google.maps.Animation.DROP});
         map.panTo(latLng);
         
        google.maps.event.addListener(marker, 'dragend', (evt) => {
                var latitude = evt.latLng.lat().toPrecision(8);
                var longitude = evt.latLng.lng().toPrecision(8);

                this.object.latitude = latitude;
                this.object.longitude = longitude;               

                this.$scope.$apply();
        });
        return marker;
    }

    _initObject() {
        let result;
        if (this.id) {
            this._startLoadProgress();
            result = this.ObjectService.getObject(this.id)
                .then(result => {
                   this.object = result;
                   this._stopLoadProgress();
                });
        } else {
            result = this.$q.resolve();
        }
        return result;
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
