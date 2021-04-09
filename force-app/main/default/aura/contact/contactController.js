({
    handleUpdateContact: function(component, event, helper) {
        let updatedCon = event.getParam("contact");
        helper.updateContact(component, updatedCon);
    },
    handleCreateContact: function(component, event, helper) {
        let newContact = event.getParam("contact");
        helper.createContact(component, newContact);
    },
})