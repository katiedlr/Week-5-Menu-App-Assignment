class Child {
  constructor(name, group) {
    this.name = name;
    this.group = group;
  }
  
  describe() {
    return `${this.name} is in the ${this.group} group.`;
  }
}

class Schedule {
  constructor(time) {
    this.time = time;
    this.childs = [];
  }
  
  addChild(child) {
    if (child instanceof Child) {
      this.childs.push(child);
    } else {
      throw new Error(`You can only add an instance of a child. Argument is not a child: ${child}`);
    }
  }
  
  describe() {
    return `${this.time} schedule has ${this.childs.length} children.`;
  }
}

class Menu {
  constructor() {
    this.schedules = [];
    this.selectedSchedule = null;
  }
  
  start() {
    let selection = this.showMainMenuOptions();

    while (selection != 0) {
      switch (selection) {
        case '1':
          this.createSchedule();
          break;
        case '2':
          this.viewSchedule();
          break;
        case '3':
          this.removeChild();
          break;
        case '4':
          this.displaySchedules();
          break;
        default:
          selection = 0;
      }
      
      selection = this.showMainMenuOptions();
    }
    
    alert('Thank you, have a great day!');
  }
  
  showMainMenuOptions() {
    return prompt(`
      0) Exit
      1) Create New Schedule
      2) View Schedule
      3) Remove Child
      4) Display Schedules
    `);
  }
  
  showScheduleMenuOptions(scheduleInfo) {
    return prompt(`
      0) Back
      1) Create Child
      2) Remove Child
      ${scheduleInfo}
    `);
  }

  displaySchedules() {
    let scheduleString = '';

    for (let i = 0; i < this.schedules.length; i++) {
      scheduleString += i + ') ' + this.schedules[i].time + '\n';
    }

    alert(scheduleString);
  }
  
  createSchedule() {
    let time = prompt('Enter AM for morning schedule or PM for afternoon schedule:');
    this.schedules.push(new Schedule(time));
  }
  
  viewSchedule() {
    let index = prompt('Enter the index of the schedule you wish to view:');

    if (index > -1 && index < this.schedules.length) {
      this.selectedSchedule = this.schedules[index];
      let description = 'Selected Schedule: ' + this.selectedSchedule.time + '\n';

      for (let i = 0; i < this.selectedSchedule.childs.length; i++) {
        description += i + ') ' + this.selectedSchedule.childs[i].name + ' - ' + this.selectedSchedule.childs[i].group + '\n';
      }

      let selection = this.showScheduleMenuOptions(description);
      switch (selection) {
        case '1':
          this.createChild();
          break;
        case '2':
          this.removeChild();
          break;
      }
    }
  }
  
  createChild() {
    let name = prompt('Enter name for new child:');
    let group = prompt('Enter group for new child:');
    this.selectedSchedule.addChild(new Child(name, group));
  }
  
  removeChild() {
    let index = prompt('Enter the index of the child you would like to remove:');

    if (index > -1 && index < this.selectedSchedule.childs.length) {
      this.selectedSchedule.childs.splice(index, 1);
    }
  }
}

let menu = new Menu();
menu.start();
