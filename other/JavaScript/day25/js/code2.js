
var zhWeeks=[
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日'
]
var enWeeks=[
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]
function getWeek(date,lang) {
    if (lang=='en') {
        return enWeeks[date.getDay()-1];
    }
    return zhWeeks[date.getDay()-1];
}
function complement(num,bit,filler) {
    if (String(num).length<bit) {
        if (!filler) {
            filler='0';
        }
        num=new Array(bit-String(num).length+1).join(filler)+num;
    }
    return num;
}
function format(date,lang) {
    var year,month,day,week,hour,minute,second;
    year=date.getFullYear();
    month=complement(date.getMonth(),2);
    day=complement(date.getDate(),2);
    week=getWeek(date,lang);
    hour=complement(date.getHours(),2);
    minute=complement(date.getMinutes(),2);
    second=complement(date.getSeconds(),2);
    
    if (lang=='en') {
        var h_12='am';
        if (hour>12) {
            h_12='pm';
            hour=complement(hour-12,2);
        }
        return `${year}-${month}-${day} ${week} ${hour}:${minute}:${second} ${h_12}`
    }
    return `${year}年${month}月${day}日${week} ${hour}:${minute}:${second}`
}
var clock=document.getElementById('clock');
clock.innerText=format(new Date());
setInterval(()=>{
    clock.innerText=format(new Date());
},1000);
var clock1=document.getElementById('clock1');
clock1.innerText=format(new Date(),'en');
setInterval(()=>{
    clock1.innerText=format(new Date(),'en');
},1000);
