({
    doInit: function (component, event, helper) {
        helper.preloadImages(component);
        helper.setPhotoUrl(component, event, helper);
    },
    recordLoaded: function (component, event, helper) {
        /*
        component.set('v.color', component.get('v.simpleRecord.Paint__c'));
        component.set('v.model', component.get('v.simpleRecord.Model__c'));
        component.set('v.battery', component.get('v.simpleRecord.Battery__c'));

        helper.setPhotoUrl(component, event, helper);

        var changeType = event.getParams().changeType;
        if (changeType === "CHANGED") {
            component.find("recordEdit").reloadRecord();
        }
        */
    },
    modifyClick: function (component, event, helper) { 
        component.set('v.mode', 'Edit');
    },
    colorClick: function (component, event, helper) {
        var value = event.currentTarget.dataset.value;
        component.set('v.color', value);
        helper.saveRecord(component, event, helper);
    },
    modelClick: function (component, event, helper) {
        var value = event.currentTarget.dataset.value;
        component.set('v.model', value);
        helper.setPhotoUrl(component, event, helper);
        helper.saveRecord(component, event, helper);
    },
    batteryClick: function (component, event, helper) {
        var value = event.currentTarget.dataset.value;
        component.set('v.battery', value);
        helper.saveRecord(component, event, helper);
    },
    nextClick: function (component, event, helper) {
        var navigate = component.get("v.navigateFlow");
        navigate("NEXT");        
    }
})