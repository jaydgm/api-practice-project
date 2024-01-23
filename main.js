// initiate new web worker 
const worker = new Worker("./generate.js");

// using .onmessage to listen for any messages
// from web worker
worker.onmessage = function (e) {
  // display result of calculated fibonacciNum
  console.log('Fibonacci result: ', e.data);
}

// testing with different fib #'s,
// note: start to see slowness with 38
// send fibonacciNum to web worker
const fibonacciNum = 38;
worker.postMessage(fibonacciNum);

const apiQuoteUrl = 'https://zenquotes.io/api/random';
const apiCatUrl = 'https://api.thecatapi.com/v1/images/search'
const quoteContainer = document.getElementById('quoteContainer');
const catContainer = document.getElementById('catContainer');
const quoteBtn = document.getElementById('quoteBtn')
const catBtn = document.getElementById('catBtn')
let response;
let fetchCat;


async function getQuote() {
  try {
    response = await fetch(apiQuoteUrl);
    // if promise is resolved then format
    // to json and pass data into displayQuote
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json();
    displayQuote(data);
    } catch(error) {
      console.error('Error fetching data:', error);
    };
}


function getCat() {
  fetchCat = new Promise((resolve, reject) => {
    fetch(apiCatUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }
        return response.json();
      })
      .then(data => {
        displayCat(data[0]);
        resolve(data[0]);
      })
      .catch(error => {
        console.log('Error fetching data:', error)
        reject(error)
      });
  });
}

function displayQuote(quoteData) {
  // insert quote into quoteContainer div
  quoteContainer.innerHTML = `<p>${quoteData[0].q}</p><footer>${quoteData[0].a}</footer>`;
}

function displayCat(catData) {
  catContainer.innerHTML = `<img src="${catData.url}" alt="Random Cat">`;
}

Promise.all([fetchCat,response]) 
  .then((responses) => {
    console.log('it works! :D')
  })
  .catch((error) => {
    console.log(`Failed to fetch: ${error}`)
  })

// triggers new quote 
quoteBtn.addEventListener('click',getQuote)
catBtn.addEventListener('click',getCat)


// A function that uses the fetch() API *****
// A function that is using promises and interacting with promises *****
// Use of .then() method ****
// Use of the .json() method ****
// Use of Promise.all() and Promise.any() ****
// Use of async and await keywords ****
// a function that uses web workers ****
