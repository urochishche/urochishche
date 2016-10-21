export default class ObjectItemController {
    constructor() {
        'ngInject';
    }

    _getVisitorsText() {
        const { visitors } = this.object;
        let result;
        if (visitors === 1) {
            result = 'посещение';
        } else if (visitors < 5) {
            result = 'посещения';
        } else {
            result = 'посещений';
        }
        return result;
    }
};
