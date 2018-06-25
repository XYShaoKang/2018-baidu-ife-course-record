


function init() {
    var staff = []
    for (let i = 1; i < 10; i++) {
        staff.push(new Waiter('name_' + i, i * 10))
    }
    for (let i = 1; i < 2; i++) {
        staff.push(new Cook('name_' + i, i * 10))
    }
    const restaurant = new Restaurant(10000, 1, staff)
    return restaurant
}
var ifeRestaurant = init()

var newCook =new Cook("Tony", 10000);
ifeRestaurant.hire(newCook);

// console.log(ifeRestaurant.staff);

// ifeRestaurant.fire(newCook);
// console.log(ifeRestaurant.staff);
// console.log(ifeRestaurant);


ifeRestaurant.doBusiness()

// var customer=new Customer()
// ifeRestaurant.comeInCustomer(customer)


// var substance=new Substance($('.seta'), 0, 0, 100, 100, '#000000', 1)
// substance.move(100,100,2000)