import $ from 'jquery';

export default {
    scope: {
        file: '='
    },

    link: function(scope, el, attrs) {
        el.bind('change', event => {
            const files = event.target.files;
            scope.file = files[0];
            scope.$apply();
        });
        // scope.$watch('file', (file) => {
        //     if (!file) {
        //         const $el = $(el);
        //         $el.wrap('<form>').closest('form').get(0).reset();
        //         $el.unwrap();
        //     }
        // });
    }
};
