public class getRecords {
    @AuraEnabled
    public static String delRecords(String[] lstId, String obj){
        String msg='';
        String basequery = 'SELECT Id FROM '+ obj + ' WHERE Id IN: lstId';
        List<SObject> lst = Database.query(basequery);
        try{
            if(lst.size()>0){
                delete lst;
            }
        }
        catch(Exception ex){
            msg=ex.getMessage()+'\n'+ex.getLineNumber()+'\n'+ex.getCause();
        }
        return msg;
    }

    @AuraEnabled
    public static RecordDataTableWrapper pagination(Integer pageNumber, Integer pageSize, String obj) {
		Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
		Schema.SObjectType leadSchema = schemaMap.get(obj);
		Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
        
        Integer offset = (pageNumber - 1) * pageSize;
        String str = 'SELECT Id FROM '+obj;
        List<SObject> l = Database.query(str);
        Integer totalRecords = l.size();
        
        Integer recordEnd = pageSize * pageNumber;
 
        RecordDataTableWrapper objDT =  new RecordDataTableWrapper();  
        objDT.pageSize = pageSize;
        objDT.pageNumber = pageNumber;
        objDT.recordStart = offset + 1;
        objDT.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        objDT.totalRecords = totalRecords;
        
        List<String> strLst = new List<String>();
        String q = 'SELECT ';
        for (String fieldName: fieldMap.keySet()) {
            strLst.add(fieldName);
            q = q+''+fieldName+',';
        }
        objDT.fields = strLst;
		q = q.removeEnd(',');
        q = q+' FROM '+obj+' order by createdDate DESC LIMIT '+pageSize+' OFFSET '+offset;
        objDT.recLst = Database.query(q);
        return objDT;
    }
    
    public class RecordDataTableWrapper {
        @AuraEnabled
        public Integer pageSize {get;set;}
        @AuraEnabled
        public Integer pageNumber {get;set;}
        @AuraEnabled
        public Integer totalRecords {get;set;}
        @AuraEnabled
        public Integer recordStart {get;set;}
        @AuraEnabled
        public Integer recordEnd {get;set;}
        @AuraEnabled
        public List<SObject> recLst {get;set;}
        @AuraEnabled
        public List<String> fields {get;set;}
    } 
    
    @AuraEnabled 
    public static Boolean deleteRecord(Id recId, String obj){
        String basequery = 'SELECT Id FROM '+ obj + ' WHERE Id =: recId';
        SObject rec = Database.query(basequery);
        delete rec;
        return true;
    }
}