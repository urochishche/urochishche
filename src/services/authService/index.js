import angular from 'angular';
import controller from './controller';

export default angular.module('app.services.auth', [])
    .service('AuthService', controller);
