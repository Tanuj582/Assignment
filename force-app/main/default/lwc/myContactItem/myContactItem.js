import { LightningElement,api,track,wire } from 'lwc';
import deleteContact from '@salesforce/apex/lwcApexController.deleteContact';
import saveEdit from '@salesforce/apex/lwcApexController.saveEdit';
import getContacts from '@salesforce/apex/lwcApexController.getContacts';
import FirstName from '@salesforce/schema/Contact.FirstName';

export default class MyContactItem extends LightningElement {
    @track contact;
    @api rowindex;
    @track EditMode=false;
    @track recId;

    @api
    get itemName() {
        return this.contact;
    }
    set itemName(value) {
        this.contact = JSON.parse(JSON.stringify(value));
    }

    @wire(getContacts) ContactRecord;
     ContactRecord = {
         Id        : '',
        FirstName  : '',
        LastName   : '',
        Phone      : '',
        Email      : '',
        Birthdate  : '',
        Department : '',
    };
    
    fnameInpChange(event){
        this.ContactRecord.FirstName = event.target.value;
      }
      lnameInpChange(event){
        this.ContactRecord.LastName = event.target.value;
      }
      phoneInpChange(event){
        this.ContactRecord.Phone = event.target.value;
     }
      emailInpChange(event){
         this.ContactRecord.Email = event.target.value;
       }
       dateInpChange(event){
         this.ContactRecord.Birthdate = event.target.value;
       }    
       departmentInpChange(event){
        this.ContactRecord.Department = event.target.value;
      }        

    cancel(){
        this.EditMode=false;
    }

    inlineEdit(){
        this.EditMode=true;
    }
    deleteRow(event){
        this.recId = event.target.dataset.recordId;
        deleteContact({conId : this.recId})
        window.location.reload();
        /*const event = new CustomEvent('deleterow', {
            detail: {
                deleteindex:this.rowindex
            },
        });
        this.dispatchEvent(event);*/
    }
    handleUpdateContact(event){
        this.EditMode = false;
        this.ContactRecord.Id = event.target.dataset.recordId;
        saveEdit({con : this.ContactRecord})
        window.location.reload();
        /*const event = new CustomEvent('editrow', {
            detail: {
                editindex:this.rowindex,
                contact:this.contact
            },
        });
        this.dispatchEvent(event);*/
    }
}