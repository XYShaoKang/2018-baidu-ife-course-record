function Stack() {
    this.data = ["apple", "pear"];
    this.push = () => {
        this.data.push(textInput.value);
        this.show();
    };
    this.pop = () => {
        if (!this.isEmpty()) {
            this.data.pop();
        }
        this.show();
    };
    this.show = ()=> {
        showP.innerHTML=`栈内容：${this.data.join('-&gt;')}`
    }
    this.isEmpty=()=>{
        if (this.data.length==0) {
            console.log('栈为空');
            return true;
        } else {
            console.log('栈不为空');
            return false;
        }
        
    }
    this.printFront=()=>{
        if (!this.isEmpty()) {
            console.log(`栈顶元素内容：${this.data[this.data.length-1]}`);
        }
    }
    var showP=document.getElementById('stack-cont');
    var textInput=document.getElementById("stack-input");
}
var stack = new Stack();
document.getElementById('push-btn').onclick=stack.push;
document.getElementById('pop-btn').onclick=stack.pop;
document.getElementById('font-btn').onclick=stack.printFront;
document.getElementById('empty-btn').onclick=stack.isEmpty;

function Stack1() {
    this.data = ["apple", "pear"];
    this.push = () => {
        this.data.unshift(textInput.value);
        this.show();
    };
    this.pop = () => {
        if (!this.isEmpty()) {
            this.data.shift();
        }
        this.show();
    };
    this.show = ()=> {
        showP.innerHTML=`栈内容：${this.data.join('&lt;-')}`
    }
    this.isEmpty=()=>{
        if (this.data.length==0) {
            console.log('栈为空');
            return true;
        } else {
            console.log('栈不为空');
            return false;
        }
        
    }
    this.printFront=()=>{
        if (!this.isEmpty()) {
            console.log(`栈顶元素内容：${this.data[0]}`);
        }
    }
    var showP=document.getElementById('stack-cont1');
    var textInput=document.getElementById("stack-input1");
}

var stack1 = new Stack1();
document.getElementById('push-btn1').onclick=stack1.push;
document.getElementById('pop-btn1').onclick=stack1.pop;
document.getElementById('font-btn1').onclick=stack1.printFront;
document.getElementById('empty-btn1').onclick=stack1.isEmpty;