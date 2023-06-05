
// this function describes promises 
function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { message: 'Data fetched successfully' };
        resolve(data); // Resolving the promise with the data
      }, 2000);
    });
  }
  
  // Using the promise
  fetchData()
    .then((data) => {
      console.log(data); // Output: { message: 'Data fetched successfully' }
      
    })
    .catch((error) => {
      console.log(error); // Output: Any error that occurred during the promise
      
    });
  





// this function is describing a functinality of MAP 

const num = [1, 2, 3, 4, 5];

const squareNum = num.map((n) => n ** 2);

console.log(squareNum); 
// Output: [2, 4, 9, 16, 25]


// this function is describing a functinality of FILTER 

const number = [1, 2, 3, 4, 5];

const divisibleOftwo = number.filter((n) => n % 2==0);

console.log(divisibleOftwo); 
// Output: [2, 4]

// this function is describing a functinallity of REDUCER

const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(sum); // Output: 15





