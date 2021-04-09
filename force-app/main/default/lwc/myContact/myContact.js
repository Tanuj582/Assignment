import { LightningElement, track} from 'lwc';
import saveContactRecord from '@salesforce/apex/lwcApexController.saveContactRecord';

export default class CreateRecordInLWC extends LightningElement {

    ContactRecord = {
        FirstName : '',
        LastName : '',
        Phone : '',
        Email : '',
        Birthdate : '',
        Department : '',
    };


    handleFNameChange(event) {
        this.ContactRecord.FirstName = event.target.value;
    }

    handleLNameChange(event) {
        this.ContactRecord.LastName = event.target.value;
    }

    handlePhoneChange(event) {
        this.ContactRecord.Phone = event.target.value;
    }

    handleEmailChange(event) {
        this.ContactRecord.Email = event.target.value;
    }

    handleBirthdateChange(event) {
        this.ContactRecord.Birthdate = event.target.value;
    }

    handleDepartmentChange(event) {
        this.ContactRecord.Department = event.target.value;
    }

    handleSave() {
        console.log(JSON.stringify(this.ContactRecord));
        saveContactRecord({objCon : this.ContactRecord})
        window.location.reload();
    }
}