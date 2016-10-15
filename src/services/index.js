import angular from 'angular';
import authService from './authService';
import objectService from './objectService';

export default angular.module('app.services', [
    authService.name,
    objectService.name
]);
