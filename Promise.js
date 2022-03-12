// 写一个简单的Promise
function MyPromise(excutor) {
    let self = this;
    self.status = 'pending'; //等待
    self.value = null; //成功
    self.err = null; //失败
    self.calaSucces = [];
    self.calaError = [];
    function reslove(values) {
        if (self.status == 'pending') {
            self.status == 'succes';
            self.value = values;
            self.calaSucces.forEach(fn=>fn(values))
        }
    }
    function reject(erros) {
        if (self.status == 'pending') {
            self.status == 'err';
            self.err = erros;
            self.calaError.forEach(fn=>fn(erros))
        }
    }
    try {
        excutor(reslove,reject)
    } catch (err) {
        console.log(err)
    }
   
}
MyPromise.prototype.then = function (succes, error) {
    succes = typeof succes == 'function' ? succes : function (data) { reslove(data) };
    error = typeof error == 'function' ? error : function (err) { throw err };
    let self = this;
    if (self.status == 'pending') {
        self.calaSucces.push(succes);
        self.calaError.push(error);
    }

}
let text = new MyPromise((reslove, reject) => {
    setTimeout(() => {
       reslove(2)
   },2000)
})
text.then(data => console.log(data))
