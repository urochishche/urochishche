import angular from 'angular';
import controller from './controller';

export default angular.module('app.services.declension', [])
    .service('DeclensionService', controller);
