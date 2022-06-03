/* 
  CIT Project 3
  Name: Brady Rogers
*/

function validDenomination(coin) {
  // since -1 is false using !== as boolean returns false if -1, and true otherwise
  return [1, 2, 5, 10, 25, 50, 100].indexOf(coin) !== -1;

  // initial solution, using if, else statement to determine whether number is -1 (false), or place in array (true)
  /*let result = [1, 2, 5, 10, 25, 50, 100].indexOf(coin);
  if (result != -1) {
    return true;
  } else {
    return false;
  }
  return result;
  */
}

function valueFromCoinObject(obj) {
  //object deconstruction of obj function parameter
  //with constant variables denom and count both set to 0
  const { denom = 0, count = 0 } = obj;
  return denom * count;
}

function valueFromArray(arr) {
  /*
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += valueFromCoinObject(arr[i]);
  }
  return result;
  */
  // iterates through an array of coin objects and returns the final calculated value of all coin objects
  // using Array.reduce() method, and arrow function, calling valueFromCoinObject()
  return arr.reduce(
    (previousValue, currentValue) =>
      previousValue + valueFromCoinObject(currentValue),
    0
  );
}

//calls and returns valueFromArray()
function coinCount(...coinage) {
  return valueFromArray(coinage);
}

// coinCount is only exported functions from code module
module.exports = {
  coinCount,
};

//console.log([1, 2, 5, 10, 25, 50, 100].indexOf(49));
//console.log(validDenomination(41));
//console.log(valueFromCoinObject({ denom: 5, count: 3 }));

console.log("{}", coinCount({ denom: 5, count: 3 }));
console.log("{}s", coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 }));
const coins = [
  { denom: 25, count: 2 },
  { denom: 1, count: 7 },
];
console.log("...[{}]", coinCount(...coins));
