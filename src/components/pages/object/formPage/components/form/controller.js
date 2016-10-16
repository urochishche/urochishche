export default class ObjectFormController {
    constructor($scope, NgMap) {
        'ngInject';

        this.$scope = $scope;
        this._initMap(NgMap);
    }
   
    _initMap(NgMap) {
        const { latitude, longitude } = this.object;
        NgMap.getMap({ id:'newMap' })
            .then((map) => {
                map.setZoom(10);
               
                let latlng;
                
                if (!window.marker) {
                    window.marker = this._createMarker(map);
                }
                
                if (latitude && longitude) {
                    latlng = new google.maps.LatLng(latitude, longitude);
                } else {
                    latlng = new google.maps.LatLng(53.1948244, 44.7504436);
                }
                
                window.marker.setPosition(latlng);
                map.setCenter(latlng);
                map.panTo(latlng);
                
                google.maps.event.addListener(map, 'click', (evt) => {
                    const latitude = evt.latLng.lat().toPrecision(8);
                    const longitude = evt.latLng.lng().toPrecision(8);
                    window.marker.setPosition(evt.latLng);
                });
                return map; 
            });
    }
    
    _createMarker(map) {
        const marker = new google.maps.Marker({
             map: map,
             draggable: true,
             animation: google.maps.Animation.DROP,
             icon: 'http://www.cstopz.com/imagehost/di/OE1Z/icon2.png'
        });
         
        google.maps.event.addListener(marker, 'dragend', (evt) => {
            const lat = evt.latLng.lat();
            this.object.latitude = evt.latLng.lat().toPrecision(8);
            this.object.longitude = evt.latLng.lng().toPrecision(8);
            this.$scope.$apply();
        });
        return marker;
    }
    
    isHasError(attrName) {
        const item = this.$scope.object[attrName];
        return item.$invalid && item.$dirty && item.$touched;
    }
};
