var btDiv = document.getElementById('bt');
var radioA = document.getElementById('radio-a');
var radioB = document.getElementById('radio-b');
var textareaA = document.getElementById('str-a');
var textareaB = document.getElementById('str-b');
var inputANum = document.getElementById('num-a');
var inputBNum = document.getElementById('num-b');

//获取当前选中输入的内容长度
btDiv.children[0].onclick = () => {
    var text = checkText();
    console.log(text);

    resultShow(text.length)
}
//当前选中输入中的第3个字符
btDiv.children[1].onclick = () => {
    var text = checkText();
    if (text.length >= 3) {
        resultShow(text[2]);
    } else {
        resultShow('输入的字数小于3')
    }
}
//把两个输入框的文字连接在一起输出（concat）
btDiv.children[2].onclick = () => {
    resultShow(textareaA.value + textareaB.value);
}
//输入B中的内容，在输入A的内容中第一次出现的位置（indexOf）
btDiv.children[3].onclick = () => {
    var pos = textareaA.value.indexOf(textareaB.value);
    if (pos != -1) {
        resultShow(pos);
    } else {
        resultShow('在A中未找到B');
    }
}
//输入A中的内容，在输入B的内容中最后一次出现的位置（lastIndexOf）
btDiv.children[4].onclick = () => {
    var pos = textareaB.value.lastIndexOf(textareaA.value);
    if (pos != -1) {
        resultShow(pos);
    } else {
        resultShow('在B中未找到A');
    }
}
//使用slice获取选中输入框内容的部分内容，参数为num-a及num-b
btDiv.children[5].onclick = () => {
    var text = checkText();
    var numA = inputANum.value * 1;
    var numB = inputBNum.value * 1;
    if (numA < numB) {
        resultShow(text.slice(numA, numB));
    } else {
        resultShow('数字B必须大于数字A');
    }
}
//当前选中输入框的行数
btDiv.children[6].onclick = () => {
    var checkTextarea;
    if (radioA.checked) {
        checkTextarea = textareaA;
    } else if (radioB.checked) {
        checkTextarea = textareaB;
    }
    resultShow(checkTextarea.rows);
}
//使用substr获取选中输入框内容的子字符串，参数为num-a及num-b
btDiv.children[7].onclick = () => {
    var text = checkText();
    var numA = inputANum.value * 1;
    var numB = inputBNum.value * 1;
    if (numB > 0) {
        resultShow(text.substr(numA, numB));
    } else {
        resultShow('数字B要大于0');
    }

}
//把所选输入框中的内容全部转为大写
btDiv.children[8].onclick = () => {
    var text = checkText();
    resultShow(text.toUpperCase());
}
//把所选输入框中的内容全部转为小写
btDiv.children[9].onclick = () => {
    var text = checkText();
    resultShow(text.toLowerCase());
}
//把所选输入框中内容的半角空格全部去除
btDiv.children[10].onclick = () => {
    var text = checkText();
    resultShow(text.replace(/ /g, ''));
}
//把所选输入框中内容的a全部替换成另外一个输入框中的内容
btDiv.children[11].onclick = () => {
    var checkT, otherT;
    if (radioA.checked) {
        checkT = textareaA;
        otherT = textareaB;
    } else if (radioB.checked) {
        checkT = textareaB;
        otherT = textareaA;
    }
    resultShow(checkT.value.replace(/a/g, otherT.value));
}

function resultShow(str) {
    var resultElement = document.getElementById('result');
    resultElement.innerText = str;
}
function checkText() {
    if (radioA.checked) {
        return textareaA.value;
    } else if (radioB.checked) {
        return textareaB.value;
    }
    return false;
}
function isNum(str) {
    if (str) {
        if (!isNaN(Number(str))) {
            return true;
        }
    }
    return false;
}