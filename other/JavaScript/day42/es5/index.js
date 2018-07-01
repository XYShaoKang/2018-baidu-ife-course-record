


function init() {
    var staff = []
    staff.push(new Waiter('服务员', 20))
    // for (let i = 1; i < 2; i++) {
        
    // }
    staff.push(new Cook('厨师',  10))
    const restaurant = new Restaurant(10000, 4, staff)
    return restaurant
}
var ifeRestaurant = init()

// var newCook =new Cook("Tony", 10000);
// ifeRestaurant.hire(newCook);
ifeRestaurant.doBusiness()

// console.log(ifeRestaurant.staff);

// ifeRestaurant.fire(newCook);
// console.log(ifeRestaurant.staff);
// console.log(ifeRestaurant);




// var customer=new Customer()
// ifeRestaurant.comeInCustomer(customer)


// var substance=new Substance($('.seta'), 0, 0, 100, 100, '#000000', 1)
// substance.move(100,100,2000)