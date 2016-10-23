import angular from 'angular';
import component from './component';
import objectItem from './components/objectItem';
import objectFilter from './components/objectFilter';

export default angular.module('app.components.pages.object.list', [
        objectItem.name,
        objectFilter.name
    ])
    .component('objectListPage', component);
