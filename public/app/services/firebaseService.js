class firebaseService {
    constructor($q, mongoService){
        this.$q = $q;
        this.mongoService = mongoService;
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

    getNumber() {
        this.openWatcher();
        return this.$q.when(firebase.database().ref().once('value'))
            .then(function (snapshot) {
                return snapshot.val();
            });
    }

    openWatcher() {
        firebase.database().ref().on('child_changed', (snapshot) => {
            this.$q.when().then(()=> {
                this.mongoService.writeNumber(snapshot.val());
            });
        });
    }

    updateNumber(newNumber) {
        return this.$q.when(firebase.database().ref().update({ number: newNumber }));
    }
}

(() => {
    'use strict';

    angular
        .module('mongoFirebaseApp')
        .service('firebaseService', firebaseService);
})();