import angular from 'angular';
import login from './login';
import user from './user';
import home from './home';

export default angular.module('app.components.pages', [
    login.name,
    user.name,
    home.name
]);
