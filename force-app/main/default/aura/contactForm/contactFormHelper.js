({
	createContact: function(component, newContact) {
        let createEvent = component.getEvent("createContact");
        createEvent.setParams({ "contact": newContact });
        createEvent.fire();
    },
})