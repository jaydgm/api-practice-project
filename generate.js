// calculates fibonacciNum 
// called from within self.onmessage
function calculateFib(fibonacciNum) {
    if (fibonacciNum <= 1) {
        return fibonacciNum;
    }
    return calculateFib(fibonacciNum - 1) + calculateFib(fibonacciNum - 2);
}

// listen for any messages coming from main.js
// take e (fibonacciNum) and passes it to 
// calculateFib
self.onmessage = function (e) {
    const fibonacciNum = e.data;

    const result = calculateFib(fibonacciNum);

    // send result back to .onmessage of main.js
    self.postMessage(result)
}