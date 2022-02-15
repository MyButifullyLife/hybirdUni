<template>
    <view class="webview-box">
        <web-view ref="webview" class="webview" :src="src" @message="handleMessage"></web-view>
    </view>
</template>
<script>

  import {pathToBase64, base64ToPath} from 'image-tools'

  var webView
  const listenList = {}
  export default {
    data() {
      return {
        wv: null,
        src: '',
        disabledApi: ['setStorage', 'setStorageSync', 'removeStorage', 'removeStorageSync', 'clearStorageSync', 'clearStorage']
      }
    },
    onLoad(option) {
      console.log(option)
      this.src = option.url
      var current = this.$scope.$getAppWebview()
      setTimeout(() => {
        webView = current.children()[0]
      }, 1000)
    },
    onHide() {
      // 页面即将退出时要清理监听的内容,防止内存泄露
      console.log('hide')
      for (var key in listenList) {
        uni[listenList[key].offName](listenList[key].callBack)
      }
    },
    onBackPress() {
      // 页面即将退出时要清理监听的内容,防止内存泄露
      console.log('onBackPress')
      for (var key in listenList) {
        uni[listenList[key].offName](listenList[key].callBack)
      }
    },
    methods: {
      init(url) {
        this.src = url;
      },
      // 接收h5页面发来的键值判断需要执行的操作
      handleMessage(evt) {
        console.log("postMessage: ", evt)
        var _this = this;
        const d = evt.detail.data[0];
        // H5 不能使用部分API
        for (const i in this.disabledApi) {
          if (i === d.apiName) {
            console.error('API CANNOT USE')
            return
          }
        }

        if (d.apiName) {
          switch (d.type) {
            case 1:
              const f = function (res) {
                webView.evalJS(`UNI_CALLBACK("${d.callBackList[0]}", ${JSON.stringify(res)})`)
              }

              // 此调用是监听调用
              if (d.offName) {
                listenList[d.apiName] = {
                  offName: d.offName,
                  callBack: f
                }
              }

              uni[d.apiName](f)
              break;
            case 2:
              if (d.onName) {
                // 需要取消的监听对象
                uni[d.apiName](listenList[d.onName].callBack)
              } else {
                uni[d.apiName]()
              }
              break;
            case 3:
              if (d.callBackList && d.callBackList.length) {
                d.callBackList.forEach((item) => {
                  const n = item.split('_')
                  // 若是选择图片需要转base64
                  if (d.apiName === 'chooseImage' && n[1] === 'success') {
                    d.params[n[1]] = function (data) {
                      const a = JSON.stringify(data)
                      const img = [];
                      // 并行
                      Promise.all(data.tempFilePaths.map(path => pathToBase64(path)))
                      .then(res => {
                        webView.evalJS(`UNI_CALLBACK("${item}", ${JSON.stringify(res)})`)
                      })
                      .catch(error => {
                        console.error(error)
                      })


                    }
                  } else {
                    d.params[n[1]] = function (res) {
                      const a = JSON.stringify(res)
                      webView.evalJS(`UNI_CALLBACK("${item}", ${a})`)
                    }
                  }

                })
                delete d.callBackList
              }
              uni[d.apiName](d.params)
              break;
            case 4:
              const c = function (res) {
                webView.evalJS(`UNI_CALLBACK("${d.callBackList[0]}", ${JSON.stringify(res)})`)
              }
              c(uni[d.apiName](d.params))
              break;
          }
        }
      },
      // 获取到对应webview(关键)通过evalJs(注意大小写，如果不知道evalJ是什么，可自行百度) 执行网页的函数，可对其进行传参，完成与网页的通讯
      handlePostMessage(res) {
        this.$refs.webview.evalJs(`window.abc=321`);
      },

    }
  }
</script>

<style>
    .webview-box {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
    }

    .webview {
        flex: 1;
    }
</style>
