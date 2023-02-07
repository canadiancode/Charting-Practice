
    // FETCHING AND UPDATING THE CHART
// arrays for the price and timeframe
let chartTimeframe = [];
let chartPrice = [];

// variables for the data
let selectedAsset = 'bitcoin';
let selectedAssetName = 'Bitcoin';
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
            // change from Epoch time format to UTC
            let epochTimeframe = await price[0];
            let formattedDate = new Date(epochTimeframe);
            let longTimeframe = formattedDate.toUTCString();
            let timeframe = longTimeframe.substring(4, 16);        

            // add data to arrays
            chartTimeframe.push(timeframe);
            chartPrice.push(price[1]);
        }

        // update the chart with new data
        displayedChart.data.labels = chartTimeframe;
        displayedChart.data.datasets.forEach(dataset => {
            dataset.data = chartPrice;
            dataset.label = `Price of ${selectedAssetName}`;
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

        for (const asset of assetListData) {

            // for the ID 
            let assetID = await asset.id;
            const listOptions = document.createElement('option');
            listOptions.classList.add(assetID);

            
            // for the display name
            let assetName = await asset.name;
            listOptions.value = await assetName;

            // add option onto the dropdown selection
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

    // CHANGE THE ASSSET ON THE CHART
function changeAsset() {
    // change the data on the chart
    const assetList = document.querySelector('.assetList');
    let selectedEl = assetList.options[assetList.selectedIndex];
    let ID = selectedEl.classList[0];
    selectedAsset = ID;
    selectedAssetName = assetList.value;
    
    // adding the tab on the selected list
    const selectedAssetListEl = document.querySelector('.selectedAssetList');
    const addedAsset = document.createElement('div');
    addedAsset.classList.add('assetContainer');
    const removeButtonEl = document.createElement('button');
    removeButtonEl.appendChild(document.createTextNode('✖'));
    removeButtonEl.classList.add('removeAsset');
    addedAsset.appendChild(removeButtonEl);
    const buttonTextEl = document.createElement('p');
    buttonTextEl.classList.add('selectedAssetName');
    buttonTextEl.appendChild(document.createTextNode(selectedAssetName));
    addedAsset.appendChild(buttonTextEl);
    selectedAssetListEl.appendChild(addedAsset);

    // update the chart
    fetchData();
};
assetListEl.addEventListener('change', changeAsset);


    // CHANGE THE TIME PERIOD ON THE CHART
const selectedTimePeriodEl = document.querySelector('.timeframeList');
function changeTimeframe() {
    const timeframeList = document.querySelector('.timeframeList');
    selectedTimePeriod = timeframeList.value;
    fetchData();
}
selectedTimePeriodEl.addEventListener('change', changeTimeframe);

    // CODE FOR CHANGING THE CHART SCALE
let chartScale = 'linear'; //logarithmic or linear
const autoChartOption = document.querySelector('.autoChartOption');
autoChartOption.addEventListener('click', changeChartScale)
const logChartOption = document.querySelector('.logChartOption');
logChartOption.addEventListener('click', changeChartScale);
function changeChartScale(event) {

    if (event.target.classList.contains('autoChartOption')) {
        autoChartOption.style.backgroundColor = 'rgb(128, 128, 128, 0.6)';
        logChartOption.style.backgroundColor = 'rgb(128, 128, 128, 0.2)';
        chartScale = 'linear';
        function linearScale(chart) {
            chart.options.scales.y = {
                type: 'linear'
            };
            displayedChart.update();
        }
        linearScale();
    } else {
        autoChartOption.style.backgroundColor = 'rgb(128, 128, 128, 0.2)';
        logChartOption.style.backgroundColor = 'rgb(128, 128, 128, 0.6)';
        chartScale = 'logarithmic';
        function logarithmicScale(chart) {
            chart.options.scales.y = {
                type: 'logarithmic'
            };
            displayedChart.update();
        }
        logarithmicScale();
    }
}



    // CODE FOR THE CHART.JS LIBRARY
const ctx = document.querySelector('.chart');

const displayedChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [chartTimeframe],
      datasets: [
        {
        data: [chartPrice],
        label: `Price of ${selectedAsset}`,
        borderWidth: 1,
        pointRadius: 0
        }
      ]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    callback: function(value, index, ticks) {
                        return '$' + value;
                    }
                },
                display: true,
                type: 'logarithmic' //logarithmic or linear
            }
        }
    }
  });

// event listener for keeping canvas proper size
onresize = () => {
    ctx.style.width = '100%';
    ctx.style.height = '100%';
}