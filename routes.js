// Configure routes
airTrafficControlApp.config(function($routeProvider){
    $routeProvider
    .when('/', {
        // template and controller for the home page
        templateUrl: 'templates/home.html',
        controller: 'homeController'    
    })

    .when('/airTrafficControlAndStatus', {
        // template and controller for the system status page
        templateUrl: 'templates/airTrafficControlAndStatus.html',
        controller: 'airTrafficControlAndStatus'
    });
});