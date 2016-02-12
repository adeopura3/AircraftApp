// Single page angular application. Using the ngRoute module for routing within
// the single page application

var airTrafficControlApp = angular.module('airTrafficControlApp',['ngRoute']);
             
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

// Services
airTrafficControlApp.service('systemBootService', function(){
    console.log("System Boot service initialization");
    
    var self = this;
    // Initialize the system status to be
    // unstarted at the beginning
    this.systemBootStatus = 'Unstarted';
    
    // Have a function to determine if the ssytem is booted
    this.systemIsBooted = function(){
        // Note that within a function, this will refer
        // to the function itself (Functions are objects in JS)
        // so use the self variable as defined earlier in the service
        // which refers to the service
        return (self.systemBootStatus === 'Booted');
    };
    
    this.bootSystem = function(){
        self.systemBootStatus = 'Booted';
    };
    
});

// Controllers

// Home controller
airTrafficControlApp.controller('homeController', ['$scope', '$location', 'systemBootService' , function($scope, $location, systemBootService){
    console.log("Entered Home Controller");
    
    // If the system is already booted, redirect to
    // the air traffic control page
    if (true == systemBootService.systemIsBooted()){
        $location.path("/airTrafficControlAndStatus");
    }
    
    $scope.bootSystem = function(){
        // User wants to boot the system
        // set the boot status to be true and
        // redirect to the enqueue aircraft page
        systemBootService.bootSystem();
        
        console.log("Boot Click");
        
        // redirect to the air traffic control page
        $location.path("/airTrafficControlAndStatus");
    };
    
}]);


// System Status Controller                                    
airTrafficControlApp.controller('airTrafficControlAndStatus', ['$scope', '$routeParams', '$location', 'systemBootService', function($scope, $routeParams, $location, systemBootService) {
    
    // If the system is not booted, redirect to
    // home page
    if (false == systemBootService.systemIsBooted()){
        console.log("Unbooted system access")
        $location.path("/");
    }
    
    $scope.aircraftSpecifications = {
        "type": "Passanger",
        "size": "Large"
    };
    
}]);
