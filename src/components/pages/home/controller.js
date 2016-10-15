export default class HomePageController {
    constructor($scope, $state, NgMap, ObjectService) {
        'ngInject';

        this.$state = $state;

        $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDVljZQkk_QaNk8xonfYXJsThU0-z6q1X8";

        this.onClickMarker = (e, id) => {
            this._gotoObjectCard(id);
        };

        NgMap.getMap()
            .then((map) => {
            });

        this._loadMarkers(ObjectService);
    }

    _loadMarkers(ObjectService) {
        ObjectService.getEnabledObject()
            .then(list => {
                this.markers = list.map(item => {
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
