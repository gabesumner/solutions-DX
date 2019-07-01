({
    doInit: function(component, event, helper) {
        var action = component.get('c.GetNoDeliveryVehices');
        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set('v.vehicles', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
    }
})
