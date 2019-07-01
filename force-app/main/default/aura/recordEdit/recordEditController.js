({
    doInit: function(component, event, helper) {
        setTimeout(function() {
            var cmpTarget = component.find('buttons');
            $A.util.removeClass(cmpTarget, 'hide');            
        }, 800);
    },    
    save : function(component, event, helper) {
        component.find("edit").get("e.recordSave").fire();
        window.location.href = '?';

        /*
        var x = component.find("snackbar").getElement();
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        */
    },

    cancel: function(component, event, helper) {
        window.location.href = '?';
    }
})
