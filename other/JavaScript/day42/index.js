function Restaurant(cash, seats, staff) {
    this.cash = cash || 1000000;
    this.seats = seats || 20;
    this.hire = (staff) => {
        this.staff.push(staff);
    };
    this.fire = (staff) => {
        
        // var staff = this.getStaff(id);
        
        if (staff) {
            staff.state = false;
            this.staff = syncStaffs()
        }
    };
    this.getStaff = (id) => {
        for (const staff of staffData) {
            if (staff.id == id) {
                return staff
            }
        }
        return null;
    }
    var staffData = staff || Staff[10];
    function syncStaffs() {
        var temp = []
        for (const staff of staffData) {
            if (staff.state) {
                temp.push(staff);
            }
        }
        return temp;
    }
    this.staff = syncStaffs();
}

function Staff(staffType) {
    this.staffType = staffType;
    this.state = true;
    this.work = () => {
        console.log('work');
    }
}
Staff.prototype.addId = (() => {
    var id = 1;
    return () => {
        return id++;
    }
})();
function Waiter(name, wages) {
    // this=new Staff(name,wages);

    this.id = this.addId();
    this.name = name;
    this.wages = wages;
    this.work = (params) => {
        if (Array.isArray(params)) {
            console.log('点菜');
        } else {
            console.log('上菜');
        }
    }
}
Waiter.prototype = new Staff('服务员');
function Cook(name, wages) {
    this.id = this.addId();
    this.name = name;
    this.wages = wages;
    this.work = () => {
        console.log('炒菜');
    }
}
Cook.prototype = new Staff('厨师');
function Customer() {
    this.order = () => {
        console.log('点菜');
    };
    this.eat = () => {
        console.log('吃');
    };
}
function Food(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}
function init() {
    var staff = [];
    for (let i = 1; i < 10; i++) {
        staff.push(new Waiter('name_' + i, i * 10));
    }
    for (let i = 1; i < 2; i++) {
        staff.push(new Cook('name_' + i, i * 10));
    }
    const restaurant = new Restaurant(10000, 10, staff);
    return restaurant;
}
var ifeRestaurant = init();
// var waiter=new Waiter('test',11);

// var ifeRestaurant = new Restaurant({
//     cash: 1000000,
//     seats: 20,
//     staff: []
// });

var newCook = new Cook("Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staff);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);
