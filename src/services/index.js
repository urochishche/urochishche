import angular from 'angular';
import authService from './authService';
import objectService from './objectService';
import fileStorageService from './fileStorageService';
import verifyRequestService from './verifyRequestService';

export default angular.module('app.services', [
    authService.name,
    objectService.name,
    fileStorageService.name,
    verifyRequestService.name
]);
