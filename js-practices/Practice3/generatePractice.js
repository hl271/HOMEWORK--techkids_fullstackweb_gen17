'use strict'

function generate(testLengthArray){
  function insertionSort(input) {
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
  function linearSearch(input, target) {
    for (let x=0; x<input.length; x++) {
      if (input[x] === target) {
        return x
      }
    }
    return -1
  }
  function randomInt(end) {
    let num = Math.round(Math.random()*end)
    if (Math.random() <=0.5) {num *= -1}
    return num
  }
  function generateInput(length) {
    let input = []
    while (input.length < length) {
      let num = randomInt(1000)
      if (linearSearch(input, num) === -1) {input.push(num)}
    }
    return input
  }
  
  let length = testLengthArray.length
  let result = testLengthArray.map((item, index) => {
    let obj = {}    
    obj.input = insertionSort( generateInput(item))
    if (length >= 4) {
      switch(index) {
        case 0:
          obj.output = 0
          obj.target = obj.input[0]
          break
        case 1:
          let x = obj.input.length - 1
          obj.output = x
          obj.target = obj.input[x]
          break
        case 2:
          let mid
          while (true) {
            mid = Math.floor(Math.random()*item)
            if (mid !== 0 && mid !== (obj.input.length - 1)) {break}
          }
          obj.output = mid
          obj.target = obj.input[mid]
          break
        case 3: 
          let notFound
          while (true) {
            notFound = randomInt(1000)
            if (linearSearch(obj.input, notFound) === -1) {break}
          }
          obj.target = notFound
          obj.output = -1
          break
        default:
          obj.target = randomInt(1000)
          obj.output = linearSearch(obj.input, obj.target)
          break
      }
    }
    else {
      obj.target = randomInt(1000)
      obj.output = linearSearch(obj.input, obj.target)
    }
    return obj
  })
  return result
}

module.exports = generate
