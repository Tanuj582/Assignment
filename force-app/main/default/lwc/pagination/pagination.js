import { LightningElement, wire} from 'lwc';
import TotalContactRecords from '@salesforce/apex/lwcApexController.TotalContactRecords';
import getCons from '@salesforce/apex/lwcApexController.getCons';

export default class Pagination extends LightningElement {
    previous;
    next;

    RecordStart = 0;
    RecordEnd = 9;
    TotalRecords = 0;
    PageNumber = 1;
    TotalPages = 0;
    selectedOption = 10;
    @wire(getCons,{pageSize :'$selectedOption',offset:'$RecordStart'}) contacts;
    connectedCallback()
    {
        this.previous = false;
        this.next = true;
        TotalContactRecords({})
        .then(res => { 
            this.TotalRecords = res;
            this.TotalPages  = Math.ceil(this.TotalRecords / this.selectedOption);
        })
        .catch(error => { 
            alert("Return is not done successfully");
        }) 
    }

    
    setVariables()
    {
        this.RecordStart = 0;
        this.PageNumber = 1;
        this.previous = false;
        this.next = true;
        TotalContactRecords({})
        .then(res => { 
            this.TotalRecords = res;
            this.TotalPages  = Math.ceil(this.TotalRecords / this.selectedOption);
        })
        .catch(error => { 
            alert("Return is not done successfully");
        })  
    }
    
    handlePrev(){
        if(this.PageNumber>1)
        {
          this.previous = true;
          this.PageNumber--;
          this.RecordStart = parseInt(this.RecordStart) - parseInt(this.selectedOption);
          this.RecordEnd = parseInt(this.RecordEnd) - parseInt(this.selectedOption);
        }
        if(this.PageNumber === 1)
        {
            this.previous = false;
        }
        if(this.PageNumber>=1 && this.PageNumber<this.TotalPages)
        {
            this.next = true;
        }
    }
    handleNext(){
        if(this.PageNumber<this.TotalPages)
        {
         this.previous = true;
         this.PageNumber++; 
         this.RecordStart = parseInt(this.RecordEnd) + 1;
         this.RecordEnd = parseInt(this.RecordEnd) + parseInt(this.selectedOption);
        }
        if(this.PageNumber === this.TotalPages)
        {
            this.next = false;
        }
    }
    onSelectChange(event){
        this.selectedOption = event.target.value;
        this.setVariables();
        this.RecordEnd = this.selectedOption;
        this.RecordEnd = parseInt(this.RecordStart) + parseInt(this.selectedOption) - 1;
        } 
}