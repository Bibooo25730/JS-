// 浅拷贝 
let Person = {
    name: 'zs',
    age: 18
}
let son = { ...Person };
console.log(son)

let arr = ['a', 'b'];
let arrs = [...arr];
console.log(arrs)

// 深拷贝
let Student = {
    name: 'zs',
    sex: {
        man: '男',
        women:'女'
    }
}
let Studnets = {};

function deepClone(target, orgin) {
    let toStr = Object.prototype.toString;
    // 遍历要拷贝的对象
    for (let por in orgin) {
         // 判断是是引用值还是原始值
        if (orgin[por] !== null && (typeof orgin[por]) === 'object') {
            // 判断是数组还是对象 
            if (toStr.call(orgin[por]) == '[object Array]') {
                target[por] = [];
            } else {
                target[por] = {};
            }
            // 递归
            deepClone(target[por],orgin[por])
        } else {
            target[por] = orgin[por]
        }
    }
}
deepClone(Studnets, Student);
Studnets.sex.man = 'l';
console.log(Studnets,Student)