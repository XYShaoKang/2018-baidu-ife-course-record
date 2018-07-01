// 流程
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
    // 点菜单
    this.completeOrderDishList=[]
    // 状态 0:客人入座  1:未点菜  2:已点菜 3:正在烧菜 4:菜已全部做好 5:已吃完 6:结账 7:客人离开
    this.state=0
    // 送客
    this.restaurant=null
}