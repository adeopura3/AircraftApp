// Directives
airTrafficControlApp.directive('aircraftDetails', function(){
   return{
      templateUrl:'directives/aircraftDetails.html',
      scope:{
         aircraftObject: "="
         // this is causing two way binding, not sure
         // how we can do one way data binding
         // with an object.
         // Perhaps pass as string with @
         // and then recreate json object in the
         // link?? Seems like a hack to do that
      }
   } 
});

/*
airTrafficControlApp.directive('radioButtonGroupWithTitle', function(){
   return{
      templateUrl:'directives/radioButtonGroupWithTitle.html',
      replace: true,
      scope:{
         specificationObject: "=",
         dataObject: "="
         // this is causing two way binding, not sure
         // how we can do one way data binding
         // with an object.
         // Perhaps pass as string with @
         // and then recreate json object in the
         // link?? Seems like a hack to do that
      },
      link: function (scope, elements, attrs){
         console.log("Linking...");
         
         console.log("scope: " + scope);
         
         console.log("elements: " + elements.html());
         
         console.log("attrs: " + attrs);
      }
   } 
});
*/
/*
airTrafficControlApp.directive('radioButtonGroup', function(){
   return{
      templateUrl:'directives/radioButtonGroup.html',
      replace: true,
      scope:{
         configObject: "=",
         dataObject: "="
         // this is causing two way binding, not sure
         // how we can do one way data binding
         // with an object.
         // Perhaps pass as string with @
         // and then recreate json object in the
         // link?? Seems like a hack to do that
      },
      link: function (scope, elements, attrs){
         attrs.$set("ng-model", "aircraftToBeEnqueued.type")
         
         console.log ("document: " + document.firstChild);
         
         console.log("Linking...");
         
         console.log("scope: " + scope);
         
         console.log("elements: " + elements.html());
         
         console.log("attrs: " + attrs);
      }
   } 
});
*/