// Controllers

// Home controller
// Use the array to avoid the minification problem
airTrafficControlApp.controller('homeController', ['$scope', '$location', 'systemBootService' , function($scope, $location, systemBootService){
    
    // If the system is already booted, redirect to
    // the air traffic control page
    if (true == systemBootService.systemIsBooted()){
        $location.path("/airTrafficControlAndStatus");
    }
    
    $scope.bootSystem = function(){

        // Make async call to boot the system
        systemBootService.bootSystem()
        .then(function(bootStatus){
            // redirect to the air traffic control view
            $location.path("/airTrafficControlAndStatus");
        })
        .catch(function(errorMessage){
            // If the deferred object were to reject,
            // show an error message
            alert("An error occured. " + errorMessage); 
        });
    };
    
}]);


// System Status Controller
// Use the array to avoid the minification problem
airTrafficControlApp.controller('airTrafficControlAndStatus', ['$scope', '$timeout', 'systemBootService', 'queueManagementService', function($scope, $timeout, systemBootService, queueManagementService) {
    
    var self = this;
    $scope.aircraftQueue = [];
    enqueueTimeoutPromise = null;
    dequeueTimeoutPromise = null;
    
    // If the system is not booted, redirect to
    // home page
    if (false == systemBootService.systemIsBooted()){
        systemBootService.handleUnbootedSystemAccess();
        return;
    }
    
    // Aircraft specifications for the user
    // selected value will be used as
    // two way binding for user selection
    $scope.aircraftSpecifications = {
        "aircraftTypeSpecification":{
        "title": "Aircraft Type",
        "selectedValue": "Passenger"
        },
        "aircraftSizeSpecification":{
        "title": "Aircraft Size",
        "selectedValue": "Large"
        }
    };
    
    // As the queue length changes, we need to
    // update the display. This display is
    // for the list for of all aircrafts in the system
    $scope.$watch(function(){
        return queueManagementService.queue;
    }, function (newValue, oldValue){
        $scope.aircraftQueue = newValue;
    });
    
    // Club together all operations
    // that need to run before enqueue
    function performPreEnqueueOperations() {
        // If the enqueue confirmation was showing,
        // hide it
        $scope.showEnqueueConfirmation = false;
        
        // cancel timer, if any, that was being used
        // to hide the enqueue confirmation
        if (null != enqueueTimeoutPromise) {
            $timeout.cancel(enqueueTimeoutPromise);
            enqueueTimeoutPromise = null;
        }
    }
    
    // Club together all operations
    // that need to run after enqueue
    function performPostEnqueueSuccessOperations() {
        // Start showing the enqueue confirmation
        $scope.showEnqueueConfirmation = true;
        
        enqueueTimeoutPromise = $timeout(function(){
            // Stop showing the qneueue confirmation
            // after a certain time
            $scope.showEnqueueConfirmation = false;
        }, 10000);
    }
    
    // Club together all operations
    // that need to run before dequeue
    function performPreDequeueOperations() {
        // If the dequeue confirmation was showing,
        // hide it
        $scope.showDequeueConfirmation = false;
        
        // cancel timer, if any, that was being used
        // to hide the dequeue confirmation
        if (null != dequeueTimeoutPromise) {
            $timeout.cancel(dequeueTimeoutPromise);
            dequeueTimeoutPromise = null;
        }
    }
    
    function performPostDequeueSuccessOperations() {
        // Start showing the dequeue confirmation
        $scope.showDequeueConfirmation = true;
        
        dequeueTimeoutPromise = $timeout(function(){
            // Stop showing the dequeue confirmation
            // after a certain time
            $scope.showDequeueConfirmation = false;
        }, 10000);
    }
    
    
    $scope.enqueueAircraft = function() {
        // initialize relevant variables and
        // perform pre enqueue operations
        performPreEnqueueOperations();
        
        // create an object to represent the aircraft that
        // need to be enqueued. Set the enqueue time as the current time
        $scope.enqueuedAircraft = {
            "type": $scope.aircraftSpecifications.aircraftTypeSpecification.selectedValue,
            "size": $scope.aircraftSpecifications.aircraftSizeSpecification.selectedValue,
            "timeAdded": new Date().getTime()
        };
        
        // Call the queue management service to enqueue the aircraft
        // This is an async call perhaps going to the server
        queueManagementService.enqueueItem($scope.enqueuedAircraft)
        .then(function(enqueueData){
            // Store the enqueue data in the scope
            // for the view
            $scope.enqueueData = enqueueData;
            
            // Perform operations needed post enqueue
            // success
            performPostEnqueueSuccessOperations();
            
        })
        .catch(function(errorMessage){
            alert("An error occured. " + errorMessage);
        });
    };
    
    $scope.dequeueAircraftWithHighestPriority = function() {
        // perform any initialization operations before
        // proceeding with dequeue
        performPreDequeueOperations();
        
        // Async service to dequeue the aircraft
        // with the highest priority
        queueManagementService.dequeueItemWithHighestPriority()
        .then(function(dequeuedAircraft){
            // Store the dequeued aircraft in the scope
            // for display
            $scope.dequeuedAircraft = dequeuedAircraft;
            
            // Perform operations needed post dequeue
            // success
            performPostDequeueSuccessOperations();    
        })
        .catch(function(errorMessage){
            alert("An error occured. " + errorMessage);
        });
        ;
        
    }; 
    
}]);