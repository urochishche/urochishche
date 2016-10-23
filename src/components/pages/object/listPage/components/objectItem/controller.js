export default class ObjectItemController {
    constructor(DeclensionService) {
        'ngInject';

        this.DeclensionService = DeclensionService;
    }

    _getVisitorsText() {
        const { visitors } = this.object;
        return this.DeclensionService.getVisitorsText(visitors);
    }
}
