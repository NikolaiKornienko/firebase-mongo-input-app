class mongoService {
    constructor($http){
        this.$http = $http;
    }

    getLogs() {
        return this.$http.get("/logs");
    }

    updateData(data) {
        return this.$http.post("/datas", {data: data});
    }
}

(() => {
    'use strict';

    angular
        .module('mongoFirebaseApp')
        .service('mongoService', mongoService);
})();