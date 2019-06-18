/* eslint-disable no-console */

/**  
 * @typedef {Object} LoanInput
 * @property {number} price - The purchase price
 * @property {number} downpayment - The down payment
 * @property {number} interest - The interest rate as a decimal (0.05 = 5%)
 * @property {number} months - Loan term in months
 * @property {number} payment - Monthly payment
*/

/**
 * Calculates rows of an amortizationchart
 * 
 * @param {LoanInput} input - The loan information
 */
const calculateAmortization = (input) => {
    let period = 0;
    const amortizationRows = [];

    // calc the monthly payment
    while (period <= input.months) {
        if ( period === 0 ) {
            amortizationRows.push({
                period,                    
                endingBalance: input.price - input.downpayment,
                cumulativeInterest: 0,
                cumulativePayments: 0,
                cumulativePrincipal: 0
            })
        } else {
            const lastPeriod = amortizationRows[period - 1]
            const periodInterest = lastPeriod.endingBalance * ( input.interest / 12 );
            const periodPrincipal = input.payment - periodInterest;
            amortizationRows.push({
                period,
                periodInterest,
                periodPrincipal,
                startingBalance: lastPeriod.endingBalance,
                cumulativePayments: lastPeriod.cumulativePayments + input.payment,
                cumulativeInterest: lastPeriod.cumulativeInterest + periodInterest,
                cumulativePrincipal: lastPeriod.cumulativePrincipal + periodPrincipal,
                endingBalance: lastPeriod.endingBalance - periodPrincipal,
            });
        }
        period++;
    }

    console.log(amortizationRows);
    return amortizationRows;
}

const round2 = (value, decimals =2) => {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

/**
 * Calculates payment for given loan parameters
 * 
 * @param {LoanInput} input - The loan information
 */

const calculatePayment = (input) => {
    return round2(( input.price - input.downpayment ) * ((input.interest/12 * Math.pow( 1 + input.interest/12, input.months)) / (Math.pow ( 1 + input.interest/12, input.months) -1 )));
}

export {calculateAmortization, calculatePayment, round2}