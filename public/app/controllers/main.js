class MainController {
    constructor(){
        this.logUpdate = 0;
    }
}

(() => {
    'use strict';
    angular
        .module('mongoFirebaseApp')
        .controller('MainController', MainController);

    MainController.$inject = [];
})();