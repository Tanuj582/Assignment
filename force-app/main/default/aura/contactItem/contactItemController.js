({
	deleteRow: function(component, event, helper) {
        let createEvent = component.getEvent("DeleteRow");
        createEvent.setParams({ "indexVar": component.get("v.rowIndex") });
        createEvent.fire();
    },
    handleUpdateContact: function(component, event, helper) {
        let createEvent = component.getEvent("EditRow");
        createEvent.setParams({ "EditIndex": component.get("v.rowIndex") });
        createEvent.fire();
    },
    cancel : function(component,event,helper){
         component.set("v.EditMode", false);  
    },
    inlineEdit : function(component, event, helper){   
        component.set("v.EditMode", true);        
    },
})