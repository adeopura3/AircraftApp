<div class="col-md-3"> Aircraft Type
                    <br/>
                    <br/>
                    <label>
                        <input type="radio" ng-model="aircraftSpecifications.type" value="Passenger">
                        Passenger
                    </label>
                    <br/>
                    <label>
                        <input type="radio" ng-model="aircraftSpecifications.type" value="Cargo">
                        Cargo
                    </label><br/>
                </div>
            
                <div class="col-md-3"> Aircraft Size
                    <br/>
                    <br/>
                    <label>
                        <input type="radio" ng-model="aircraftSpecifications.size" value="Large">
                        Large
                    </label>
                    <br/>
                    <label>
                        <input type="radio" ng-model="aircraftSpecifications.size" value="Small">
                        Small
                    </label><br/>
                </div>
                
                
                
                
                
                <label ng-repeat="item in specificationObject.items">
        <input type="radio" ng-model="boundMember" value="item.value">
        {{ item.value }}
    </label>
    
    
    
    
    
    <div radio-button-group bound-member="aircraftToBeEnqueued.size" specification-object="aircraftSpecifications.aircraftSizeSpecification"></div>
    
    <div radio-button-group bound-member="aircraftToBeEnqueued.type" specification-object ="aircraftSpecifications.aircraftTypeSpecification"></div>
    
    
    
    
    <div class="col-md-3"> {{ specificationObject.title }}
    <br/>
    <br/>
    
    <br/>
</div>