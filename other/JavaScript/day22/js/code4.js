var tree = {
    "id": 0,
    "name": "root",
    "left": {
        "id": 1,
        "name": "Simon",
        "left": {
            "id": 3,
            "name": "Carl",
            "left": {
                "id": 7,
                "name": "Lee",
                "left": {
                    "id": 11,
                    "name": "Fate"
                }
            },
            "right": {
                "id": 8,
                "name": "Annie",
                "left": {
                    "id": 12,
                    "name": "Saber"
                }
            }
        },
        "right": {
            "id": 4,
            "name": "Tony",
            "left": {
                "id": 9,
                "name": "Candy"
            }
        }
    },
    "right": {
        "id": 2,
        "name": "right",
        "left": {
            "id": 5,
            "name": "Carl",
        },
        "right": {
            "id": 6,
            "name": "Carl",
            "right": {
                "id": 10,
                "name": "Kai"
            }
        }
    }
}

// 假设id和name均不会重复，根据输入name找到对应的id
function findIdByName(name, obj) {
    if (obj.name == name) {
        return obj.id;
    } else {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const element = obj[key];
                if (typeof (element) == 'object') {
                    let id = findIdByName(name, element);
                    if (id) {
                        return id;
                    }
                }
            }
        }
    }
}
console.log('--findIdByName--');
console.log(findIdByName('Lee', tree));
// 假设id和name均不会重复，根据输入id找到对应的name
function findNameById(id,obj) {
    if (obj.id == id) {
        return obj.name;
    } else {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const element = obj[key];
                if (typeof (element) == 'object') {
                    let name = findNameById(id, element);
                    if (name) {
                        return name;
                    }
                }
            }
        }
    }
}
console.log('--findNameById--');
console.log(findNameById(3, tree));
// 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
function getListWithDLR(obj) {
    // if (obj.name) {
    //     console.log(obj.name);
    // }
    // for (const key in obj) {
    //     if (obj.hasOwnProperty(key)) {
    //         const element = obj[key];
    //         if (typeof (element) == 'object') {
    //             getListWithDLR( element);
    //             // if (name) {
    //             //     return name;
    //             // }
    //         }
    //     }
    // }
    if (obj.name) {
        console.log(obj.name);
    }
    if (obj.left) {
        getListWithDLR(obj.left);
    }
    if (obj.right) {
        getListWithDLR(obj.right);
    }
}
console.log('--getListWithDLR--');
getListWithDLR(tree);
// 把这个对象中所有的名字以“中序遍历”的方式全部输出到console中
function getListWithLDR(obj) {
    if (obj.left) {
        getListWithLDR(obj.left);
    }
    if (obj.name) {
        console.log(obj.name);
    }
    if (obj.right) {
        getListWithLDR(obj.right);
    }
    // for (const key in obj) {
    //     if (obj.hasOwnProperty(key)) {
    //         const element = obj[key];
    //         if (typeof (element) == 'object') {
    //             getListWithLDR( element);
    //         }
    //     }
    // }
    
}
console.log('--getListWithLDR--');
getListWithLDR(tree);
// 把这个对象中所有的名字以“后序遍历”的方式全部输出到console中
function getListWithLRD(obj) {
    if (obj.left) {
        getListWithLRD(obj.left);
    }
    if (obj.right) {
        getListWithLRD(obj.right);
    }
    if (obj.name) {
        console.log(obj.name);
    }
}
console.log('--getListWithLRD--');
getListWithLRD(tree);