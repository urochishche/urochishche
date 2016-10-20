import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

export default angular.module('app.components.pages.recover', [])
	.config(function($stateProvider) {
	    'ngInject';

	    $stateProvider
	        .state('recover', {
	            url: '/recover',
	            template: '<recover></recover>'
	        });
	})
	.component('recover', {
	    template,
	    controller
	});
