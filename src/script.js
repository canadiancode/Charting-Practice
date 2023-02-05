    // Bitcoin data from an API

// arrays for the price and timeframe
let chartTimeframe = [];
let chartPrice = [];

// variables for the data
let selectedAsset = 'bitcoin';
let selectedTimePeriod = '365';

// GET THE PRICE AND TIME OF ASSET
async function fetchData() {

    try {
        // link to fetch data from CoinGecko
        let URL = `https://api.coingecko.com/api/v3/coins/${selectedAsset}/market_chart?vs_currency=usd&days=${selectedTimePeriod}`;

        // Get the dataset from CoinGecko API
        let response = await fetch(URL);
        let data = await response.json();
        let prices = await data.prices;

        // remove the old data on the chart
        chartTimeframe = [];
        chartPrice = [];

        // extraction of the desired data from dataset (time and price)
        // use this instead of forEach for normal for loop for async await
        for (const price of prices) {
            // extract price and time values
            let epochTimeframe = await price[0];
            let roundedprice = Math.round(price[1]);

            // change from Epoch time format to UTC
            let formattedDate = new Date(epochTimeframe);
            let longTimeframe = formattedDate.toUTCString();
            let timeframe = longTimeframe.substring(4, 16);        

            // add data to arrays
            chartTimeframe.push(timeframe);
            chartPrice.push(roundedprice);
        }

        // update the chart with new data
        displayedChart.data.labels = chartTimeframe;
        displayedChart.data.datasets.forEach(dataset => {
            dataset.data = chartPrice;
            dataset.label = `Price of ${selectedAsset}`;
        });
        displayedChart.update();
    }
    catch(error) {
        console.log('cannot get data from coingecko...')
        console.log(error);
    }
};
fetchData();

// GENERATE LIST OF ASSETS
const assetListURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false';
const assetListEl = document.querySelector('.assetList');

async function getAssetList() {
    try {
        // fetch the list of assets
        let response = await fetch(assetListURL);
        let assetListData = await response.json();

        console.log(assetListData);

        for (const asset of assetListData) {
            let assetName = await asset.name;
            const listOptions = document.createElement('option');
            listOptions.classList.add('asset');
            listOptions.value = await assetName;
            listOptions.appendChild(document.createTextNode(assetName));
            assetListEl.appendChild(listOptions);
        }
    }
    catch(error) {
        console.log(error);
        console.log('cannot get list of assets from CoinGecko...');
    }
}
getAssetList();

// change the asset on the chart
function changeAsset() {
    const assetList = document.querySelector('.assetList');
    selectedAsset = assetList.value;
    fetchData();
};
assetListEl.addEventListener('change', changeAsset);


// change the timeframe on the chart
const selectedTimePeriodEl = document.querySelector('.timeframeList');
function changeTimeframe() {
    const timeframeList = document.querySelector('.timeframeList');
    selectedTimePeriod = timeframeList.value;
    fetchData();
}
selectedTimePeriodEl.addEventListener('change', changeTimeframe);


    // Code for the charting librarby ChartJS
const ctx = document.querySelector('.chart');

const displayedChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [chartTimeframe],
      datasets: [{
        data: [chartPrice],
        label: `Price of ${selectedAsset}`,
        borderWidth: 1,
        pointRadius: 0
      }]
    },
    options: {}
  });