import angular from 'angular';
import angularMessages from 'angular-messages';
import component from './component';

export default angular.module('app.components.pages.object.formPage.form', [
        angularMessages
    ])
    .component('objectForm', component);
