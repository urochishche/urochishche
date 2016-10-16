import angular from 'angular';
import angularMessages from 'angular-messages';
import component from './component';
import form from './components/form';

export default angular.module('app.components.pages.object.formPage', [
        angularMessages,
        form.name
    ])
    .component('objectFormPage', component);
