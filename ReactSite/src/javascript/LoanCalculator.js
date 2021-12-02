import React, { useState } from 'react';

export function LoanCalculator() {

    var currency = 'CAD';

    var [P, setP] = useState(0);
    var [r, setR] = useState(0);
    var [t, setT] = useState(0);
    var [n, setN] = useState(0);
    var [renderState, setRenderState] = useState(false);

    var [ periodicPayment, setPeriodicPayment ] = useState(0);
    var [ totalPayment, setTotalPayment ] = useState(0);
    var [ totalInterest, setTotalInterest ] = useState(0);

    var results = [];
    var [ numbers, setNumbers ] = useState([]);

    return (
        <>
            <h1> Loan Payment Calculator </h1>
            <div className="grid-wrapper">
                <div>
                <form className="grid-container">
                    <label>Enter principal amount ({currency}$) : 
                        <input 
                        type="text" 
                        value={P}
                        onChange={(e) => setP(e.target.value)}
                        />
                    </label>
                    <label>Periodic Payment: {periodicPayment}
                    </label>
                    <label>Enter interest amount (%) : 
                        <input 
                        type="text" 
                        value={r}
                        onChange={(e) => {
                            setR(e.target.value);
                        }}
                        />
                    </label>
                    <label>Total Payment: {totalPayment}
                    </label>
                    <label>Enter amortization period (years) : 
                        <input 
                        type="text" 
                        value={n}
                        onChange={(e) => setN(e.target.value)}
                        />
                    </label>
                    <label>Total Interest Paid:    {totalInterest}
                    </label>
                    <label>Enter annual number of payments: 
                        <select value={t} onChange={(e) => setT(e.target.value)}>
                            <option value='26'>Bi-Weekly</option>
                            <option value='24'>Bi-Monthly</option>
                            <option value='12'>Monthly</option>
                        </select>
                    </label>
                    <label />
                </form>
                <button
                    onClick={() => {
                    results = calculateResults(P, r/100, t, n);
                    setPeriodicPayment(currencyFormat(results[0], currency));
                    setTotalPayment(currencyFormat(results[1], currency));
                    setTotalInterest(currencyFormat(results[2], currency));
                    setNumbers(results[3]);
                    setRenderState(true);
                }}>Calculate</button>
                </div>
                <div id="renderTable">
                    <RenderTable numbers={numbers} render={renderState} />
                </div>
            </div>
        </>
    );
}

function calculateResults(P, r, t, n) {
    let periodicPayment = (P*(r/t)*(1+r/t)**(t*n))/((1+r/t)**(t*n)-1);
    let totalPayment = (periodicPayment*t*n);
    let totalInterest = (totalPayment-P);
    let amortizationTable = buildAmortizationTable(periodicPayment, P, r, t, n);
    console.log(amortizationTable);
    return [periodicPayment, totalPayment, totalInterest, amortizationTable];
}

function buildAmortizationTable(periodicPayment, P, r, t, n) {
    let amortizationTable = [];
    let principalRemaining = P;

    amortizationTable[0] = ['Pmt#', 'Interest', 'Principal'];
    amortizationTable[1] = [1,currencyFormat(P*r/t, 'CAD'),currencyFormat(periodicPayment-P*r/t, 'CAD')];
    for(let i=2; i<=(n*t); i++) {
        principalRemaining = principalRemaining*(1 + r/t) - periodicPayment;
        let interestPayment = principalRemaining * r/t;
        amortizationTable[i] = [i, currencyFormat(principalRemaining*(r/t), 'CAD'), 
        currencyFormat(periodicPayment - interestPayment, 'CAD')];
    }

    return amortizationTable;
}

function RenderTable(props) {

    const render = props.render;

    if (render && props.numbers!==[]) {
        var numbers = props.numbers;
        console.log(props.numbers);
        var rows = numbers.map((number, i) => {
            var entry = number.map((element, j) => {
                return (
                    <td key={j}>{element}</td>
                );   
            });
            return (
                <tr key={i}>{entry}</tr>
            );  
        });
        
        return (
            <table>
                <tbody>
                    {rows}    
                </tbody> 
            </table>
        );
    }

    else {
        return null;
    }
}

function currencyFormat(value, currency) {
    
    return (
        new Intl.NumberFormat('en', {
            style: 'currency',
            currency: currency
        }).format(value)
    );
}
