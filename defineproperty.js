/* 
  mvvm实现原理
  mvvm原称是 model 数据模型 - view  ui组件 -viewmodel视图模型
  viewmodel是数据模型和ui组件连结的一个桥梁
  数据绑定到viewmodel层中自动将数据渲染到页面上
  页面更新时会通知viewmodel将数据更新。
  mvvm vue是通过数据劫持 和 订阅发布模式来实现mvvm模式的
  vue不兼容ie8以下 因为它实现mvvm模型核心用了Es5的一个方法
  object.defineProperty 
*/
// 以下会实现数据劫持方法，我们知道Vue本身不能增加新添加的属性的因为没有get set ；

function Mymvvm( options= {}) {
    this.$options = options;
    let data = this._data = this.$options.data;
    observer(data);
    compile(options.el, this);
    for (let key in data) {
        Object.defineProperty(this, key, {
            enumerable: true,
            get() {
                return this._data[key];
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        })
    }
}

function observer(data) {
    for (let key in data) {
        let val = data[key]
        if (val !== null && typeof val === 'object') {
            observer(val)
        }
        Object.defineProperty(data, key, {
            enumerable: true,
            get() {
                return val;
            },
            set(newVal) {
                if (val === newVal) {
                    return;
                }
                val = newVal;
                if (val !== null && typeof val === 'object') {
                    observer(val)
                }
            }
        })
    }
}
// 一个简单的就写好了，我不知道为什么这个代码结构长这样哈哈，好多递归
// 第一个递归是我们假如设置data属性是对象的话，把属性值定义defineproptrty
// 第二个递归是改变的增加是一个对象的话跟上面同理

// 页面也数据的绑定
function compile(el, vm) {
    // el id里面的元素;
    // vm 上面挂载的属性和方法
    vm.$el = document.querySelector(el);
    // 创建一个dom片段
    let fragment = document.createDocumentFragment();
    // 将app的内容移到内中
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);
    }
    replace(fragment)
    function replace(fragment) {
        Array.from(fragment.childNodes).forEach(function (node) {
            let text = node.textContent;
            let reg = /\{\{(.*)\}\}/;
            if (node.nodeType === 3 && reg.test(text)) {
                let arr = RegExp.$1.split('.');
                let val = vm._data;
                arr.forEach(function (k) {
                   val = val[k]
                });
                node.textContent = text.replace(reg, val);
            }
            if (node.childNodes) {
                replace(node)
            }
           
        })
    }
   
   vm.$el.appendChild(fragment)

}