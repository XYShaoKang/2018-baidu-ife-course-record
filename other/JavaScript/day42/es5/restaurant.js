//餐厅
function Restaurant(cash, seats, staffs) {
    this.width = 500
    this.height = 500
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
    this.entity = $('#restaurant')
    this.entity.append(this.customerDiv)

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
        for (const staff of this.staff) {
            if (staff.staffType == 1) {
                staff.goToWork()
                staff.cookbook = this._cookbook
                staff.income = function (money) {
                    that.cash += money
                    that.cashShow.text(`现金：${that.cash}`)
                }
                this._works.waiter.push(staff)
            } else if (staff.staffType == 2) {
                this._works.cook.push(staff)
            }
            this.entity.append(staff.entity)
        }
        var timer = setInterval(function () {
            if (that.customerList.length < 10) {
                var customer = new Customer(customerNames[random(0, 100)])
                that.customerList.push(customer)
                that.customerDiv.children('ul').prepend($('<li>').text(customer.name))
            }
        }, random(3, 10) * 1000)
        this.timers.push(timer)
        this._state = 2
        this.comeCustomer()
        setTimeout(() => {
            that.doProofing()
        }, 50000);
    }
}

// 打烊
Restaurant.prototype.doProofing = function () {
    if (this._state) {
        for (const timer of this.timers) {
            clearInterval(timer)
        }
        this.customerList=[]
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
            that._state = 3
            var customer = that.customerList.shift()
            that.customerDiv.find('ul>li:last').remove()
            var process = new Process(customer)
            process.customers.push(customer)
            process.cook = that._works.cook[0]
            process.restaurant = that
            // 客人坐下
            that.seats[0].sitDown(process)
            that.entity.append(customer.entity)
            process.state = 1
            console.log(`【${process.customers[0].name}】 客人来了，在 ${process.seat.id}号桌 就坐，通知服务员来点菜`);
            // 通知服务员来点菜
            that._works.waiter[0].work(process)
        }

    })
    this.timers.push(timer)

}

// 送客
Restaurant.prototype.leaveCustomer = function (process) {
    process.state = 7
    process.customers[0].leave()
    console.log("送客人离开")
    console.log("-------------")
    if (this._state===0) {
        console.log('结束营业')
    }else{
        this._state = 2
    }
    
}

// 初始化
Restaurant.prototype._init = function (seats, staffs) {
    // 初始化菜单
    for (let i = 0; i < foods.length; i++) {
        var cost = i * random(100, 200)
        this._cookbook.push(new Food(foods[i], cost, cost + i, random(3, 10)))
    }
    // 添加员工
    for (const s of staffs) {
        this.hire(s)
    }
    // 初始化座位
    for (let i = 0; i < seats; i++) {
        this.seats.push(new Seat())
    }
    $('#restaurant').append(this.seats[0].entity)
    this.cashShow.attr('id', 'cashShow')
    this.cashShow.text(`现金：${this.cash}`)
    $('#restaurant').append(this.cashShow)
    // this.seats[0].move(100,100)
}