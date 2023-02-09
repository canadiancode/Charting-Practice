
    // FETCHING AND UPDATING THE CHART
// arrays for the price and timeframe
let chartTimeframe = []; 
let AddedPriceData = []; // the new asset getting added in
let assetPricesData = []; // list of all assets

// variables for the data
let selectedAssetIDs = ['bitcoin'];
let selectedAssetNames = ['Bitcoin'];
let selectedAssetID = 'bitcoin';
let selectedAssetName = 'Bitcoin';
let selectedTimePeriod = '365';

    // FETCH TIMEFRAME OF DATA
async function fetchTimeframe() {
    try {
        // link to fetch data from CoinGecko
        let URL = `https://api.coingecko.com/api/v3/coins/${selectedAssetID}/market_chart?vs_currency=usd&days=${selectedTimePeriod}`;

        // Get the dataset from CoinGecko API
        let response = await fetch(URL);
        let data = await response.json();
        let prices = await data.prices;

        // extraction of the desired data from dataset (time and price)
        // use this instead of forEach for normal for loop for async await
        chartTimeframe = [];
        for (const price of prices) {
            // change from Epoch time format to UTC
            let epochTimeframe = await price[0];
            let formattedDate = new Date(epochTimeframe);
            let longTimeframe = formattedDate.toUTCString();
            let timeframe = longTimeframe.substring(4, 16);        

            // add time to label array
            chartTimeframe.push(timeframe);
        }

        // update the chart with new timeframe
        displayedChart.data.labels = chartTimeframe;
        displayedChart.update();
    }
    catch(error) {
        console.log('cannot get timeframe data from coingecko...')
        console.log(error);
    }
};

    // GET THE PRICE OF ASSET
async function fetchPrice() {
    try {
        // link to fetch data from CoinGecko
        let URL = `https://api.coingecko.com/api/v3/coins/${selectedAssetIDs[0]}/market_chart?vs_currency=usd&days=${selectedTimePeriod}`;

        // Get the dataset from CoinGecko API
        let response = await fetch(URL);
        let data = await response.json();
        let prices = await data.prices;

        // extraction of the desired data from dataset (time and price)
        // use this instead of forEach for normal for loop for async await
        AddedPriceData = [];
        for (const price of prices) {
            // add price data to arrays
            AddedPriceData.push(price[1]);
        }

        // Adding new data to the assetPricesData array
        let newDataObject = {
            label: `Price of ${selectedAssetName}`,
            data: AddedPriceData,
            fill: false,
            pointRadius: 0,
            borderWidth: 1,
            backgroundColor: "rgba(255, 255, 255)",
            borderColor: "rgb(255, 255, 255)",
        };
        assetPricesData.push(newDataObject);
        displayedChart.data.datasets = assetPricesData;
        displayedChart.update();
    }
    catch(error) {
        console.log('cannot get price data from coingecko...')
        console.log(error);
    }
};
fetchTimeframe();
fetchPrice();

    // GENERATE LIST OF ASSETS
const assetListURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false';
const assetListEl = document.querySelector('.assetList');
const addDataButton = document.querySelector('.addDataButton');
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

    // ADD NEW ASSET TO THE CHART
function addAsset() {

    // change the data on the chart
    const assetList = document.querySelector('.assetList');
    let selectedEl = assetList.options[assetList.selectedIndex];
    let ID = selectedEl.classList[0];
    selectedAssetID = ID;
    selectedAssetName = assetList.value;
    selectedAssetNames.push(selectedAssetName);
    selectedAssetIDs.push(ID);
    
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

    async function fetchNewPrice() {
        try {
            // link to fetch data from CoinGecko
            let URL = `https://api.coingecko.com/api/v3/coins/${selectedAssetID}/market_chart?vs_currency=usd&days=${selectedTimePeriod}`;
    
            // Get the dataset from CoinGecko API
            let response = await fetch(URL);
            let data = await response.json();
            let prices = await data.prices;
    
            // extraction of the desired data from dataset (time and price)
            // use this instead of forEach for normal for loop for async await
            AddedPriceData = [];
            for (const price of prices) {
                // add price data to arrays
                AddedPriceData.push(price[1]);
            }
    
            // Adding new data to the assetPricesData array
            let newDataObject = {
                label: `Price of ${selectedAssetName}`,
                data: AddedPriceData,
                fill: false,
                pointRadius: 0,
                borderWidth: 1,
                backgroundColor: "rgba(255, 255, 255)",
                borderColor: "rgb(255, 255, 255)",
            };
            assetPricesData.push(newDataObject);
            displayedChart.data.datasets = assetPricesData;
            displayedChart.update();
        }
        catch(error) {
            console.log('cannot get price data from coingecko...')
            console.log(error);
        }
    };

    // update the chart
    fetchNewPrice();
    fetchTimeframe();

};
addDataButton.addEventListener('click', addAsset);


    // CHANGE THE TIME PERIOD ON THE CHART
