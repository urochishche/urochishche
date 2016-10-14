import angular from 'angular';
import authService from './authService';

export default angular.module('app.services', [
    authService.name
]);
