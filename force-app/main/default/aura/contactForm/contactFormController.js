({
	clickCreate: function(component, event, helper) {
        let validContact = component.find('contactform').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if(validContact){
            let newContact = component.get("v.newContact");
            console.log("Create Contact: " + JSON.stringify(newContact));
            helper.createContact(component, newContact);
        }
    },
})