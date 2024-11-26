const PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

//checks if a value is a non-negative integer 
function validInteger(value) {
  if (typeof value === 'string') { //if value is a string tries making it an integer 
    const valueInteger = parseInt(value, 10);
    return valueInteger >= 0 && valueInteger.toString() === value;
  }
  return Number.isInteger(value)  && value>= 0;
}

function validatePriority(priority) {
  //converts priority to a number 
  const numPriority = typeof priority === 'string' ? parseInt(priority, 10) : priority;
  //checks if priority is in PRIORITY object, defaults to low priority if it isn't
  return Object.values(PRIORITY).includes(numPriority) ? numPriority : PRIORITY.LOW;
}

//gets currrent date and time in british date format 
function todaysDate() {
  return new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replace(',', ''); 
}

class Task {
  //initialises a new task
  constructor(title, priority) {
    this._title = title;
    this._priority = validatePriority(priority);
    this._added = todaysDate();
  }

  get title() {
    return this._title;
  }
  get priority() {
    return this._priority;
  }
  get added() {
    return this._added;
  }
  //setter which validates task priority 
  set priority(priority) {
    this._priority = validatePriority(priority);
  }
}

class ToDo {
  //initialises empty task list
  constructor() {
    this.tasks = [];
  }

  //method to add a new task to the list and return list length
  add(task) {
    this.tasks.push(task);
    return this.tasks.length;
  }

  //method to remove a task from the list by its title
  remove(title) {
    const index = this.tasks.findIndex(task => task.title.toLowerCase() === title.toLowerCase());
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false; //returns false if task is not found
  }

  //method to create a ist of tasks filtered by priority
  list(priority = 0) {
    return this.tasks
      .filter(task => priority === 0 || task.priority === priority)
      .map(task => [task.added, task.title, task.priority]);
  }

  //method to get a task from the list by its title
  task(title) {
    const foundTask = this.tasks.find(task => task.title.toLowerCase() === title.toLowerCase());
    if (!foundTask) {
      throw new Error(`Task '${title}' Not Found`); //error message if task is not found
    }
    return foundTask;
  }
}

// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
};