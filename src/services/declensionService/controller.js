import firebase from 'firebase';

export default class DeclensionService {
    constructor() {
    }

    getPointsText(value) {
        let result;
        if (value === 1) {
            result = 'балл';
        } else if (value < 5) {
            result = 'балла';
        } else {
            result = 'баллов';
        }
        return result;
    }

    getValueText(value) {
        let result;
        if (value === 1) {
            result = 'раз';
        } else if (value < 5) {
            result = 'раза';
        } else {
            result = 'раз';
        }
        return result;
    }

    getVisitorsText(value) {
        let result;
        if (value === 1) {
            result = 'посещение';
        } else if (value < 5) {
            result = 'посещения';
        } else {
            result = 'посещений';
        }
        return result;
    }
}
