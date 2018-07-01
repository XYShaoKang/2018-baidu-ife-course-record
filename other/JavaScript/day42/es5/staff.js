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

