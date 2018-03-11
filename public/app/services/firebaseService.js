class firebaseService {
    constructor($q){
        this.$q = $q;
        let config = {
            apiKey: "AIzaSyDItMwS-ksZR1ioWi2AZ5KId03-qAxSO0E",
            authDomain: "test-mongo-firebase.firebaseapp.com",
            databaseURL: "https://test-mongo-firebase.firebaseio.com",
            projectId: "test-mongo-firebase",
            storageBucket: "",
            messagingSenderId: "403278812073"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
    }

    getData() {
        return this.$q.when(firebase.database().ref().once('value'))
            .then(function (snapshot) {
                return snapshot.val();
            });
    }
}

(() => {
    'use strict';

    angular
        .module('mongoFirebaseApp')
        .service('firebaseService', firebaseService);
})();