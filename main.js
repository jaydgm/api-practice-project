const apiUrl = 'https://zenquotes.io/api/random';
const quoteContainer = document.getElementById('quoteContainer');
const quoteBtn = document.getElementById('btn')

async function getQuote() {
  try {
  
    const response = await fetch(apiUrl);
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


function displayQuote(quoteData) {
  // insert quote into quoteContainer div
  quoteContainer.innerHTML = `<p>${quoteData[0].q}</p><footer>${quoteData[0].a}</footer>`;
}

// triggers new quote 
quoteBtn.addEventListener('click',getQuote)


// A function that uses the fetch() API *****
// A function that is using promises and interacting with promises
// Use of .then() method
// Use of the .json() method ****
// Use of Promise.all() and Promise.any()
// Use of async and await keywords ****
