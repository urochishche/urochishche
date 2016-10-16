export default class RatingPageController {
    constructor(RatingService) {
        'ngInject';

        this._loadRating(RatingService);
    }

    _loadRating(RatingService) {
        this._startLoadProgress();
        RatingService.loadRating()
            .then(result => {
                this.list = result.sort((a, b) => {
                    return b.rating - a.rating;
                });
                this._stopLoadProgress();
            });
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }

    _getPointsText(value) {
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

    _getValueText(value) {
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
};
