// dataPro.datas=sourceData;
// events.on('upDim',function (data) {  
//     console.log('upDim',data);
// })
events.on('upDatas',function (data) {  
    console.log('upDatas',data);
})
// events.on('optionOnChange',function (data) {  
//     console.log('optionOnChange',data);
// })
dataPro.setData(sourceData,['product','region']);
// var datas = dataPro.getClass(['product','region']);

// from.setData(dataPro.dim);
// from.bind(dataPro.getDataByPos)



// table.setData(tableHear, dataPro.getDataByPos([0,1]));