//餐厅
function Restaurant(cash, seats, staffs) {
    this.width = 800
    this.height = 600
    // 资金
    this.cash = cash || 1000000
    this.cashShow = $('<div>')

    // 所有员工数据
    this._staffData = []
    // 座位
    this.seats = []
    // 在职职员
    this.staff = this._getStaffs()
    // 菜单
    this._cookbook = []
    // 上班的人
    this._works = {
        waiter: [],
        cook: [],
    }
    //餐厅状态  0:打烊 1:营业 2:有位置 3:客满
    this._state = 0
    // 等待客人列表
    this.customerList = []
    this.customerDiv = $('<div>')
    this.customerDiv.attr('id', 'customer-list')
    this.customerDiv.addClass('customer-list')
    this.customerDiv.append($('<h3>').text('等待的客人'))
    this.customerDiv.append($('<ul>'))
    // 后台任务列表
    this.timers = []
    // 流程列表
    this.tasks = []

    this.entity = $('#restaurant')
    this.entity.append(this.customerDiv)

    var that = this
    var addWaite = $('<button>').text('添加服务员')
    addWaite.on('click', function () {
        var waiter = new Waiter('服务员', 20)
        that.hire(waiter)
        waiter.goToWork(that)
        // that.entity.append(waiter.entity)
    })
    this.entity.append(addWaite)
    var addCook = $('<button>').text('添加厨师')
    addCook.on('click', function () {
        var cook = new Cook('厨师', 20)
        that.hire(cook)
        cook.goToWork(that)
    })
    this.entity.append(addCook)

    this.orderApp=new OrderApp(this._cookbook)

    this._init(seats, staffs)

}
// 根据id获取职员
Restaurant.prototype.getStaff = function (id) {
    for (const staff of this._staffData) {
        if (staff.id == id) {
            return staff
        }
    }
    return null
}
// 雇佣
Restaurant.prototype.hire = function (staff) {
    if (!this.getStaff(staff.id)) {
        this._staffData.push(staff)
        this.staff = this._getStaffs()
    }
}
// 解雇
Restaurant.prototype.fire = function (staff) {
    if (this.staff.indexOf(staff) != -1) {
        staff.state = -1
        this.staff = this._getStaffs()
    }
}
// 返回在职员工
Restaurant.prototype._getStaffs = function () {
    var temp = []
    for (const staff of this._staffData) {
        if (staff.state != -1) {
            temp.push(staff)
        }
    }
    return temp
}
// 开始营业
Restaurant.prototype.doBusiness = function () {
    var that = this
    if (this._state === 0) {
        this._state = 1
        // 职工上班
        for (const staff of this.staff) {
            if (staff.staffType == 1) {
                staff.goToWork(this)
                // staff.cookbook = this._cookbook
                // staff.income = function (money, seat) {
                //     that.cash += money
                //     that.cashShow.text(`现金：${that.cash}`)
                //     that.leaveCustomer(seat)
                // }
                // staff.getOrderDishListBySeatId = function (seatId) {
                //     return that.seats.find(s => s.id === seatId).orderDishList
                // }
                // this._works.waiter.push(staff)
            } else if (staff.staffType == 2) {
                staff.goToWork(this)
            }

        }
        // 随机添加顾客
        var timer = setInterval(function () {
            if (that.customerList.length < 10) {
                var customer = new Customer(customerNames[random(0, 100)])
                that.customerList.push(customer)
                that.customerDiv.children('ul').prepend($('<li>').text(customer.name))
            }
        }, random(1, 2) * 1000)
        this.timers.push(timer)
        this._state = 2
        this.comeCustomer()

        // 注册上菜任务
        events.on('foodComplete', function (task) {
            task.executor = 'waiter'
            that.tasks.push(task)
        })
        // 注册结账任务
        events.on('checkOut', function (task) {
            task.executor = 'waiter'
            that.tasks.push(task)
        })
        // 注册厨师点菜单任务
        events.on('toMenu', function (task) {
            task.executor = 'cook'
            that.tasks.push(task)
        })
        that._loopTask()
        // setTimeout(() => {
        //     that.doProofing()
        // }, 50000);
    }
}

