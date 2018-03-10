angular
    .module('mongoFirebaseApp', [])
    .config(['$qProvider', ($qProvider) => {
        $qProvider.errorOnUnhandledRejections(false);
    }]);

