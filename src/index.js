import 'babel-polyfill';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import firebase from 'firebase';
import angularfire from 'angularfire';
import ngMap from 'ngmap'; 

import components from './components';
import services from './services';

import './style.less';

angular.module('app', [
        uiRouter,
        'firebase',
        ngMap,

        components.name,
        services.name
    ])
    .config(function($urlRouterProvider) {
        'ngInject';
        
        $urlRouterProvider.otherwise('/home');

        firebase.initializeApp({
            apiKey: "AIzaSyDVljZQkk_QaNk8xonfYXJsThU0-z6q1X8",
            authDomain: "urochishche-d0e5b.firebaseapp.com",
            databaseURL: "https://urochishche-d0e5b.firebaseio.com",
            storageBucket: "urochishche-d0e5b.appspot.com",
            messagingSenderId: "1030889086459"
        });
    })
    .run(function($rootScope, $state) {
        'ngInject';

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            console.error('stateChangeError:', error);
            if (error === 'AUTH_REQUIRED') {
                $state.go('home');
            }
        });
    });
