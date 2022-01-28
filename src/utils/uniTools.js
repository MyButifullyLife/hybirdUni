/**
 * Created by gaojiahao on 2022.
 */

window.UNI_FN = {}

window.UNI_CALLBACK = function (fnId, msg) {
  UNI_FN[fnId](msg)
}

const type = {
  'function': 1,
  'undefined': 2,
  'object': 3,
}

const UNI_TOOLS = {
  delUniFn: (apiName) => {
    for (const key in window.UNI_FN) {
      if (key.indexOf(apiName) !== -1) {
        delete window.UNI_FN[key]
      }
    }
  },
  getUniFn: (apiName) => {
    for (const key in window.UNI_FN) {
      if (key.indexOf(apiName) !== -1) {
        return {
          key,
          fn: window.UNI_FN[key]
        }
      }
    }
  },
  uniApi: (option) => {
    let time = new Date().getTime()
    if (option && option.apiName) {
      time = option.apiName + time;
      option.callBackList = [];
      
      option.type = type[typeof option.options]
      // 清除以往记录
      UNI_TOOLS.delUniFn(option.apiName)
      
      switch (option.type) {
        case 1:
          window.UNI_FN[time] = option.options;
          option.callBackList.push(time)
          break;
        case 2:
          // 不需处理
          break;
        case 3:
          for (const key in option.options) {
            if (typeof option.options[key] === 'function') {
              window.UNI_FN[time + `_${key}`] = option.options[key]
              option.callBackList.push(time + `_${key}`)
              delete option.options[key]
            }
          }
          break;
      }
      
      // 发送了一个对象
      uni.postMessage({
        data: option
      });
      
    }
  }
}

export default UNI_TOOLS
