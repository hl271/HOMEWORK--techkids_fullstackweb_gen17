'use strict'

function linearSearch(input, target) {
  for (let x=0; x<input.length; x++) {
    if (input[x] === target) {
      return x
    }
  }
  return -1
}

function binarySearch(input, target) {
  let end = input.length - 1
  let start = 0
  function search(input, start, end, target) {
    if (start <= end) {
      let mid = Math.floor(start + (end-start)/2)
      if (input[mid] === target) {
        return mid
      }
      if (input[mid] > target) {
        return search(input, start, mid-1, target)
      }
      else {
        return search(input, mid+1, end, target)
      }
    }
    return -1
  }
  return search(input, start, end, target)
}

//RESULT: Linear Search faster than Binary Search??

module.exports = linearSearch