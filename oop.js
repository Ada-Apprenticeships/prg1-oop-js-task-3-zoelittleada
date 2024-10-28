const PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

function validInteger(value) {
  if (typeof value === 'string') {
    const valueInteger = parseInt(value, 10);
    return valueInteger >= 0 && valueInteger.toString() === value;
  }
  return Number.isInteger(value)  && value>= 0;
}

function validatePriority(priority) {
  const numPriority = typeof priority === 'string' ? parseInt(priority, 10) : priority;
  return Object.values(PRIORITY).includes(numPriority) ? numPriority : PRIORITY.LOW;
}

function todaysDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = (today.getMonth()+1).toString().padStart(2,'0')
  const day = today.getDate().toString().padStart(2,'0')
  const hours = today.getHours().toString().padStart(2,'0')
  const minutes = today.getMinutes().toString().padStart(2,'0')
  const seconds = today.getSeconds().toString().padStart(2,'0')
  return`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

class Task {
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
  set priority(priority) {
    this._priority = validatePriority(priority);
  }
}

class ToDo {
  constructor() {
    this.tasks = [];
  }

  add(task) {
    this.tasks.push(task);
    return this.tasks.length;
  }

  remove(title) {
    const index = this.tasks.findIndex(task => task.title.toLowerCase() === title.toLowerCase());
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  list(priority = 0) {
    return this.tasks
      .filter(task => priority === 0 || task.priority === priority)
      .map(task => [task.added, task.title, task.priority]);
  }

  task(title) {
    const foundTask = this.tasks.find(task => task.title.toLowerCase() === title.toLowerCase());
    if (!foundTask) {
      throw new Error(`Task '${title}' Not Found`);
    }
    return foundTask;
  }
}

// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
};