export function randNum() {
  let numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let genArr = [];
  let randInd = Math.floor(Math.random() * 9);
  genArr.push(numArr[randInd]);
  numArr.splice(randInd, 1);
  numArr.push(0);
  for (var i = 0; i < 3; i++){
    let randi = Math.floor(Math.random() * numArr.length);
    genArr.push(numArr[randi]);
    numArr.splice(randi, 1);
  }
  console.log(genArr);
  return genArr.join("");
}

export function passesChecks(text){
  console.log(text);
  if (!Number.isNaN(parseInt(text))) {
    if (text.length === 4) {
      if (text[0] !== "0"){
        let set = uniq(text.split(''));
        if (set.length === 4){
          return true;
        } else {
          alert("All digits must be unique.");
        }
      } else {
        alert("First digit cannot be 0.");
      }
    } else {
      alert("Need exactly 4 digits.");
    }
  } else {
    alert("Numbers only please.");
  }
  return false;
}

export function findBC(number, text){
  let cows = 0;
  let bulls = 0;
  for(let num in text){
    if (number.split('').includes(num)){
      console.log(num + " is in " + number.split(''))
      cows++;
    }
  }
  for (let i = 0; i < 4; i++){
    if(number[i] === text[i]){
      bulls++;
      cows--;
      console.log("Bulls: " + bulls + " Cows: " + cows)
    }
  }
  return [bulls, cows];
}

export function uniq(xs) {
    return Array.from(new Set(xs));
}
