import controller from './controller';
import template from './template.html';
import './style.less';

export default {
    template,
    controller,
    bindings: {
        id: '<',
        
        object: '<',
        saveProgress: '<',
        removeProgress: '<',
        disabledForm: '<',

        onSubmit: '&',
        onCancel: '&',
        onRemove: '&'
    }
};
