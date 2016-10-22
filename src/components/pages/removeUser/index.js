import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

export default angular.module('app.components.pages.removeUser', [])
	.config(function($stateProvider) {
	    'ngInject';

	    $stateProvider
	        .state('removeUser', {
	            url: '/removeUser',
	            template: '<remove-user></remove-user>',
	            resolve: {
                    authResolve
                }
	        });
	})
	.component('removeUser', {
	    template,
	    controller
	});

function authResolve(AuthService) {
    'ngInject';
    return AuthService.requireSignIn();
}
