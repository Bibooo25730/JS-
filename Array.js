// 数组去重
let arr = ['1', '2', 'a', 'b', '1', 'a'];
let arrs = Array.from(new Set(arr));
console.log(arrs);

let arrnew = [];

for (let i = 0; i < arr.length; i++){
    // indexof 如果没有返回 -1;
    // 如果同意的则会 else
    if (arrnew.indexOf(arr[i]) == -1) {
        arrnew.push(arr[i])
    }
}
console.log(arrnew)