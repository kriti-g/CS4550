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
  return genArr;
}

export function uniq(xs) {
    return Array.from(new Set(xs));
}

export function bad_guesses(number, guesses) {
    return uniq(guesses.filter((x) => x === number));
}

export function lives_left(number, guesses) {
    return 8 - bad_guesses(number, guesses).length;
}
