import { LightningElement } from 'lwc';
import indiaPostal from '@salesforce/apex/PostalApi.indiaPostal';
export default class PostalCode extends LightningElement {

    input;
    dataLst;
    postalCode = false;
    error;
    columns = [
    {label : "Post Office Name", fieldName : 'Name'},
    {label : "Pincode",fieldName : 'Pincode'},
    {label: "District", fieldName : 'District'},
    {label : 'State',fieldName : 'State'},
    {label : 'Country', fieldName : 'Country'},
    {label : 'Division',fieldName: 'Division'}
];
    handleInputChange(event)
    {
        this.input = event.target.value;
        console.log('$$input',this.input);
    }

    handleSearchClick()
    {
        console.log('$$Inside the handleSearchClick');
        indiaPostal({pincode : this.input}).then( result => {
            this.dataLst = result;
            if(this.dataLst != null)
            {
                this.postalCode = true;
                this.error = undefined;
            }
            else if(this.input == null)
            {
                  this.postalCode = false;
            }
            console.log('$$this.dataLst',this.dataLst);
        }).catch( error => {
            this.postalCode = undefined;
            this.error = error.body.message;
            console.log('$$error',error);
        })
    }
}
