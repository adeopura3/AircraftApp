// Services

// Boot service
airTrafficControlApp.service('systemBootService', ['$location', '$q', '$timeout', function($location, $q, $timeout){
    
    var self = this;
    // Initialize the system status to be
    // unstarted at the beginning
    this.systemBootStatus = 'Unstarted';
    
    // Have a function to determine if the system is booted
    this.systemIsBooted = function(){
        // Note that within a function, "this" will refer
        // to the function itself (Functions are objects in JS)
        // so use the self variable as defined earlier in the service
        // which refers to the service
        return (self.systemBootStatus === 'Booted');
    };
    
    // Function is called when the system is booted
    this.bootSystem = function(){
        // Async call
        var deferred = $q.defer();
        
        // Resolve the deferred if the system
        // is already booted
        if (true === self.systemIsBooted()) {
            deferred.resolve();
        }
        else {
            // emulate async call
            $timeout(function(){
                // Set the system to booted status
                self.systemBootStatus = 'Booted';
                
                // Resolve the deferred to indicate
                // success
                deferred.resolve(self.systemBootStatus);
                
            }, 50);
        }
        
        // Make sure to return a promise from the async call
        return deferred.promise;
    };
    
    // If the system is not booted, redirect to
    // home page
    this.handleUnbootedSystemAccess = function(){
        $location.path("/");
    };
        
}]);


// Aircraft Comparison service
airTrafficControlApp.service('aircraftComparisonService', [function(){
    
    var self = this;
    
    // Compare two aircrafts
    // if aircraftA has higher priority over aircraftB, return 1
    // if aircraftA has lower priority over aircraftB, return -1
    // if aircraftA has the same priority as aircraftB, return 0
    
    self.compare = function (aircraftA, aircraftB) {
        // null checks
        if (aircraftA == null || aircraftB == null) {
            if (null == aircraftA && null == aircraftB) {
                return 0;
            }
            else if (null == aircraftA) {
                return -1;
            }
            else if (null == aircraftB) {
                return 1;
            }
        }
        
        // Compare types
        var typeComparison = self.compareType(aircraftA.type, aircraftB.type);
        
        if (typeComparison !== 0) {
            // If types are different, we already have our result
            return typeComparison;
        }
        
        // Types are the same, so now compare sizes
        var sizeComparison = self.compareSize(aircraftA.size, aircraftB.size);
        
        if (sizeComparison !== 0) {
            // If sizes are different, we already have our result
            return sizeComparison;
        }
        
        // Type and size are the same, compare the time that
        // the aircrafts were added
        var timeAddedToSystemComparison = self.compareTimeAddedToSystem(aircraftA.timeAdded, aircraftB.timeAdded);
        
        if (timeAddedToSystemComparison !== 0) {
            // If time when added to system is different, we already have our result
            return timeAddedToSystemComparison;
        }
        
        // Everything is the same, so the comparison returns a 0
        return 0;
    };
    
    self.compareType = function (aircraftAType, aircraftBType) {
        // Aircraft Type Comparison based on problem specifications
        
        if (aircraftAType === aircraftBType) {
            return 0;
        }
        
        if (aircraftAType === 'Passenger') {
            return 1;
        }
        
        if (aircraftAType === 'Cargo') {
            return -1;
        }
        
        // This is not possible
        throw "Unable to compare aircraft types " + aircraftAType + " and " + aircraftBType;
    };
    
    self.compareSize = function(aircraftASize, aircraftBSize) {
        // Aircraft size comparison based on problem specifications
        if (aircraftASize === aircraftBSize) {
            return 0;
        }
        
        if (aircraftASize === 'Large') {
            return 1;
        }
        
        if (aircraftASize === 'Small') {
            return -1;
        }
        
        // This is not possible
        throw "Unable to compare aircraft sizes " + aircraftASize + " and " + aircraftBSize;
    };
    
    self.compareTimeAddedToSystem = function (aircraftATimeAdded, aircraftBTimeAdded) {
        // Time added to system comparison based on problem specifications
        // Note that if the aircraft was added later, it will have lower priority
        // than any aircraft added earlier
        if (aircraftATimeAdded === aircraftBTimeAdded) {
            return 0;
        }
        
        if (aircraftATimeAdded > aircraftBTimeAdded) {
            return -1;
        }
        else{
            return 1;
        }
        
        // we will never come here
        return 0;
    }

}]);




// Queue management service [Enqueue/Dequeue]
// Use the array to avoid the minification problem
airTrafficControlApp.service('queueManagementService', ['$q', '$timeout', 'systemBootService', 'aircraftComparisonService', function($q, $timeout, systemBootService, aircraftComparisonService) {
    var self = this;
    this.queue = [];
    
    // Determine the number of items present in the queue
    this.numberOfItemsInQueue = function(){
        return self.queue.length;
    };
    
    
    this.insertIntoQueue = function (itemToInsert) {
        if (null == itemToInsert) {
            throw "Trying to add invalid null item";
        }
        
        // Add at the end of the queue to start with
        // before we determine the right position
        var itemPosition = self.queue.length;
        
        for (var itemIndex = 0; itemIndex < self.queue.length; itemIndex++){
            var itemInQueue = self.queue[itemIndex];
            // As soon as we find the first item that is
            // lower priority than the item we want to add
            // add the item that position and push all the lower
            // priority items back
            if (aircraftComparisonService.compare(itemToInsert, itemInQueue) > 0) {
                itemPosition = itemIndex;
                break;
            }
        }
        
        // Insert item at the item position
        self.queue.splice(itemPosition, 0, itemToInsert);
        
        return itemPosition;
    };    
    
    // This is a async call   
    this.enqueueItem = function(item){
        var deferred = $q.defer();
        
        // If system is not initialized for whatever reason,
        // there is nothing this service can do
        if (false == systemBootService.systemIsBooted()) {
            systemBootService.handleUnbootedSystemAccess();
            deferred.reject("Invalid Operation: Attempting to enqueue item from a system that is not booted");
        }
        
        // emulate async
        $timeout(function(){
            var insertedAtPosition = self.insertIntoQueue(item);
                        
            deferred.resolve({
                "addedAtPosition": insertedAtPosition + 1,
                "totalSize": self.queue.length,
                "enqueuedItem": item
            });
            
        }, 100);
        
        return deferred.promise;
    };
    
    this.removeHighestPriorityItem = function () {
        // This is the first item
        // in the array
        return ((self.queue.splice(0,1))[0]);
    };    
    
    this.dequeueItemWithHighestPriority = function(){
        var deferred = $q.defer();
        
        // If system is not initialized for whatever reason,
        // there is nothing this service can do
        if (false == systemBootService.systemIsBooted()) {
            systemBootService.handleUnbootedSystemAccess();
            deferred.reject("Invalid Operation: Attempting to dequeue from a system that is not booted");
        }
        
        // Case: No items in queue
        if (self.numberOfItemsInQueue() === 0){
            deferred.reject("Invalid Operation: Attempt to dequeue from an empty Queue");
        }
        
        // To emulate async call
        $timeout(function(){
            var dequeuedItem = self.removeHighestPriorityItem();
            deferred.resolve (dequeuedItem); 
        }, 100);
        
        // Return the promise
        return deferred.promise;
    };
    
}]);