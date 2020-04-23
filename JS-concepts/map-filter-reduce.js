function myMap (array, fun) {
  let mapped = [];
  for (let item of array){
    mapped.push(fun(item));
  }
  return mapped;
}

function myFilter (array, fun){
  let filtered = [];
  for (let item of array){
    if (fun(item)){
      filtered.push(item);
    }
  }
  return filtered;
}

function myReduce(array, fun, start){
  let result = start;
  for (let item of array){
    result = fun(result, item)
  }
  return result;
}

myArray = [1,4,6,2,8,4,24,35,1];

console.log(myMap(myArray, x => x * 2));
console.log(myFilter(myArray, x => x >= 6));
console.log(myReduce(myArray, (x, y) => x + y, 0));