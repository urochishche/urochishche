import angular from 'angular';
import login from './login';
import user from './user';
import home from './home';
import object from './object';
import rating from './rating';
import about from './about';

export default angular.module('app.components.pages', [
    login.name,
    user.name,
    home.name,
    object.name,
    rating.name,
    about.name
]);
