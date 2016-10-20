import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

export default angular.module('app.components.pages.register', [])
	.config(function($stateProvider) {
	    'ngInject';

	    $stateProvider
	        .state('register', {
	            url: '/register',
	            template: '<register></register>'
	        });
	})
	.component('register', {
	    template,
	    controller
	});
