import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

export default angular.module('app.components.pages.login', [])
	.config(function($stateProvider) {
	    'ngInject';

	    $stateProvider
	        .state('login', {
	            url: '/login',
	            template: '<login></login>'
	        });
	})
	.component('login', {
	    template,
	    controller
	});
