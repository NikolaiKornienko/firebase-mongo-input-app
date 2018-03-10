class numberInputController{
    constructor(firebaseService){
        this.loading = true;
        this.firebaseService = firebaseService;
        firebaseService.getNumber().then((response)=>{
            this.userNumber = response.number;
            this.loading = false;
        });
    }

    changeNumber(){
        this.loading = true;
        this.firebaseService.updateNumber(this.userNumber).then(() => {
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

    numberInputController.$inject = ['firebaseService'];
})();