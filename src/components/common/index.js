import angular from 'angular';
import navbar from './navbar';
import progressBar from './progressBar';

export default angular.module('app.components.common', [
    navbar.name,
    progressBar.name
]);
