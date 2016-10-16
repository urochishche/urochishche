export default class ObjectListPageController {
    constructor(ObjectService) {
        'ngInject';

        this.filter = { 
            inaccessibility: null,
            visitors: null
        };

        this._initObjectList(ObjectService);
    }
    
    // 
    onApplyFilter() {
        this.list = this.listAll.slice(0);
        
        if(this.filter.inaccessibility != null && this.filter.inaccessibility != -1) {
             this.list = this.list.filter(item => {
                 return (item.inaccessibility == this.filter.inaccessibility );
            })  
        }

        if(this.filter.visitors != null) {
            var min = 0;
            var max = 10000;
            if(this.filter.visitors == 1) {
                max = 5;
            } else if (this.filter.visitors == 2) {
                min = 5; max = 10;
            } else if (this.filter.visitors == 3) {
                min = 10; 
            }
            
            this.list = this.list.filter(item => {
                 return ( min <= item.visitors && item.visitors <= max );
            })             
        }
    }

    _initObjectList(ObjectService) {
        this._startLoadProgress();
        ObjectService.loadObjects()
            .then(result => {
                this.list = result;
                this.listAll = result;
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
