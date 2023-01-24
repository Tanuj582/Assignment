({
	doInit: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.get("v.Selectedvalue"); 
        helper.getRecordList(component, pageNumber, pageSize);
    },    
        
    tabSelected : function(component, event, helper) {
        component.set("v.selected",'');
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.get("v.Selectedvalue"); 
        helper.getRecordList(component, pageNumber, pageSize);
        var len = component.get("v.selected");
        len.length = len.length - 1;
        component.set("v.selectedRecords",len.length);
        var objectName = component.get("v.objectName");
    },
    
    create : function(component, event, helper){
        component.set("v.showModal",true);
        component.set("v.selected",'');
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.get("v.Selectedvalue"); 
        helper.getRecordList(component, pageNumber, pageSize);
        var len = component.get("v.selected");
        len.length = len.length - 1;
        component.set("v.selectedRecords",len.length);
    },
    
    selectedRecords : function(component, event, helper) {
        var selectedId='';              
        selectedId = event.target.getAttribute("id");
        var selected = component.get("v.selected");
        if(document.getElementById(selectedId).checked && component.get("v.selected").indexOf(selectedId) < 0){
            component.get("v.selected").push(selectedId);
        }
        else{
            var index = component.get("v.selected").indexOf(selectedId);
            if (index > -1) {
                component.get("v.selected").splice(index, 1); 
            }
        }
        component.set("v.selectedRecords",selected.length);
    },
    
    delete : function(component, event, helper) {
    	var selected = component.get("v.selected");
        if(selected.length>0){
    	    var pageNumber = component.get("v.PageNumber");  
     	    var pageSize = component.get("v.Selectedvalue");
            helper.deleteRecords(component,selected,pageNumber,pageSize);
        }
	},
        
    Modalclose : function(component, event, helper) {
        component.set("v.showModal", false);
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.get("v.Selectedvalue");
    	helper.getRecordList(component, pageNumber, pageSize);
    },

	handleNext: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.get("v.Selectedvalue");
        var TotalPages = component.get("v.TotalPages");
        if(pageNumber<TotalPages)
        {
           pageNumber++;
           helper.getRecordList(component, pageNumber, pageSize);
        }
    },
        
    handlePrev: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.get("v.Selectedvalue");
        pageNumber--;
        helper.getRecordList(component, pageNumber, pageSize);
    },
        
    onSelectChange: function(component, event, helper) {
        var page = 1
        var pageSize = component.get("v.Selectedvalue");
        component.set("v.selected",'');
        helper.getRecordList(component, page, pageSize);
        var len = component.get("v.selected");
        len.length = len.length - 1;
        component.set("v.selectedRecords",len.length);
    },
        
    handleSelect : function(component, event, helper){
       var recId = event.getSource().get("v.class");
       var value = event.detail.menuItem.get("v.value");
       component.set("v.mode",value);
       component.set("v.recordId",recId);
       switch(value) {
    	  case "Edit": component.set("v.EditMode",false); break;
          case "View": component.set("v.ViewMode",false); break;
    	  case "Delete": helper.doDelete(component, recId); break;
       }
    },
     
    goBack : function(component,event,helper){
      	component.set("v.ViewMode",true); 
        component.set("v.EditMode",true);
        component.set("v.selected",'');
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.get("v.Selectedvalue");
        helper.getRecordList(component, pageNumber, pageSize);
        var len = component.get("v.selected");
        len.length = len.length - 1;
        component.set("v.selectedRecords",len.length);
    },
        
    showRow : function(component,event,helper){
    	component.set("v.ViewMode",false);
        var recId = event.currentTarget.dataset.record;
        component.set("v.recordId",recId);
        component.set("v.mode","View");
    },
    
    closeToast : function(component, event, helper){
         component.set("v.showToast",false);   
    },
   
})