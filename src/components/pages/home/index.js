import angular from 'angular';
import component from './component';

export default angular.module('app.components.pages.home', [
    ])
    .config(function($stateProvider) {
        'ngInject';

        $stateProvider
            .state('home', {
                url: '/home',
                template: '<home></home>'
            });
    })
    .component('home', component);
