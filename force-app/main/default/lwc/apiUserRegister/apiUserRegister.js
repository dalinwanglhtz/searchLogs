import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import apiUserRegister from '@salesforce/apex/SearchLogs.apiUserRegister';

export default class ApiUserRegister extends LightningElement {

    handleRegister() {
        let apiUser = {}
        let inputs = this.template.querySelectorAll('lightning-input');
        inputs.forEach(element => {
            if(element.name == 'username') {
                apiUser.Username__c = element.value;
            } else if(element.name == 'password') {
                apiUser.Password__c = element.value;
            } else if(element.name == 'clientId') {
                apiUser.Client_ID__c = element.value;
            } else if(element.name == 'clientSecret') {
                apiUser.Client_Secret__c = element.value;
            }
        });
        this.registerApiUser(apiUser);
    }

    registerApiUser(apiUser) {
        apiUserRegister({apiUser: apiUser})
            .then((result) => {
                this.dispatchEvent(new CustomEvent('registersuccess'));
            })
            .catch((error) => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                }));
            })
    }
}