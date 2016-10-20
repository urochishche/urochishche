const precision = 8;

export default class ObjectFormController {
    constructor($scope, NgMap, GeolocationService) {
        'ngInject';

        this.$scope = $scope;

        this._getPosition(GeolocationService)
            .then((pos) => {
                this._initMap(NgMap, pos);
            });        
    }

    _getPosition(GeolocationService) {
        return GeolocationService.getPosition()
            .then((pos) => {
                const { latitude, longitude } = pos.coords;
                return {
                    latitude,
                    longitude
                };
            })
            .catch(() => {
                return {
                    latitude: 53.1948244,
                    longitude: 44.7504436
                };
            });
    }
   
    _initMap(NgMap, defaultPos) {
        let { latitude, longitude } = this.object;
        const options = {
            id:'newMap'
        };
        const maps = this._getGoogleMaps();

        NgMap.getMap(options)
            .then((map) => {
                map.setZoom(10);

                if (!latitude || !longitude) {
                    latitude = defaultPos.latitude;
                    longitude = defaultPos.longitude;
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
