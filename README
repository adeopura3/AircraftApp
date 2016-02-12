Aircraft application

How to run?
- On Mac
    - Download the repository to your local machine
    - Open a terminal and go to the folder where you downloaded the repository
    - Type python -m SimpleHTTPServer 8091 in your command prompt
    - Open your web browser and go to the address http://127.0.0.1:8091/index.html


User Operations

- Boot: Initializes the system

- Enqueue: Enqueues the aircraft in the system. The user can specify the type of the aircraft and the size of the aircraft.

- Dequeue: Dequeues the highest priority item from the queue. Passenger aircraft are higher priority than Cargo. Large are higher proprity than small. After priorities, follow FIFO.

Algorithms

- Enqueue: Add in sorted order. Complexity O(N)

- Dequeue: Remove the first element from the queue. Complexity O(1)

High level Code organization

- Home Page
    - Route in the routes.js
    - Uses the template home.html
        - Provides a button that the user can use to initialize the system
    - Controller in controller.js
        - Makes use of the Angular location service
        - Makes use of a custom systemBootService
        - Handles the click from the boot system button and redirects to the airTrafficControlAndStatus route
        

- Air Traffic Contorl and Status Page
    - Route in routes.js
    - Uses the template airTrafficControlAndStatus.html
        - Enqueue Panel
        - Dequeue Panel
        - Status Panel (Aircrafts in queue)
            - Uses custom directive aircraftDetails to show the details of each aircraft. This allows us to make changes to the way the aircraft details might be presented to the user without changing any other code
    - Controller in controller.js
        - User built in Angular timeout service
        - Uses custom systemBootService and queueManagementService
        - If the page was accessed without the system being booted, redirects to the system boot page
        - Enqueue
            - Two way binding for the aircraft size and aircraft type that are to be enqueued
            - Handles enqueue click and passes on the work to the queueManagementService
            - Shows footer in the panel for 10 seconds once the enqueue is successful (Two way binding)
        - Dequeue
            - If queue is empty, disable the dequeue button (two way binding)
            - Handles dequeue click and passes on the work to the queueManagementService to dequeue the highest priority item
            - Shows footer in the panel for 10 seconds once the dequeue is successful (Two way binding)
    
Custom Services
- systemBootService
    - Uses Angular location, q, and timeout service
    - Provides the ability to boot up the system (asynchronous call)
    
- queueManagementService
    - Uses Angular in build service q, timeout,
    - Uses custom systemBootService, aircraftComparisonService
    - Provides the ability to enqueue items
        - enqueue the aircraft at the correctly sorted order (for dequeue)
        - Insertion is O(N)
    - Provides the ability to dequeue the highest priority item in the queue
        - Remove the item at the head of the queue
        - Dequeue is O(1)