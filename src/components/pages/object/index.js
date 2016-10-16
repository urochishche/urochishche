import angular from 'angular';
import uiRouter from 'angular-ui-router';

import formPage from './formPage';
import list from './list';
import card from './card';
import check from './check';

export default angular.module('app.components.pages.object', [
        uiRouter,
        formPage.name,
        list.name,
        card.name,
        check.name
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
            })
            .state('object.check', {
                url: '/check/:id',
                template: '<object-check-page id="$ctrl.id"></object-check-page>',
                resolve: {
                    authResolve
                },
                controller: idStateController,
                controllerAs: '$ctrl'
            })
            .state('object.edit', {
                url: '/edit/:id',
                template: '<object-form-page id="$ctrl.id"></object-form-page>',
                resolve: {
                    authResolve
                },
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
