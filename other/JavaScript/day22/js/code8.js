var scoreObject = {
    "Tony": {
        "Math": 95,
        "English": 79,
        "Music": 68
    }, 
    "Simon": {
        "Math": 100,
        "English": 95,
        "Music": 98
    }, 
    "Annie": {
        "Math": 54,
        "English": 65,
        "Music": 88
    }
}
function objToArray(obj) {
    var arr=[];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            var tempArr=[];
            tempArr.push(key);
            for (const key1 in element) {
                if (element.hasOwnProperty(key1)) {
                    const element1 = element[key1];
                    tempArr.push(element1);
                }
            }
            arr.push(tempArr);
        }
    }
    return arr;
}
console.log('对象转数组',objToArray(scoreObject));


var menuArr = [
    [1, "Area1", -1],
    [2, "Area2", -1],
    [3, "Area1-1", 1],
    [4, "Area1-2", 1],
    [5, "Area2-1", 2],
    [6, "Area2-2", 2],
    [7, "Area1-2-3", 4],
    [8, "Area2-2-1", 6],
];
function arrToObj(arr,root) {
    var obj={};
    for (const iterator of arr) {
        if (iterator[2]==root) {
            obj[iterator[0]]={};
            obj[iterator[0]].name=iterator[1];
            var tempObj=arrToObj(arr,iterator[0]);
            if (Object.keys(tempObj).length>0) {
                obj[iterator[0]].subMenu=tempObj;
            }
        }
    }
    return obj;
}
console.log('数组转对象',arrToObj(menuArr,-1));
