function Process() {
    // 顾客
    this.customers=[]
    // 座位
    this.seat=null
    // 服务员
    this.waiter=null
    // 厨师
    this.cook=null
    // 点菜单
    this.orderDishList=[]
    // 状态 0:客人入座  1:未点菜  2:已点菜 3:正在烧菜 4:菜已做好 5:已上菜 6:客人用餐 7:结账 8:客人离开
    this.state=0
    // 送客
    this.restaurant=null
}