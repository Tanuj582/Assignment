({
    doInit: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.get("v.Selectedvalue"); 
        helper.getContactList(component, pageNumber, pageSize);
    },    
	handleNext: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.get("v.Selectedvalue");
        pageNumber++;
        helper.getContactList(component, pageNumber, pageSize);
    },
    handlePrev: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.get("v.Selectedvalue");
        pageNumber--;
        helper.getContactList(component, pageNumber, pageSize);
    },
    onSelectChange: function(component, event, helper) {
        var page = 1
        var pageSize = component.get("v.Selectedvalue");
        helper.getContactList(component, page, pageSize);
    },
})