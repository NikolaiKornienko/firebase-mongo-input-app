class changeLogController{
    constructor(mongoService){
        this.mongoService = mongoService;
    }

    getLogs(){
        this.mongoService.getLogs().then((response)=>{
            this.logs = response.data;
        });
    }

    $onChanges($atts){
        if ($atts.logUpdate) {
            this.getLogs();
        }
    }
}

(() => {
    'use strict';
    angular
        .module('mongoFirebaseApp')
        .component('changeLog', {
            templateUrl: 'app/components/changeLog/changeLog.html',
            controller: changeLogController,
            controllerAs: '$ctrl',
            bindings: {
                logUpdate: '<'
            },
        });

    changeLogController.$inject = ['mongoService'];
})();