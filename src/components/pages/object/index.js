import angular from 'angular';
import uiRouter from 'angular-ui-router';

import form from './form';
import list from './list';
import card from './card';

export default angular.module('app.components.pages.object', [
        uiRouter,
        form.name,
        list.name,
        card.name
    ])
    .config(function($stateProvider) {
        'ngInject';

        $stateProvider
            .state('object', {
                abstract: true,
                url: '/object',
                template: '<ui-view />'
            })
            .state('object.list', {
                url: '/list',
                template: '<object-list-page></object-list-page>'
            })
            .state('object.new', {
                url: '/new',
                template: '<object-form-page></object-form-page>',
                resolve: {
                    authResolve
                }
            })
            .state('object.card', {
                url: '/card/:id',
                template: '<object-card-page id="$ctrl.id"></object-card-page>',
                controller: idStateController,
                controllerAs: '$ctrl'
            });
    });

function idStateController($stateParams) {
    'ngInject';
    this.id = $stateParams.id;
}

function authResolve(AuthService) {
    'ngInject';
    return AuthService.requireSignIn();
}