// 打烊
Restaurant.prototype.doProofing = function () {
    if (this._state) {
        for (const timer of this.timers) {
            clearInterval(timer)
        }
        this.customerList = []
        this.customerDiv.children('ul').empty()
        this._state = 0
        console.log('已打烊')
    }
}

// 来客人
Restaurant.prototype.comeCustomer = function () {
    var that = this
    var timer = setInterval(function () {
        if (that._state === 2 && that.customerList.length > 0) {
            // 判断是否剩余座位，如果只有一个空座，将餐厅状态改为满座
            if (that.seats.filter(s => s.state === 0).length === 1) {
                that._state = 3
            }

            var customer = that.customerList.shift()
            that.customerDiv.find('ul>li:last').remove()

            // 客人坐下
            var seat = that.seats.find(s => s.state === 0)

            seat.sitDown([customer])
            that.entity.append(customer.entity)
            // process.state = 1
            console.log(`【${customer.name}】 客人来了，在 ${seat.id}号桌 就坐，通知服务员来点菜`);

            // 添加点菜任务
            // that.tasks.push({ seat: seat, action: 'orderDishes', executor: 'waiter' })
            that.orderApp.orderDishes(seat)
            // console.log(that.tasks)
        }
    }, 10)
    this.timers.push(timer)
}
Restaurant.prototype._loopTask = function () {
    var that = this
    setInterval(function () {
        if (that.tasks.length > 0) {

            var executors = Array.from(new Set(that.tasks.map(t => t.executor)))
            for (const executor of executors) {
                var taskIndex = that.tasks.findIndex(t => t.executor === executor)
                var staff
                if (executor === 'waiter') {
                    staff = that._works[executor].find(w => w.workState === 0)
                } else if (executor === 'cook') {
                    staff = that._works[executor]
                        .reduce((p, l) =>
                            p.foods.filter(f => !f.state).length > l.foods.filter(f => !f.state).length ? l : p
                        )
                }
                if (taskIndex != -1 && staff) {
                    // console.log(executor, task, staff)
                    events.emit(executor + 'Task_' + staff.id, that.tasks.splice(taskIndex, 1)[0])
                }
            }
        }

        // var waiterTaskIndex = that.tasks.findIndex(t => t.action)




        // if (that.workState === 0 && that.works.length > 0) {
        //     that.workState = 1
        //     that.work(that.works.splice(0, 1)[0])
        // }
    }, 10)
}
// 送客
Restaurant.prototype.leaveCustomer = function (seat) {

    seat.customers[0].leave()
    seat.standUp()
    console.log("送客人离开")
    console.log("-------------")
    if (this._state === 0) {
        console.log('结束营业')
    } else {
        // this.process.splice(this.process.findIndex(p=>p===process),1)
        this._state = 2
    }

}

// 初始化
Restaurant.prototype._init = function (seats, staffs) {
    // 初始化菜单
    for (let i = 0; i < foods.length; i++) {
        var cost = i * random(100, 200)
        this._cookbook.push(new Food(foods[i], cost, cost + i, random(2, 5)))
    }
    // 添加员工
    for (const s of staffs) {
        this.hire(s)
    }

    // 初始化座位 
    // 营业区域为 x:250 y:150 x1:550 y1:450 座位 宽:50 高:50
    // 座位在营业区域内平均分布 count 为每行最多放几个座位
    var rowCount = Math.ceil(Math.sqrt(seats))
    var columnCount = Math.ceil(seats / rowCount)
    var widthSpace = 300 / rowCount
    var heightSpace = 300 / columnCount
    for (let i = 0; i < seats; i++) {
        var seat = new Seat()
        seat.move((i % rowCount) * widthSpace + 250 + (widthSpace - 50) / 2, Math.floor(i / rowCount) * heightSpace + 150 + (heightSpace - 50) / 2)
        // console.log(seat,(i%rowCount)*(50+widthSpace)+150,Math.floor(i/columnCount)*(50+heightSpace)+250)
        this.seats.push(seat)
        $('#restaurant').append(seat.entity)
    }

    this.cashShow.attr('id', 'cashShow')
    this.cashShow.text(`现金：${this.cash}`)
    $('#restaurant').append(this.cashShow)
}