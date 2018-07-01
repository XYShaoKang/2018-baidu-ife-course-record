function OrderApp(cookbok) {
    this.cookbook=cookbok
    var that = this
    this.orderDishes = function (seat) {

        var p = Promise.resolve(that.cookbook)
        p = p
            .then(cookbook => seat.customers[0].order(cookbook))// 把菜单给客人
            .then(orderDishList => {// 把点菜单送到厨房
                seat.orderDishList = orderDishList
                events.emit('toMenu', { orderDishList: seat.orderDishList, seat: seat });
            })
    }
}