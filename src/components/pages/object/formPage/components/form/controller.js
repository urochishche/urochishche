const precision = 8;

export default class ObjectFormController {
    constructor($scope, NgMap) {
        'ngInject';

        this.$scope = $scope;
        this._initMap(NgMap);
    }
   
    _initMap(NgMap) {
        let { latitude, longitude } = this.object;
        const options = {
            id:'newMap'
        };
        const maps = this._getGoogleMaps();

        NgMap.getMap(options)
            .then((map) => {
                map.setZoom(10);

                if (!latitude || !longitude) {
                    latitude = 53.1948244;
                    longitude = 44.7504436;
                }

                const marker = this._createMarker(map);
                const latlng = new maps.LatLng(latitude, longitude);
                
                marker.setPosition(latlng);
                map.setCenter(latlng);
                map.panTo(latlng);

                const dragendListener = maps.event.addListener(marker, 'dragend', (evt) => {
                    const lat = evt.latLng.lat();
                    this.object.latitude = evt.latLng.lat().toPrecision(precision);
                    this.object.longitude = evt.latLng.lng().toPrecision(precision);
                    this.$scope.$apply();
                });
                
                const clickListener = maps.event.addListener(map, 'click', (evt) => {
                    const latitude = evt.latLng.lat().toPrecision(precision);
                    const longitude = evt.latLng.lng().toPrecision(precision);
                    marker.setPosition(evt.latLng);
                });

                this.$scope.$on('$destroy', () => {
                    marker.setMap(null);
                    maps.event.removeListener(dragendListener);
                    maps.event.removeListener(clickListener);
                });
                return map; 
            });
    }
    
    _createMarker(map) {
        const maps = this._getGoogleMaps();
        return new maps.Marker({
             map: map,
             draggable: true
        });
    }
    
    isHasError(attrName) {
        const item = this.$scope.object[attrName];
        return item.$invalid && item.$dirty && item.$touched;
    }

    _getGoogleMaps() {
        return window.google.maps;
    }
};
