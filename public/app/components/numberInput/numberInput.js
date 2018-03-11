class numberInputController{
    constructor(firebaseService, mongoService){
        this.loading = true;
        this.firebaseService = firebaseService;
        this.mongoService = mongoService;
        firebaseService.getData().then((response)=>{
            this.inputData = response.data;
            this.loading = false;
        });
    }

    changeData(){
        this.loading = true;
        this.mongoService.updateData(this.inputData).then(() => {
            this.loading = false;
            this.updateLog++;
        });
    }
}

(() => {
    'use strict';
    angular
        .module('mongoFirebaseApp')
        .component('numberInput', {
            templateUrl: 'app/components/numberInput/numberInput.html',
            controller: numberInputController,
            controllerAs: '$ctrl',
            bindings: {
                updateLog: '='
            },
        });

    numberInputController.$inject = ['firebaseService', 'mongoService'];
})();