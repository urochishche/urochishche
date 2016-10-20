import angular from 'angular';
import component from './component';
import objectItem from './components/objectItem';

export default angular.module('app.components.pages.object.list', [
        objectItem.name
    ])
    .component('objectListPage', component);
