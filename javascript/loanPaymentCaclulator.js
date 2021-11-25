var chart, data, t, P, r, n, nt, pmt, principalRemaining;
var payments = new Array();

// Set all functionality to be initianated by "calculate" button
window.onload = function() {
    var b = document.getElementById("calculateButton");
    b.onclick = function() {
        //Code below is used to format currency
        document.getElementById("payment").innerHTML = calculatePayment().toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        document.getElementById("totalPayment").innerHTML = getTotalPayment().toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        document.getElementById("totalInterest").innerHTML = getTotalInterest().toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
    }
}

function calculatePayment() {
    // Get payment frequency
    let paymentFrequency = document.getElementById("paymentFrequency").value;
    switch(paymentFrequency) {
        case "monthly":
            this.t = 12;
            break;
        case "biWeekly":
            this.t = 26;
            break;
        case "biMonthly":
            this.t = 24;
            break;
        default:
            this.t = 12;
    }

    // Get calculation input
    this.P = document.getElementById("loanAmount").value;
    this.r = document.getElementById("interestRate").value/100;
    this.n = document.getElementById("amortizationPeriod").value;
    this.nt = document.getElementById("amortizationPeriod").value*t;

    // Calculate payment
    this.pmt = (P*(r/t)*(1+r/t)**(nt))/((1+r/t)**(nt)-1);

    // Set payments array, with first input as headers
    payments = new Array();
    payments[0] = ['Month', 'Interest', 'Principal'];
    payments[1] = [1,P*r/t,pmt-P*r/t];
    principalRemaining = P*(1 + r/t) - pmt;
    for(let i=2;i<=nt;i++) {
        let interestPayment = principalRemaining * r/t;
        payments[i] =[i,principalRemaining*r/t,pmt - interestPayment];
        principalRemaining = principalRemaining*(1 + r/t) - pmt;
    }

    // Define the chart to be drawn.
    this.data = new google.visualization.arrayToDataTable(payments, false);
    var options = {
        legend: {position: 'left'},
        title:"Interest Distribution",
        hAxis: {title: 'Payment Number'},
        vAxis: {title: 'Payment ($)'},
        colors: ['#C8AD55', '#828489'], /*[Vegas Gold, Gray Web]*/
        width:800, 
        height:400,
        backgroundColor: '#fcf7f8', /*Snow*/
        isStacked: true
    };
    // Instantiate and draw the chart.
    this.chart = new google.visualization.ColumnChart(document.getElementById("chart_div"));
    chart.draw(data, options);
    
    return pmt;   
}

// Calculate total number of payments
function getTotalPayment() {
    let totalPayment = pmt * nt;
    return totalPayment;
}

// Calculate the total interest paid
function getTotalInterest() {
    let totalInterest = 0;
    for (let i = 1; i<=nt; i++) {
        totalInterest = totalInterest + payments[i][1];
    }

    return totalInterest;
}







