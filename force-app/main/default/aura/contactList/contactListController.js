({
    doInit: function(component, event, helper) {
        let action = component.get("c.pagination");
        action.setParams({
            "pageNumber": 1,
            "pageSize": 10
        });
        action.setCallback(this, function(result) {
            let state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                component.set("v.contacts", resultData.contactList);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
    removeRow: function(component, event, helper) {
        var index = event.getParam("indexVar");
        var AllRowsList = component.get("v.contacts");
        helper.deleteContact(component, AllRowsList[index]);
        AllRowsList.splice(index, 1);
        component.set("v.contacts", AllRowsList);
    },
    EditRow: function(component, event, helper) {
        var index = event.getParam("EditIndex");
        var AllRowsList = component.get("v.contacts");
        helper.updateContact(component, AllRowsList[index]);
        AllRowsList.splice(index, 1);
    },
})