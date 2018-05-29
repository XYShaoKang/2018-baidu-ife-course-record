var btDiv = document.getElementById('bt');
var contentDiv = document.getElementById('content');
var radioA, inputANum, radioB, inputBNum;
radioA = document.getElementById('radio-a');
radioB = document.getElementById('radio-b');
inputANum = document.getElementById('num-a');
inputBNum = document.getElementById('num-b');

//判断当前选中的输入框输入内容是否为数字
btDiv.children[0].onclick = function () {
    var text = checkText();
    if (text === false) {
        resultShow('请选择判断的内容');
    } else {
        if (text == '') {
            resultShow('请输入要判断的内容');
        } else {
            resultShow(isNum(text) ? '内容是数值' : '内容不是数值');
        }
    }
}
//把 A 四舍五入为 B 个小数位数的数字
btDiv.children[1].onclick = function () {
    var numA = inputANum.value;
    var numB = inputBNum.value;
    if (isNum(numA) && isNum(numB)) {
        if (numB.indexOf('.') == -1) {
            resultShow((numA * 1).toFixed(numB));
        } else {
            resultShow('第二个必须为整数')
        }
    } else {
        resultShow(!isNum(numA) ? '第一个必须为数字' : '第二个必须为数字');
    }
}
//当前选中数字的绝对值
btDiv.children[2].onclick = function () {
    var text = checkText();
    if (text === false) {
        resultShow('请选择判断的内容');
    } else {
        resultShow(isNum(text) ? Math.abs(text * 1) : '请输入数字');
    }
}
//对当前选中的数字进行上舍入
btDiv.children[3].onclick = function () {
    var text = checkText();
    if (text === false) {
        resultShow('请选择判断的内容');
    } else {
        resultShow(isNum(text) ? Math.ceil(text * 1) : '请输入数字');
    }
}
//对当前选中的数字进行下舍入
btDiv.children[4].onclick = function () {
    var text = checkText();
    if (text === false) {
        resultShow('请选择判断的内容');
    } else {
        resultShow(isNum(text) ? Math.floor(text * 1) : '请输入数字');
    }
}
//把当前选中的数字四舍五入为最接近的整数
btDiv.children[5].onclick = function () {
    var text = checkText();
    if (text === false) {
        resultShow('请选择判断的内容');
    } else {
        resultShow(isNum(text) ? Math.round(text * 1) : '请输入数字');
    }
}
//返回 A 和 B 中的最高值
btDiv.children[6].onclick = function () {
    var numA = inputANum.value;
    var numB = inputBNum.value;
    if (isNum(numA) && isNum(numB)) {
        resultShow(numA * 1 > numB * 1 ? numA : numB);
    } else {
        resultShow(!isNum(numA) ? '第一个必须为数字' : '第二个必须为数字');
    }
}
//返回 A 和 B 中的最低值
btDiv.children[7].onclick = function () {
    var numA = inputANum.value;
    var numB = inputBNum.value;
    if (isNum(numA) && isNum(numB)) {
        resultShow(numA * 1 < numB * 1 ? numA : numB);
    } else {
        resultShow(!isNum(numA) ? '第一个必须为数字' : '第二个必须为数字');
    }
}

//判断字符串是否为数字
function isNum(str) {
    if (str) {
        if (!isNaN(Number(str))) {
            return true;
        }
    }
    return false;
}
function resultShow(str) {
    var resultElement = document.getElementById('result');
    resultElement.innerText = str;
}
function checkText() {
    if (radioA.checked) {
        return inputANum.value;
    } else if (radioB.checked) {
        return inputBNum.value;
    }
    return false;
}