const square = (x) => x * x;
console.log(square(9))

const event = {
  name: 'Birthday Party!!!!',
  guestList: ["Sasha", 'Nastya', 'Erik', "Alex", "Majara"],
  printGuestList() {
    console.log('Guest list for ' + this.name)
    this.guestList.forEach((guest) => {
      console.log(guest + ' is attending ' + this.name)
    })
  }
}

event.printGuestList()