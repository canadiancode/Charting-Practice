    // Bitcoin data from an API

//variables
const getDataButton = document.querySelector('.getDataButton');
const bitcoinPriceURL = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily';

//async await code
async function fetchData() {

    // Get the dataset from CoinGecko API
    let response = await fetch(bitcoinPriceURL);
    let bitcoinData = await response.json();
    let bitcoinPrice = await bitcoinData.prices;

    // extraction of the desired data from dataset (time and price)
    for (let i = 0; i < bitcoinPrice.length; i++) {
        let timeframe = bitcoinPrice[i][0];
        let price = Math.round(bitcoinPrice[i][1]);

        chartTimeframe.push(timeframe);
        chartPrice.push(price);
    };

    // console price and time values
    console.log(chartTimeframe);
    console.log(chartPrice);

    // update the chart with new data
    displayedChart.data.labels = chartTimeframe;
    displayedChart.data.datasets.forEach(dataset => {
        dataset.data = chartPrice;
    });
    
    displayedChart.update();

};


let chartTimeframe = [];
let chartPrice = [];
getDataButton.addEventListener('click', fetchData);





    // Code for the charting librarby ChartJS
const ctx = document.querySelector('.chart');

const displayedChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [chartTimeframe],
      datasets: [{
        data: [chartPrice],
        label: 'Price of Bitcoin',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });