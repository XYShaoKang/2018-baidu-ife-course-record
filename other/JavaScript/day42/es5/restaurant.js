//餐厅
function Restaurant(cash, seats, staffs) {
    // 资金
    this.cash = cash || 1000000
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
    //餐厅状态  true:营业  false:打烊
    this._state = false
    this._init(seats, staffs)

}
//根据id获取职员
Restaurant.prototype.getStaff = function (id) {
    for (const staff of this._staffData) {
        if (staff.id == id) {
            return staff
        }
    }
    return null
}
//雇佣
Restaurant.prototype.hire = function (staff) {
    if (!this.getStaff(staff.id)) {
        this._staffData.push(staff)
        this.staff = this._getStaffs()
    }
}
//解雇
Restaurant.prototype.fire = function (staff) {
    if (this.staff.indexOf(staff) != -1) {
        staff.state = -1
        this.staff = this._getStaffs()
    }
}
//返回在职员工
Restaurant.prototype._getStaffs = function () {
    var temp = []
    for (const staff of this._staffData) {
        if (staff.state != -1) {
            temp.push(staff)
        }
    }
    return temp
}
//开始营业
Restaurant.prototype.doBusiness = function () {
    if (!this._state) {
        this._state = true
        for (const staff of this.staff) {
            if (staff.staffType == 1) {
                staff.goToWork()
                staff.cookbook = this._cookbook
                this._works.waiter.push(staff)
            } else if (staff.staffType == 2) {
                this._works.cook.push(staff)
            }
        }
        this.comeCustomer()
    }
}

//打烊
Restaurant.prototype.doProofing = function () {
    if (this._state) {
        this._state = false
    }
}

// 来客人
Restaurant.prototype.comeCustomer = function () {
    setTimeout(() => {
        var customer = new Customer(customerNames[random(0, 100)])
        var process = new Process(customer)
        process.customers.push(customer)
        process.cook = this._works.cook[0]
        process.restaurant = this
        // 客人坐下
        this.seats[0].sitDown(process)
        process.state = 1
        console.log(`【${process.customers[0].name}】 客人来了，在 ${process.seat.id}号桌 就坐，通知服务员来点菜`);
        // 通知服务员来点菜
        this._works.waiter[0].work(process)
    }, random(3, 5) * 1000);

}

Restaurant.prototype.leaveCustomer = function (process) {
    process.state = 8
    console.log("送客人离开")
    console.log("-------------")
    this.comeCustomer()
}

//初始化
Restaurant.prototype._init = function (seats, staffs) {
    // 初始化菜单
    for (let i = 0; i < foods.length; i++) {
        var cost = i * random(100, 200)
        this._cookbook.push(new Food(foods[i], cost, cost + i))
    }
    // 添加员工
    for (const s of staffs) {
        this.hire(s)
    }
    // 初始化座位
    for (let i = 0; i < seats; i++) {
        this.seats.push(new Seat())
    }
}