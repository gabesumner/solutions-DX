({
    recordUpdated : function(component, event, helper) {
        component.find("forceRecordCmp").reloadRecord();
    },

    checkCredit : function(component, event, helper) {
        var spinner = component.find("spinner").getElement();
        var creditDetails = component.find("creditDetails").getElement();
        spinner.style.display = 'block';
        creditDetails.style.display = 'none';
        
        setTimeout(function() {
            var amountRequested = component.get("v.simpleRecord.Price__c") - component.get("v.simpleRecord.Downpayment__c");
            var date = new Date();
            var n = date.toISOString();

            component.set("v.simpleRecord.Application_ID__c", helper.getRandomInt(111111111, 999999999).toString());
            component.set("v.simpleRecord.Credit_Score__c", helper.getRandomInt(650, 750));
            component.set("v.simpleRecord.Credit_Requested__c", amountRequested);
            component.set("v.simpleRecord.Credit_Limit__c", 500000);
            component.set("v.simpleRecord.Credit_Created_Date__c", n);
            component.set("v.simpleRecord.Credit_Modified_Date__c", n);
            
            spinner.style.display = 'none';
            creditDetails.style.display = 'block';

            component.find("forceRecordCmp").saveRecord(
                $A.getCallback(function(saveResult) {
                    if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                        console.log("Save completed successfully.");
                    } else if (saveResult.state === "INCOMPLETE") {
                        console.log("User is offline, device doesn't support drafts.");
                    } else if (saveResult.state === "ERROR") {
                        console.log('Problem saving record, error: ' + 
                                   JSON.stringify(saveResult.error));
                    } else {
                        console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                    }                    
                }
            ));           

        }, 3000);
    }
})