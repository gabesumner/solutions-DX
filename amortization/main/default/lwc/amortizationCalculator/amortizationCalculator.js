import { LightningElement, api } from 'lwc';

export default class AmortizationCalculator extends LightningElement {

    @api recordId;
    @api objectApiName;
    fields = ['Price__c', 'Terms__c', 'Interest__c', 'Downpayment__c'];

}