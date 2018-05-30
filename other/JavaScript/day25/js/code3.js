var
    dateSelect,
    yearSelect,
    monthSelect,
    daySelect,
    hourSelect,
    miniteSelect,
    secondSelect,
    resultWrapper;
dateSelect = document.getElementById('date-select');
yearSelect = document.getElementById('year-select');
monthSelect = document.getElementById('month-select');
daySelect = document.getElementById('day-select');
hourSelect = document.getElementById('hour-select');
miniteSelect = document.getElementById('minite-select');
secondSelect = document.getElementById('second-select');
resultWrapper = document.getElementById('result-wrapper');

// var initDate = new Date(2019, 1, 1);
var initDate = new Date();
initDate.setTime(Date.parse(Date()) + 5000);
var selectDate = initDate;
var zhWeeks = [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日'
]
init();
function init() {
    //初始化年份选择
    for (let index = 2000; index <= 2032; index++) {
        var option = document.createElement('option')
        option.value = index;
        option.innerText = index;
        if (index == initDate.getFullYear()) {
            option.selected = true;
        }
        yearSelect.appendChild(option);
    }
    //初始化月份选择
    for (let index = 1; index <= 12; index++) {
        var option = document.createElement('option')
        option.value = index;
        option.innerText = index;
        if (index == initDate.getMonth()) {
            option.selected = true;
        }
        monthSelect.appendChild(option);
    }
    initDay(initDate.getFullYear(), initDate.getMonth());
    //初始化小时选择
    for (let index = 1; index <= 24; index++) {
        var option = document.createElement('option')
        option.value = index;
        option.innerText = index;
        if (index == initDate.getHours()) {
            option.selected = true;
        }
        hourSelect.appendChild(option);
    }
    //初始化分钟、秒选择
    for (let index = 1; index <= 60; index++) {
        var option = document.createElement('option')
        option.value = index;
        option.innerText = index;
        if (index == initDate.getMinutes()) {
            option.selected = true;
        }
        miniteSelect.appendChild(option);
        var option1 = option.cloneNode(true);
        if (index == initDate.getSeconds()) {
            option1.selected = true;
        }
        secondSelect.appendChild(option1);
    }
    //绑定选择事件
    for (const element of dateSelect.getElementsByTagName('select')) {
        if (element.id == 'year-select' || element.id == 'month-select') {
            element.onchange = () => {
                daySelect.innerHTML = '';
                initDay(yearSelect.value, monthSelect.value);
                selectDate = getSelectDate();
                resultWrapper.innerText = countArrive(new Date(), selectDate);
            }
        } else {
            element.onchange = () => {
                selectDate = getSelectDate();

                resultWrapper.innerText = countArrive(new Date(), selectDate);
            }
        }
    }

    resultWrapper.innerText = countArrive(new Date(), selectDate);
    setInterval(() => {
        resultWrapper.innerText = countArrive(new Date(), selectDate);
    }, 1000)

}
//初始化天选择
function initDay(year, month) {

    for (let index = 1; index <= getMDay(year, month); index++) {
        var option = document.createElement('option')
        option.value = index;
        option.innerText = index;
        if (index == initDate.getDate()) {
            option.selected = true;
        }
        daySelect.appendChild(option);
    }
}
//获取每个月的天数
function getMDay(year, month) {
    var date = new Date(year, month, 0);
    return date.getDate();
}
//计算天数
function countArrive(startDate, endDate) {

    var time = Math.abs(parseInt(endDate / 1000) - parseInt(startDate / 1000));
    var s = time % 60;
    time = (time - s) / 60;
    var m = time % 60;
    time = (time - m) / 60;
    var h = time % 24;
    time = (time - h) / 24;
    var d = time;

    if (parseInt(startDate / 1000) > parseInt(endDate / 1000)) {
        return `现在距离 ${selectDate.getFullYear()}年${selectDate.getMonth()}月${selectDate.getDate()}日${zhWeeks[selectDate.getDay() - 1]} 已经过去 ${d}天${h}小时${m}分${s}秒`;
    } else if (parseInt(startDate / 1000) == parseInt(endDate / 1000)) {
        return `现在正在 ${selectDate.getFullYear()}年${selectDate.getMonth()}月${selectDate.getDate()}日${zhWeeks[selectDate.getDay() - 1]}`;
    }
    return `现在距离 ${selectDate.getFullYear()}年${selectDate.getMonth()}月${selectDate.getDate()}日${zhWeeks[selectDate.getDay() - 1]} 还有 ${d}天${h}小时${m}分${s}秒`;
}
//返回所选择的事件
function getSelectDate() {
    return new Date(
        yearSelect.value,
        monthSelect.value,
        daySelect.value,
        hourSelect.value,
        miniteSelect.value,
        secondSelect.value
    );
}
