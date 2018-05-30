// 邮箱后缀候选数组
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
// 邮箱输入框
var emailInput = document.getElementById('email-input');
// 提示框
var emailSugWrapper = document.getElementById('email-sug-wrapper');
// 用来保存点击后的完整邮箱
var emailAddr = '';
// 用来保存当前选中项
var selectIndex = 0;


//输入框内容改变事件
emailInput.oninput = (e) => {
    showWrapper(e.target.value)
}

//输入框键盘事件
emailInput.onkeydown = (e) => {
    var count = emailSugWrapper.getElementsByTagName('li').length;
    if (count > 0) {

        if (e.keyCode == 38) {//向上
            event.preventDefault();
            var startIndex = selectIndex;
            selectIndex -= 1;
            if (selectIndex < 0) {
                selectIndex += count;
            }
            move(startIndex, selectIndex);
        } else if (e.keyCode == 40) {//向下
            event.preventDefault();
            var startIndex = selectIndex;
            selectIndex += 1;
            if (selectIndex > count - 1) {
                selectIndex -= count;
            }
            move(startIndex, selectIndex);
        } else if (e.keyCode == 13) {//回城
            selectLi(emailSugWrapper.getElementsByTagName('li')[selectIndex].innerHTML)
        } else if (e.keyCode == 27) {//esc
            emailInput.select();
        }

    }


}
//获取焦点
emailInput.onfocus = (e) => {
    var str = e.target.value;

    if (str.length > 0) {
        if (!(emailAddr == emailInput.value)) {
            showWrapper(str);
        }
    }
}
//失去焦点
emailInput.onblur = (e) => {
    hide();
}
//点击候选列表时，将点击的值输入到输入框
emailSugWrapper.onclick = (e) => {
    selectLi(e.target.innerHTML);
    setFocus()
}

//显示提示框
function showWrapper(str) {
    str = str.trim();
    emailSugWrapper.innerHTML = '';
    getCue(str, emailSugWrapper);
}
//添加提示
function getCue(str, wrapper) {
    var charIndex = str.indexOf('@');
    var inputEmailSuffix = '';

    if (charIndex >= 0) {
        inputEmailSuffix = str.slice(charIndex + 1, str.length);
        str = str.slice(0, charIndex);
    }
    if (str) {
        for (const emailSuffix of postfixList) {
            if (inputEmailSuffix) {
                if (emailSuffix.indexOf(inputEmailSuffix) == 0) {
                    createFullEmail(str, emailSuffix, wrapper);
                }
            } else {
                createFullEmail(str, emailSuffix, wrapper);
            }
        }
        // if (selectIndex>wrapper.getElementsByTagName('li').length-1) {
        //     selectIndex=0;
        // }
        //设置选中第一个
        selectIndex = 0;
        wrapper.getElementsByTagName('li')[selectIndex].classList.add('select');
        // 移除隐藏类名，让提示框显示
        emailSugWrapper.classList.remove('hide');
    }


}
//创建元素
function createFullEmail(str, emailSuffix, wrapper) {
    var element = document.createElement('li');
    element.innerHTML = getFullEmail(str, emailSuffix);
    wrapper.appendChild(element);
}
//获取完整邮箱
function getFullEmail(str, emailSuffix) {
    return htmlEncode(str) + '@' + emailSuffix;
}
//html编码
function htmlEncode(html) {
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement("div");
    //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
    (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
    //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
    var output = temp.innerHTML;
    temp = null;
    return output;
}
//html解码
function htmlDecode(text) {
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement("div");
    //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
    temp.innerHTML = text;
    //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}
//选中列表项之后把选中项填入input
function selectLi(text) {
    emailAddr = htmlDecode(text);
    emailInput.value = htmlDecode(text);
    hide();
}
//上下移动方法
function move(startIndex, endIndex) {
    emailSugWrapper.getElementsByTagName('li')[startIndex].classList.remove('select');

    emailSugWrapper.getElementsByTagName('li')[endIndex].classList.add('select');
}
//隐藏提示框
function hide() {
    setTimeout(() => {
        emailSugWrapper.classList.add('hide');
        // emailSugWrapper.innerHTML='';
    }, 100);
}
//设置input焦点
function setFocus() {
    emailInput.focus();
}
setFocus();