function changeTimeframe() {
    const timeframeList = document.querySelector('.timeframeList');
    selectedTimePeriod = timeframeList.value;

    assetPricesData = [];

    async function fetchNewTimeframe() {
        try {
                // FETCH AND DISPLAY TIMEFRAME DATA
            let timeframeURL = `https://api.coingecko.com/api/v3/coins/${selectedAssetID}/market_chart?vs_currency=usd&days=${selectedTimePeriod}`;
            const response = await fetch(timeframeURL);
            const fetchedData = await response.json();
            const timeData = await fetchedData.prices;
            
            // remove old time data to replace with new data
            chartTimeframe = [];

            // looping through the fetched data and pushing to displayed array
            for (const time of timeData) {
                // change from Epoch time format to UTC
                let epochTimeframe = await time[0];
                let formattedDate = new Date(epochTimeframe);
                let longTimeframe = formattedDate.toUTCString();
                let timeframe = longTimeframe.substring(4, 16);   
                chartTimeframe.push(timeframe);
            }

            // update the chart with the new time data
            displayedChart.data.labels = chartTimeframe;
            displayedChart.update();

                // FETCH AND DISPLAY PRICE DATA
            let singleAssetPriceData = [];
            let listOfAssetPrices = [];
            for (const asset of selectedAssetIDs) {
                let assetPriceURL = `https://api.coingecko.com/api/v3/coins/${asset}/market_chart?vs_currency=usd&days=${selectedTimePeriod}`;
                const response = await fetch(assetPriceURL);
                const assetPriceData = await response.json();
                const assetPriceAndTime = await assetPriceData.prices;
                singleAssetPriceData = [];
                assetPriceAndTime.forEach(array => {
                    const justPrice = array[1];
                    singleAssetPriceData.push(justPrice);
                });
                listOfAssetPrices.push(singleAssetPriceData);
            };
            for (let i = 0; i < selectedAssetNames.length; i++) {
                let newDataObject = {
                    label: `Price of ${selectedAssetNames[i]}`,
                    data: listOfAssetPrices[i],
                    fill: false,
                    pointRadius: 0,
                    borderWidth: 1,
                    backgroundColor: "rgba(255, 255, 255)",
                    borderColor: "rgb(255, 255, 255)",
                };
                assetPricesData.push(newDataObject);
            }
            displayedChart.data.datasets = assetPricesData;
            displayedChart.update();
        }
        catch(error) {
            console.log('cannot get new timeframe data from coingecko...')
            console.log(error);
        }
    }
    // let newDataObject = {
    //     label: `Price of ${selectedAssetNames[i]}`,
    //     data: AddedPriceData,
    //     fill: false,
    //     pointRadius: 0,
    //     borderWidth: 1,
    //     backgroundColor: "rgba(255, 255, 255)",
    //     borderColor: "rgb(255, 255, 255)",
    // };
    // assetPricesData.push(newDataObject);
    fetchNewTimeframe();
};
const selectedTimePeriodEl = document.querySelector('.timeframeList');
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
        displayedChart.options.scales.y.type = chartScale;
        displayedChart.update();
    } else {
        autoChartOption.style.backgroundColor = 'rgb(128, 128, 128, 0.2)';
        logChartOption.style.backgroundColor = 'rgb(128, 128, 128, 0.6)';
        chartScale = 'logarithmic';
        displayedChart.options.scales.y.type = chartScale;
        displayedChart.update();
    }
}

    // CODE FOR THE CHART.JS LIBRARY
const ctx = document.querySelector('.chart');

const displayedChart = new Chart(ctx, {
    type: 'line',  // data: assetPricesData,
    data: {
        labels: chartTimeframe,
        datasets: assetPricesData,
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
                type: chartScale //logarithmic or linear
            }
        }
    }
  });

// event listener for keeping canvas proper size
onresize = () => {
    ctx.style.width = '100%';
    ctx.style.height = '100%';
}