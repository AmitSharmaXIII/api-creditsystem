const luhnAlgoCheck = async (number) => {
    var cardArray = String(number).split("").map((number)=>{
        return Number(number)
      });

      let arr = (number + '')
      .split('')
      .reverse()
      .map(x => parseInt(x));
    let lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + (((val * 2) % 9) || 9)), 0);
    sum += lastDigit;
    return sum % 10 === 0;
}

module.exports  = {luhnAlgoCheck};