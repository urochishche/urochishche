import angular from 'angular';
import directive from './directive';

export default angular.module('app.components.uploadFileButton.directives.file', [])
    .directive('file', function() {
        return directive;
    });
