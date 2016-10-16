import angular from 'angular';
import controller from './controller';

export default angular.module('app.services.user', [])
    .service('UserService', controller);