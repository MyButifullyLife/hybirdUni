<template>
    <div>
        <Header @close="sendMsg()">
        </Header>
        首页
        <Button @click="sendMsg">按钮</Button>
        <Checkbox v-model="checked">复选框</Checkbox>

        <div style="margin-top: 20px">
            <p>二维码内容:{{qCode}}</p>
            <button @click="scanCode">
                扫码
            </button>
        </div>
        <div style="margin-top: 20px">
            <p>
                经度： {{location.longitude}} 维度：{{location.latitude}}
            </p>
            <button @click="getLocation">
                获取位置
            </button>
        </div>
        <div>
            <button @click="getImage">
                获取图片
            </button>
            <template v-if="imgObj">
                <img v-for="img in imgObj" :src="img" style="width: 50px;height: 50px;" alt="">
            </template>
        </div>
        <div>
            <p>罗盘：{{compass}}</p>
            <button @click="compassFn(true)">监听罗盘</button>
            <button @click="compassFn(false)">取消监听罗盘</button>
        </div>
        <div>
            <p>用户信息: {{userInfo}}</p>
            <button @click="getUser">获取用户信息</button>
        </div>
        <div style="margin-top: 20px">
            <button @click="backTo">
                回退
            </button>
        </div>
    </div>
</template>

<script>
  import {Button, Checkbox, CheckboxGroup} from 'vant';
  import Header from '../../../src/components/myHeader'

  export default {
    name: 'demo',
    components: {
      Button,
      Checkbox,
      Header
    },
    data() {
      return {
        checked: true,
        imgObj: '',
        location: {},
        qCode: '',
        compass: '',
        userInfo: ''

      }
    },
    props: {},
    methods: {
      backTo() {
        uni.navigateBack();
      },
      getUser() {
        // 在uniapp底座转化为此格式
        // uni.getStorageSync('USER_INFO');
        this.UNI_TOOLS.uniApi({
          apiName: 'getStorageSync',
          params: 'USER_INFO',
          success: (res) => {
            console.log(res)
            this.userInfo = res
          }
        })
      },
      getImage() {
        // 在uniapp底座转化为此格式
        // uni.chooseImage({
        //   count: 6, //默认9
        //   sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        //   sourceType: ['album'], //从相册选择
        //   success: function (res) {
        //     console.log(JSON.stringify(res.tempFilePaths));
        //   }
        // });
        this.UNI_TOOLS.uniApi({
          apiName: 'chooseImage',
          params: {
            count: 6, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: (res) => {
              this.imgObj = res || []
            }
          }
        })
      },
      getLocation() {
        this.UNI_TOOLS.uniApi({
          apiName: 'getLocation',
          params: {
            type: 'wgs84',
            success: (res) => {
              this.location = res
              console.log('当前位置的经度：' + res.longitude);
              console.log('当前位置的纬度：' + res.latitude);
            }
          }
        })
      },
      compassFn(bool) {
        // 在uniapp底座转化为此格式
        // uni.onCompassChange(function (res) {
        //   console.log(res.direction);
        // });
        if (bool) {
          this.UNI_TOOLS.uniApi({
            apiName: 'onCompassChange',
            offName: 'offCompassChange',  // 取消监听的方法名要加上。 防止监听重复叠加造成APP 卡顿
            params: (res) => {
              console.log(res)
              this.compass = res.direction
            }
          })
        } else {
          this.UNI_TOOLS.uniApi({
            apiName: 'offCompassChange',
            onName: 'onCompassChange', // 需要取消监听的对象
          })
        }
      },
      scanCode() {
        // 在uniapp底座转化为此格式
        // uni.scanCode({
        //   success: function (res) {
        //     console.log('条码类型：' + res.scanType);
        //     console.log('条码内容：' + res.result);
        //   }
        // });
        this.UNI_TOOLS.uniApi({
          apiName: 'scanCode',
          params: {
            success: (res) => {
              this.qCode = res.result
              console.log('条码类型：' + res.scanType);
              console.log('条码内容：' + res.result);
            }
          }
        })
      },
      sendMsg() {

      }
    },
    mounted() {
    },
    computed: {}
  }
</script>

<style scoped lang="less">

</style>
