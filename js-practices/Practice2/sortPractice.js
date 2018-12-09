'use strict'

function quickSort(input) {
  function sort(input, start, end) {
    if (start >= end) return
    let count  = start
    let pivot = input[end]
    for (let x= start; x<=end; x++) {
      if (input[x] <= pivot) {
        //Swap input[count] and input[x]
        let temp = input[count]
        input[count] = input[x]
        input[x] = temp
        
        count++
      }
    }
    sort(input, start, count-2)
    sort(input, count, end)
  }
  let start = 0
  let end = input.length - 1
  sort(input, start, end)
  return input
}

function insertionSort(input){
  for (let i = 1; i<input.length; i++) {
    let x = input[i]
    let j = i - 1
    while (j>=0 && x < input[j]) {
      input[j+1] = input[j]
      j--
    }   
    input[j+1] = x
  }

  return input;
}

module.exports = insertionSort
