public with sharing class lwcApexController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        List<Contact> lst = [Select FirstName,LastName,Phone,Email,Birthdate,Department from Contact];
        return lst;
    }

    @AuraEnabled
    public static void saveContactRecord(Contact objCon){
        try {
            insert objCon;
        } catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
    }

    @AuraEnabled
    public static void saveEdit(Contact con){
        try {
              update con;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void deleteContact(Id conId) {
        try{
        Contact c = [Select Id From Contact Where Id =:conId];
        delete c;
        }
        catch(Exception e)
        {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static Integer TotalContactRecords() {
        Integer totalRecords = [SELECT COUNT() FROM Contact];
        return totalRecords;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getCons(Integer pageSize,Integer offset) {
        List<Contact> l = [SELECT Id, FirstName, LastName, Phone, Email, Birthdate, Department
                           FROM Contact Order By createdDate desc limit: pageSize OFFSET :offset];
        return l;
    }
}