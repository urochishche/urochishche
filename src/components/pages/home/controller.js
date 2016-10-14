export default class HomePageController {
    constructor($scope, NgMap) {
        'ngInject';

        $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDVljZQkk_QaNk8xonfYXJsThU0-z6q1X8";

        NgMap.getMap().then(function(map) {
			console.log(map.getCenter());
			console.log('markers', map.markers);
			console.log('shapes', map.shapes);
		});
    }
};
