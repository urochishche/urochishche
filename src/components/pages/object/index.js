import angular from 'angular';
import component from './component';

export default angular.module('app.components.pages.object', [
    ])
    .config(function($stateProvider) {
        'ngInject';

        $stateProvider
            .state('object', {
                url: '/object',
                template: '<object></object>'
            });
    })
    .component('object', component);
