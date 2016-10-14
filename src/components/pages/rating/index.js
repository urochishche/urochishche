import angular from 'angular';
import component from './component';

export default angular.module('app.components.pages.rating', [
    ])
    .config(function($stateProvider) {
        'ngInject';

        $stateProvider
            .state('rating', {
                url: '/rating',
                template: '<rating></rating>'
            });
    })
    .component('rating', component);
