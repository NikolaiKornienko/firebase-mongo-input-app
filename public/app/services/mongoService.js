class mongoService {
    constructor($http){
        this.$http = $http;
    }

    getLogs() {
        return this.$http.get("/logs");
    }

    writeNumber(number) {
        let newNumber = {"data": number};
        return this.$http.post('/datas', newNumber);
    }
}

(() => {
    'use strict';

    angular
        .module('mongoFirebaseApp')
        .service('mongoService', mongoService);
})();