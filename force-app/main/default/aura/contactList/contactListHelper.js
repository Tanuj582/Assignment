({
    deleteContact: function(component, contact) {
        let action = component.get("c.deleteContact");
        action.setParams({
            "contact": contact
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS") {
                let c = component.get("v.contacts");
                c.push(response.getReturnValue());
                component.set("v.contacts", c);
            }
        });
        $A.enqueueAction(action);
    },
    updateContact: function(component, contact) {
        let action = component.get("c.saveContact");
        action.setParams({
            "contact": contact
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS") {
                let c = component.get("v.contacts");
                c.push(response.getReturnValue());
                component.set("v.contacts", c);
            }
        });
        $A.enqueueAction(action);
    },
})