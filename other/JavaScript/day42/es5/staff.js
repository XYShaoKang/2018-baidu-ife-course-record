//职员类
function Staff(staffType, name, wages) {
    this.id = this.addId()
    //职员类型  1:服务员  2:厨师
    this.staffType = staffType
    //职员状态  -1:离职  0:在职  1:上班  2:下班
    this.state = 0
    this.name = name
    this.wages = wages
}
Staff.prototype.addId = (function addId() {
    var id = 1
    return () => {
        return id++
    }
}())
Staff.prototype.work = function () {
    console.log('work')
}


function Waiter(name, wages) {
    // 单例
    if (Waiter.prototype._waiter) {
        return Waiter.prototype._waiter
    }

    this.entity = $('<div>')
    this.entity.addClass('waiter')
    this.entity.attr('id', 'waiter_' + this.id)
    this.entity.text('服务员')
    this.entity.css({
        left: 260,
        top: 280,
        width: 50,
        height: 20,
    })
    this.prompt = new Prompt()
    this.prompt.text('空闲')
    this.entity.append(this.prompt.entity)
    Staff.call(this, 1, name, wages)
    // 菜单
    this.cookbook = []
    // 收钱
    this.income = null
    Waiter.prototype._waiter = this
}
inherit(Waiter, Staff)
// 工作
Waiter.prototype.work = function (process) {
    var that = this
    if (process instanceof Process) {
        if (process.state === 1) {
            process.waiter = this
            console.log(`服务员前往 ${process.seat.id}号桌 点菜`);
            this.prompt.text('等待客人点菜')
            this.deliveryMenu(process)
        } else if (process.state === 2) {

            console.log(`客人点了 【${process.orderDishList.map(v => v.name).join('、')}】 ，把点菜单送往厨房`)
            this.prompt.text('把点菜单送往厨房')
            this.move(140, 275, 500)
            this.prompt.text(`客人点了 【${process.orderDishList.map(v => v.name).join('、')}】`, 500)

            setTimeout(() => {
                that.prompt.text('空闲')
                process.cook.work(process)
            }, 500);
        } else if (process.state === 3) {
            console.log('服务员上菜')
            // this.prompt.show(`来了`,500)
            this.prompt.text('上菜中')
            this.move(260, 280, 500)
            var dish = process.completeOrderDishList[process.completeOrderDishList.length - 1]
            this.prompt.text(`${dish.name} 已上菜`, 500)
            process.customers[0].eat(process)
            if (process.completeOrderDishList.length < process.orderDishList.length) {
                setTimeout(() => {
                    that.prompt.text('前往厨房')
                    this.move(140, 275, 500)
                    that.prompt.text('空闲', 500)
                    
                }, 1000);
            }else{
                that.prompt.text('菜已全部上齐',1000)
                that.prompt.text('空闲',2000)
            }
            
        }
    }
}
// 递菜单
Waiter.prototype.deliveryMenu = function (process) {
    var that = this
    console.log('服务员递菜单给客人')
    process.customers[0].order(this.cookbook, function (orderDishList) {
        process.state = 2
        process.orderDishList = orderDishList
        that.work(process)
    })

}
//巡视，查看是否有客人就座并未点菜。
Waiter.prototype._patrol = function () {
}
// 开始上班
Waiter.prototype.goToWork = function () {
    this.state = 1
    // timer=setInterval(()=>{
    //     this._patrol()
    // },1000)
}
// 下班
Waiter.prototype.goOffWork = function () {
    clearInterval(timer)
    this.state = 2
}
// 结账
Waiter.prototype.checkOut = function (process) {
    process.state = 6
    var money = process.orderDishList.reduce((total, currentValue) => { return total + currentValue.price }, 0)
    this.income(money)
    console.log(`总共消费 【${money}元】已结账`)
    process.restaurant.leaveCustomer(process)
}
// 移动
Waiter.prototype.move = function (x, y, time) {
    this.entity.animate({ left: x, top: y }, time)
}


//厨师类
function Cook(name, wages) {
    // 单例
    if (Cook.prototype._cook) {
        return Cook.prototype._cook
    }

    this.entity = $('<div>')
    this.entity.addClass('cook')
    this.entity.attr('id', 'cook_' + this.id)
    this.entity.text('厨师')
    this.entity.css({
        left: 30,
        top: 275,
        width: 50,
        height: 20,
    })
    this.prompt = new Prompt()
    this.prompt.text('空闲')
    this.entity.append(this.prompt.entity)
    // 待做的菜列表
    this.notDoneDishList=$('<div>')
    this.notDoneDishList.addClass('ndd')
    this.entity.append(this.notDoneDishList)

    Staff.call(this, 2, name, wages)
    Cook.prototype._cook = this
}
inherit(Cook, Staff)
// 工作
Cook.prototype.work = function (process) {
    var that = this;
    // console.log(`厨师正在烧 【${process.orderDishList[0].name}】`)
    // setTimeout(() => {
    //     process.state = 3
    //     console.log(`【${process.orderDishList[0].name}】 已做好，通知服务员上菜`)
    //     process.state = 4
    //     process.waiter.work(process)
    // }, random(3, 5) * 1000);
    that.setNotDoneDishList(process.orderDishList)
    var p = new Promise(function (resolve, reject) {
        that.prompt.show(`已收到点菜单`)
        setTimeout(() => {
            resolve(process)
        }, 1000);

    })
    for (const dish of process.orderDishList) {
        p = p.then(function (process) {
            return new Promise((resolve, reject) => {
                console.log(`厨师正在烧 【${dish.name}】`)
                var time=dish.cookingTime*1000
                var timer = setInterval(function () {
                    that.prompt.text(`正在烧 【${dish.name}】 ,还差${(time / 1000).toFixed(1)}s烧完`)
                    time=time-100
                    if (time<0) {
                        clearInterval(timer)
                        
                        that.prompt.text(`【${dish.name}】 做好了`)
                    }
                }, 100)
                
                setTimeout(() => {
                    process.state = 3
                    console.log(`【${dish.name}】 已做好，通知服务员上菜`)
                    process.completeOrderDishList.push(dish)
                    that.setNotDoneDishList(process.orderDishList.filter(item=> !process.completeOrderDishList.includes(item)))
                    // that.prompt.text(`【${dish.name}】 做好了`)
                    
                    process.waiter.work(process)
                    resolve(process)
                }, dish.cookingTime * 1000+1000);
            })
        })
    }
    p.then(function (process) {
        return new Promise((resolve, reject) => {
            that.prompt.text(`已全部烧好`)
            that.prompt.text(`空闲`,500)
            process.state = 4
            process.waiter.work(process)
        })
    })
}
Cook.prototype.setNotDoneDishList = function (dishs) {
    this.notDoneDishList.empty()
    this.notDoneDishList.show()
    $('<h2>').text('待做的菜').appendTo(this.notDoneDishList)
    var ul=$('<ul>')
    ul.appendTo(this.notDoneDishList)
    for (const dish of dishs) {
        $('<li>').text(dish.name).appendTo(ul)
    }
}

// Cook.prototype.cooking = function (dish) {
//     return new Promise(dish=>{
//         console.log(`厨师正在烧 【${dish.name}】`)
//         setTimeout(() => {
//             process.state = 3
//             console.log(`【${dish.name}】 已做好，通知服务员上菜`)
//             process.state = 4
//             process.waiter.work(process)
//         }, dish.cookingTime*1000);
//     })
// }

