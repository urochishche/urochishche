export default class HomePageController {
    constructor($scope, $state, NgMap, ObjectService) {
        'ngInject';

        this.$state = $state;

        this.onClickMarker = (e, id) => {
            this._gotoObjectCard(id);
        };

        Promise.all([
            this._initMap(NgMap),
            this._loadMarkers(ObjectService)
        ])
        .then(result => {
            const map = result[0];
            const markers = result[1];

            const bounds = new google.maps.LatLngBounds();
            markers.forEach(item => {
                const latlng = new google.maps.LatLng(item.pos[0], item.pos[1]);
                bounds.extend(latlng);
            });
            map.setCenter(bounds.getCenter());
            map.fitBounds(bounds);
        })
    }

    _initMap(NgMap) {
        return NgMap.getMap()
            .then((map) => {
                return map;
            });
    }

    _loadMarkers(ObjectService) {
        return ObjectService.loadObjects()
            .then(list => {
                return this.markers = list.map(item => {
                    const title = `${item.name} - ${item.inaccessibility}`;
                    return {
                        id: item.$id,
                        pos: [
                            item.latitude,
                            item.longitude,
                        ],
                        title
                    };
                });
            });
    }

    _gotoObjectCard(id) {
        this.$state.go('object.card', { id });
    }
};
