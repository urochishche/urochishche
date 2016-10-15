import angular from 'angular';
import controller from './controller';

export default angular.module('app.services.verifyRequest', [])
    .service('VerifyRequestService', controller);