public with sharing class MuleSoftDemoController {
    @AuraEnabled
    public static List<Vehicle__c> GetNoDeliveryVehices() {
        return [SELECT Id, Name, Account__r.Name, Model__c, LastModifiedDate FROM Vehicle__c ORDER BY LastModifiedDate DESC LIMIT 15];
    }
}
