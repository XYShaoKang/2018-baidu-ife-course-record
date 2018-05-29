function diyTrim(str) {
    var result = "";
    var start=0;
    var end=str.length;
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        start=index;
        if (element!=' '&&element!='　') {
            break;
        }
    }
    for (let index = str.length-1; index >=0; index--) {
        const element = str[index];
        if (element!=' '&&element!='　') {
            break;
        }
        end=index;
    }
    result=str.slice(start,end);
    // do something

    return result
}

// 测试用例
console.log(diyTrim(' a f b    ')); // ->a f b
console.log(diyTrim('    ffdaf    ')); // ->ffdaf
console.log(diyTrim('1    ')); // ->1
console.log(diyTrim('　　f')); // ->f
console.log(diyTrim('  　  a f b 　　 ')); // ->a f b
console.log(diyTrim(' ')); // ->
console.log(diyTrim('　')); // ->
console.log(diyTrim('')); // ->

/*
去掉字符串str中，连续重复的地方
*/
function removeRepetition(str) {
    var result = "";
    for (let index = 0,tempStr=''; index < str.length; index++) {
        const element = str[index];
        if (tempStr!=element) {
            result+=element;
            tempStr=element;
        }
    }

    // do something

    return result;
}

// 测试用例
console.log(removeRepetition("aaa")); // ->a
console.log(removeRepetition("abbba")); // ->aba
console.log(removeRepetition("aabbaabb")); // ->abab
console.log(removeRepetition("")); // ->
console.log(removeRepetition("abc")); // ->abc