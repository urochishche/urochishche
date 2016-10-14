import angular from 'angular';
import component from './component';

export default angular.module('app.components.pages.about', [
    ])
    .config(function($stateProvider) {
        'ngInject';

        $stateProvider
            .state('about', {
                url: '/about',
                template: '<about></about>'
            });
    })
    .component('about', component);
