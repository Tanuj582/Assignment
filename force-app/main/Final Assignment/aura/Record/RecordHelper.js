({
	getRecordList: function(component, pageNumber, pageSize) {
        component.set("v.toggleSpinner", true);
        let action = component.get("c.pagination");
        action.setParams({
            "pageNumber": pageNumber,
            "pageSize": pageSize,
            "obj" : component.get("v.objectName")
        });
        action.setCallback(this, function(result) {
            let state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                component.set("v.toggleSpinner", false);
                var resultData = result.getReturnValue();
                component.set("v.fields",resultData.fields);
                component.set("v.records", resultData.recLst);
                component.set("v.PageNumber", resultData.pageNumber);
                component.set("v.TotalRecords", resultData.totalRecords);
                component.set("v.RecordStart", resultData.recordStart);
                component.set("v.RecordEnd", resultData.recordEnd);
                component.set("v.TotalPages", Math.ceil(resultData.totalRecords / pageSize));
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
    
	deleteRecords : function(component,selected,pageNumber,pageSize){
        var action = component.get("c.delRecords");
        var selectedRec = component.get("v.selectedRecords");
        action.setParams({
            "lstId" : selected,
            "obj" : component.get("v.objectName")
        });
        action.setCallback(this,function(result){
            if(result.getState()=='SUCCESS'){
                var returned = result.getReturnValue();
                if(returned == ''){
                    this.getRecordList(component, pageNumber, pageSize);       
                    component.set("v.showToast",true);
                    var message = ""+selectedRec+" record deleted successfully";
                    component.set("v.message",message);
               }
            }
        });
        component.set("v.selected",'');
        var len = component.get("v.selected");
        len.length = len.length - 1; 
        component.set("v.selectedRecords",len.length);
        $A.enqueueAction(action);
    },
    
    doDelete : function(component, recId){
       var action = component.get("c.deleteRecord");
        action.setParams({
            "recId" : recId,
            "obj" : component.get("v.objectName")
        }); 
        action.setCallback(this,function(result){
            if(result.getState()=='SUCCESS'){
                var pageNumber = component.get("v.PageNumber");  
     	   	    var pageSize = component.get("v.Selectedvalue");
                this.getRecordList(component, pageNumber, pageSize);
                component.set("v.showToast",true);
                component.set("v.message","Record Deleted Successfully");
             }
        });
        component.set("v.selected",'');
        var len = component.get("v.selected");
        len.length = len.length - 1;
        component.set("v.selectedRecords",len.length);
        $A.enqueueAction(action);
    },
})