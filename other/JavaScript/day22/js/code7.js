var arr = [43, 54, 4, -4, 84, 100, 58, 27, 140];
//将上面数组分别按从大到小以及从小到大进行排序后在console中输出
arr.sort((a,b)=>{
    return a-b<0;
})

console.log('从大到小',arr);
arr.sort((a,b)=>{
    return a-b>0;
})
console.log('从小到大',arr);


var arr2 = ['apple', 'dog', 'cat', 'car', 'zoo', 'orange', 'airplane'];
//将上面数组分别按字母顺序a-z及z-a进行排序，在console中输出
arr2.sort()
console.log('a-z',arr2);
arr2.sort((a,b)=>{
    return a<b;
})
console.log('z-a',arr2);



var arr3 = [[10, 14], [16, 60], [7, 44], [26, 35], [22, 63]];
//将上面的二维数组，按照每个元素中第二个数从大到小的顺序进行排序输出，输出结果应该为：
//[[22, 63], [16, 60], [7, 44], [26, 35], [10, 14]]
arr3.sort((a,b)=>{
    return a[1]<b[1];
})
console.log('二维数组排序',arr3);



var arr4 = [
    {
        id: 1,
        name: 'candy',
        value: 40
    }, {
        id: 2,
        name: 'Simon',
        value: 50
    }, {
        id: 3,
        name: 'Tony',
        value: 45
    }, {
        id: 4,
        name: 'Annie',
        value: 60
    }
];
//将上面数组分别按元素对象的value值从小到大进行排序后输出
arr4.sort((a,b)=>{
    return a.value>b.value;
})
console.log('按value从小到大排序',arr4);
