export default class RatingPageController {
    constructor(RatingService, DeclensionService) {
        'ngInject';

        this.DeclensionService = DeclensionService;
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
        return this.DeclensionService.getPointsText(value);
    }

    _getValueText(value) {
        return this.DeclensionService.getValueText(value);
    }
};
