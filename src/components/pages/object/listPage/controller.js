export default class ObjectListPageController {
    constructor(ObjectService) {
        'ngInject';

        this._initFilter();
        this._initObjectList(ObjectService);
    }

    _initFilter() {
        this.filter = { 
            inaccessibility: null,
            visitors: null,
            active: false
        };
    }

    applyFilter() {
        const { inaccessibility, visitors } = this.filter;
        let result = this.objects.slice();

        if (inaccessibility) {
            result = result.filter(item => {
                 return item.inaccessibility === inaccessibility;
            });
        }

        if (visitors) {
            const value = parseInt(visitors, 10);
            let min = 0;
            let max;

            if (value === 1) {
                max = 5;
            } else if (value === 2) {
                min = 5; 
                max = 10;
            } else if (value === 3) {
                min = 10; 
            }
            
            result = result.filter(item => {
                const { visitors } = item;
                return (min <= visitors) && (visitors < max);
            });
        }

        if (inaccessibility || visitors) {
            this.filter.active = true;
        }

        this.list = result;
    }

    clearFilter() {
        this._initFilter();
        this.list = this.objects;
    }

    _initObjectList(ObjectService) {
        this._startLoadProgress();
        ObjectService.loadObjects()
            .then(result => {
                this.objects = this.list = result;
                this._stopLoadProgress();
            });
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }
};
