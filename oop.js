PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };


function validInteger (value) { // value can be a string or a number (integer)
  const num = Number(value);
  return !isNaN(num) && Number.isInteger(num) && num>0;
}  

function validatePriority(priority) { // value can be a string or a number (integer)

}


function todaysDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDay()
  return`${day}/${month}/${year}`
}

console.log(todaysDate())


class Task  {

  // (title, priority)
}


class ToDo {
    
}








// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}