import angular from 'angular';

import navbar from './navbar';
import progressBar from './progressBar';
import uploadFileButton from './uploadFileButton';

export default angular.module('app.components.common', [
    navbar.name,
    progressBar.name,
    uploadFileButton.name
]);
