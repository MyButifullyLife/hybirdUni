/**
 * Created by yelp on 2019.
 */

export let storage = {
  get(key, isLocalStorage = true) {
    if (!key) return null
    let _storage = isLocalStorage ? localStorage : sessionStorage,
    props = key.split('.'),
    k = props.shift(),
    itemStr = _storage.getItem(k),
    itemObj = null
    try {
      itemObj = JSON.parse(itemStr)
      if (typeof itemObj != 'object')
        throw ('Not an object!')
    } catch (e) {
      return props.length ? null : itemStr
    }
    while (props.length && itemObj) {
      itemObj = itemObj[props.shift()]
    }
    return itemObj
  },
  set(key, value, isLocalStorage = true) {
    if (!key) return
    let _storage = isLocalStorage ? localStorage : sessionStorage,
    props = key.split('.'),
    k = props.shift()
    if (!props.length) {
      if (typeof value === 'object') value = JSON.stringify(value)
      _storage.setItem(k, value)
      return
    }
    let itemStr = _storage.getItem(k),
    itemObj = null
    if (itemStr) {
      try {
        itemObj = JSON.parse(itemStr)
        if (typeof itemObj != 'object')
          throw ('Not an object!')
      } catch (e) {
        throw ('storage.set: key ' + k + ' 已被占用并且不是一个对象，无法为其设置属性值')
      }
    }
    let copy = itemObj = itemObj || {}
    while (props.length > 1) {
      let p = props.shift()
      copy[p] = copy[p] || {}
      copy = copy[p]
    }
    copy[props[0]] = value
    _storage.setItem(k, JSON.stringify(itemObj))
  },
  remove(key, isLocalStorage = true) {
    if (!key) return
    let _storage = isLocalStorage ? localStorage : sessionStorage
    _storage.removeItem(key)
  },
  clear(isLocalStorage = true) {
    let _storage = isLocalStorage ? localStorage : sessionStorage
    _storage.clear()
  }
};

export function famaterTime(day = 0, showYear = true) {
  let date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * day);
  let Y = date.getFullYear();
  let M = date.getMonth() + 1;
  let D = date.getDate();
  let str = '';
  let ten = res => {
    return res <= 9 ? '0' + res : res;
  };
  if (showYear) {
    str = Y + '-' + ten(M) + '-' + ten(D);
  } else {
    str = ten(M) + '-' + ten(D);
  }
  return str;
}

export function currentTime() {
  var myDate = new Date();
  //获取当前年
  var year = myDate.getFullYear();
  //获取当前月
  var month = myDate.getMonth() + 1;
  //获取当前日
  var date = myDate.getDate();
  var h = myDate.getHours(); //获取当前小时数(0-23)
  var m = myDate.getMinutes(); //获取当前分钟数(0-59)
  var s = myDate.getSeconds();
//日期时间处理
  let conver = (s) => {
    return s < 10 ? '0' + s : s;
  };
  //获取当前时间
  return year + '-' + conver(month) + "-" + conver(date) + " " + conver(h) + ':' + conver(m) + ":" + conver(s);
}

// 获取URL参数
export function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

export function formatDate(date, fmt) {
  date = date && new Date(date) || new Date(date);
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
  let o = {
    'M+': date.getMonth() + 1,                   // 月份
    'd+': date.getDate(),                        // 日
    'h+': date.getHours(),                       // 小时
    'm+': date.getMinutes(),                     // 分
    's+': date.getSeconds(),                     // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds()                 // 毫秒
  }
  
  if (/(y+)/i.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
 * 对象数组排序方法
 *  - 接受一个成员名字符串和一个可选的次要比较函数做为参数，并返回一个可以用来包含该成员的对象数组进行排序的比较函数。
 *  - 当o[age] 和 p[age] 相等时，次要比较函数被用来决出高下。
 * @param {String} name - 要排序的字段
 * @param {Function} minor - 次要比较方法
 * @return {Function} - 返回一个用于 [].sortby 的自定义排序方法
 *
 * @example
 * var employees= [{age: 18, name: 'jack'}, {age: 18, name: 'hello'}, {age: 15, name: 'hi'}];
 * employees.sort(sortBy('age', sortBy('name')));
 * //console
 * [{age: 15, name: 'hi'}, {age: 18, name: 'hello'}, {age: 18, name: 'jack'}]
 */
export function sortBy(name, minor) {
  return function (o, p) {
    var a, b
    
    if (o && p && typeof o === 'object' && typeof p === 'object') {
      a = o[name]
      b = p[name]
      
      if (a === b) {
        return typeof minor === 'function' ? minor(o, p) : 0
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1
      }
      return typeof a < typeof b ? -1 : 1
    } else {
      // throw ("error")
    }
  }
}

export function fastFoodLocalCar(item, type, merge) {
  let fastFoodCar = JSON.parse(sessionStorage.getItem('fastFoodCar')) || [];
  let index = null;
  // 不用选择规格，就直接比较id是否相同
  if (item.specCategoryList.length === 0) {
    index = fastFoodCar.findIndex((n) => {
      return item.id === n.id
    });
  } else {
    index = fastFoodCar.findIndex((n) => {
      return item.id === n.id && n.checkoutList && ArrayIsEqual(item.checkoutList, n.checkoutList)
    });
  }
  if (type === 'add') {
    if (index === -1) {
      fastFoodCar.push(item)
    } else {
      if (merge) {
        fastFoodCar[index].count += item.count;
      } else {
        fastFoodCar[index].count++;
      }
      
    }
  } else if (type === 'del') {
    if (index === -1) {
      return;
    } else if (fastFoodCar[index].count === 1) {
      fastFoodCar.splice(index, 1)
    } else {
      fastFoodCar[index].count--
    }
  }
  sessionStorage.setItem('fastFoodCar', JSON.stringify(fastFoodCar))
}


function ArrayIsEqual(arr1, arr2) {//判断2个数组是否相等
  if (arr1.length != arr2.length) {
    return false;
  } else {//长度相同
    for (let i in arr1) {//循环遍历对比每个位置的元素
      if (isArray(arr1[i])) {
        let isSame = ArrayIsEqual(arr1[i], arr2[i])
        if (!isSame) {
          return false
        }
      } else {
        if (arr1[i] != arr2[i]) {//只要出现一次不相等，那么2个数组就不相等
          return false;
        }
      }
    }//for循环完成，没有出现不相等的情况，那么2个数组相等
    return true;
  }
  
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) == '[object Array]';
}

/**
 * [获取URL中的参数名及参数值的集合]
 * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
 * @param {[string]} urlStr [当该参数不为空的时候，则解析该url中的参数集合]
 * @return {[string]}       [参数集合]
 */
export function getUrlParamsObj(urlStr) {
  let url = null;
  if (typeof urlStr == "undefined") {
    url = decodeURI(location.search); //获取url中"?"符后的字符串
  } else {
    url = "?" + urlStr.split("?")[1];
  }
  let theRequest = {};
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

function getDate() {
  var myDate = new Date();
  //获取当前年
  var year = myDate.getFullYear();
  //获取当前月
  var month = myDate.getMonth() + 1;
  //获取当前日
  var date = myDate.getDate();
  var h = myDate.getHours(); //获取当前小时数(0-23)
  var m = myDate.getMinutes(); //获取当前分钟数(0-59)
  var s = myDate.getSeconds();
//日期时间处理
  let conver = (s) => {
    return s < 10 ? '0' + s : s;
  };
  //获取当前时间
  return year + '-' + conver(month) + "-" + conver(date) + " " + conver(h) + ':' + conver(m) + ":" + conver(s);
}

