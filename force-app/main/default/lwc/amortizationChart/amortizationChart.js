/* eslint-disable no-console */
import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { loadScript } from 'lightning/platformResourceLoader';

import chartjs from '@salesforce/resourceUrl/chart';

import { calculateAmortization, calculatePayment, round2 } from './paymentCalc';

export default class AmortizationChart extends LightningElement {

    @api recordId;

    chart;
    _chartjsInitialized = false;
    
    @wire(getRecord, { recordId: '$recordId', fields: ['Loan__c.Price__c', 'Loan__c.Terms__c', 'Loan__c.Interest__c', 'Loan__c.Downpayment__c']} )
    recordLoaded ({error, data}) {
        if (error) {
            // TODO: Error handling
        } else if (data) {
            // console.log(JSON.parse(JSON.stringify(data)));

            this.loanInputs = {
                months: data.fields.Terms__c.value,
                interest: data.fields.Interest__c.value/100,
                price: data.fields.Price__c.value,
                downpayment: data.fields.Downpayment__c.value
            }
            this.buildConfig();
            this.createChart();
        }
    }

    createChart() {
        if (window.Chart && this.configLine) {
            const ctx = this.template
                .querySelector('canvas.line')
                .getContext('2d');
            
            this.chart = new window.Chart(ctx, this.configLine);        
        }            
    }

    buildConfig() {
        this.loanInputs.payment = calculatePayment(this.loanInputs);
        this.amortizationRows = calculateAmortization(this.loanInputs);

        this.configLine = {
            type: 'line',
            data: {
                datasets: [
                    {
                        data: this.amortizationRows.map( row => round2(row.endingBalance)),
                        borderColor: 'rgb(255, 167, 5)',
                        pointBackgroundColor: 'rgb(255, 167, 5)',
                        label: 'Balance',
                        fill: false
                    },
                    {
                        data: this.amortizationRows.map( row => round2(row.cumulativePayments)),
                        backgroundColor: 'rgb(199, 201, 228, 0.2)',
                        label: 'Total Payments'
                    },
                    {
                        data: this.amortizationRows.map( row => round2(row.cumulativeInterest)),
                        backgroundColor: 'rgb(199, 201, 228, 0.7)',
                        label: 'Interest',
                    }
                ],
                // these will be the period numbers on the x axis
                labels: this.amortizationRows.map( row => row.period)
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                } ,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0
                        },
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }
        };
    }

    renderedCallback() {
        console.log('rendered callback fired');

        if (this._chartjsInitialized) {
            return;
        }
        this._chartjsInitialized = true;
        
        loadScript(this, chartjs)
        .then( () => {
            this.createChart();
        });
    }
}