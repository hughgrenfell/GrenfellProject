var apiKey = "";
var indicator = "currentRatio";
var indicatorName;
var stockSymbol = "CM";
var url = "https://fmpcloud.io/api/v3/key-metrics/" + stockSymbol + "?limit=40&apikey=" + apiKey;
var numOfStocks = 1;
var chart, data;
var arrayStore = new Array();

// onload resources
window.onload = function() {

    document.getElementById("numOfStocksSelector").addEventListener('change', function() {
        setNumOfStocks(this.value);
    });

    document.getElementById("apiKeyEntry").addEventListener('change', function() {
        apiKey = this.value;
    });

    var b = document.getElementById("getDataButton");
    b.onclick = function() {
        setIndicator();
        for(let i = 1; i <= numOfStocks; i++) {
            stockSymbol = setStockSymbol(i);
            getJSON(stockSymbol, i - 1);
            sleep(30);
        }
    }

    var c = document.getElementById("drawChartButton");
    c.onclick = function() {
        createTable();
        drawChart();
    }
}

// format stock symbol to be accepted by API
function setStockSymbol(index) {
    switch(document.getElementById("stockSymbolSelector" + index).value) {
        case "cibc":
            return "CM";
        case "rbc":
            return "RY";
        case "td":
            return "TD";
        case "bmo":
            return "BMO";
        case "bns":
            return "BNS";       
        case "na":
            return "NA";
    }
}

// select which indicator to use
// future development: use this method to populate the list from options available from API
function setIndicator() {
    this.indicator = document.getElementById("indicatorSelector").value;
    // let indicatorName;
    switch(indicator) {
        case "currentRatio":
            indicatorName = "Current Ratio";
            break;
        case "peRatio":
            indicatorName = "PE Ratio";
            break;  
    }
}

// used to tabulate arrayStore, array built from json dump from API
function createTable() {
    if(document.getElementById("displayTable") != null) {
        let removeTable = document.getElementById('displayTable');
        let tableParent = removeTable.parentElement;
        tableParent.removeChild(removeTable);
    }

    let table = document.createElement('table');
    table.setAttribute('id', "displayTable");
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('jsonTable').appendChild(table);

    let headerRow = document.createElement('tr');
    for(let i = 0; i < arrayStore[0].length; i++) {
        let column = document.createElement('th');
        column.innerHTML = arrayStore[0][i];
        headerRow.appendChild(column);
    }

    thead.appendChild(headerRow);

    for(let i = 1; i < arrayStore.length; i++) {
        let row = document.createElement('tr');
        for(let j = 0; j < arrayStore[i].length; j++) {
            let column = document.createElement('td');
            column.innerHTML = arrayStore[i][j];
            row.appendChild(column);
        }
        tbody.appendChild(row);
    }
}

// method to allow user to evaluate performance of more than one stock at a time
// future development: get stock symbols from API
function setNumOfStocks(value) {

    this.numOfStocks = value;

    if(document.getElementsByName("stockSymbolSelector") != null) {
        let element = document.getElementsByName("stockSymbolSelector");
        for (let i = element.length - 1; i >= 0; i--) {
            element[i].parentNode.removeChild(element[i]);
        }
    }
    let select = document.getElementById("stockSymbol");
    let bankTextList = ["CIBC", "RBC", "TD", "BMO", "BNS", "NA"];
    let bankValueList = ["cibc", "rbc", "td", "bmo", "bns", "na"];

    for(let i = 0; i < value; i++) {
        let newSelect = document.createElement('select');
        newSelect.name = "stockSymbolSelector";
        newSelect.id = "stockSymbolSelector" + (i+1);
        for(let i = 0; i < 5; i++) {
            let optionElement = document.createElement('option');
            optionElement.value = bankValueList[i];
            optionElement.text = bankTextList[i];
            newSelect.appendChild(optionElement);
            }
            select.appendChild(newSelect);
        }
}

// build an array for display 
// future development: what if json format changes in API
function getJSON(stockSymbol, index) {
    let temp;
    url = "https://fmpcloud.io/api/v3/key-metrics/" + stockSymbol + "?limit=40&apikey=" + apiKey;

    // two indices used to reverse order of data from API
    fetch(url)
    .then(response => response.json())
    .then(input => {
        let i = 1;
        let k = 1;
        if(index == 0) {
            arrayStore[0] = ['date', stockSymbol + ' ' + indicatorName];
            for(let j = input.length - 1; j >= 0; j--) {
                arrayStore[i] = [input[j].date, input[j][indicator]];
                i++;
            }
        } else {
            arrayStore[0].push(stockSymbol + ' ' + indicatorName);
            for(let j = input.length - 1; j >= 0; j--) {
                arrayStore[k].push(input[j][indicator]);
                k++;
            }
        }
    })
    .catch(err => { throw err });
}

//   Build the chart 
function drawChart() {
    this.data = new google.visualization.arrayToDataTable(arrayStore, false);

    var options = {
        legend: {position: 'left'},
        title:indicatorName + " over Time", 
        width:800, 
        height:400,
        backgroundColor: '#fcf7f8', /*Snow*/
        isStacked: true
    };
    // Instantiate and draw the chart.
    this.chart = new google.visualization.LineChart(document.getElementById("chart_div"));
    chart.draw(data, options);
}

function sleep(milliseconds) {
    let start = new Date().getTime();
    for(let i = 0; i < 1e7; i++) {
        if((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}



