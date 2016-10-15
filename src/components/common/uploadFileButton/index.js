import angular from 'angular';
import component from './component';
import directives from './directives';

export default angular.module('app.components.uploadFileButton', [
        directives.name
    ])
    .component('uploadFileButton', component);
