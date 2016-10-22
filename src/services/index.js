import angular from 'angular';
import authService from './authService';
import objectService from './objectService';
import fileStorageService from './fileStorageService';
import verifyRequestService from './verifyRequestService';
import ratingService from './ratingService';
import geolocationService from './geolocationService';
import declensionService from './declensionService';

export default angular.module('app.services', [
    authService.name,
    objectService.name,
    fileStorageService.name,
    verifyRequestService.name,
    ratingService.name,
    geolocationService.name,
    declensionService.name
]);
