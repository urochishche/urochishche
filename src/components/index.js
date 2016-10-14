import angular from 'angular';
import common from './common';
import pages from './pages';

export default angular.module('app.components', [
    common.name,
    pages.name
]);
