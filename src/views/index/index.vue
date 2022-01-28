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
        compass: ''

      }
    },
    props: {},
    methods: {
      backTo() {
        uni.navigateBack();
      },
      getImage() {
        this.UNI_TOOLS.uniApi({
          apiName: 'chooseImage',
          options: {
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
          options: {
            type: 'wgs84',
            success: (res) => {
              this.location = res
              console.log('当前位置的经度：' + res.longitude);
              console.log('当前位置的纬度：' + res.latitude);
            }
          }
        })
      },
      compassFn(bool){
        if(bool){
          this.UNI_TOOLS.uniApi({
            apiName: 'onCompassChange',
            offName: 'offCompassChange',  // 取消监听的方法名要加上。 防止监听重复叠加造成APP 卡顿
            options: (res)=>{
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
        this.UNI_TOOLS.uniApi({
          apiName: 'scanCode',
          options: {
            success: (res) => {
              this.qCode = res.result
              console.log('条码类型：' + res.scanType);
              console.log('条码内容：' + res.result);
            }
          }
        })
      },
      sendMsg() {
        // 发送了一个对象
        uni.postMessage({
          data: {
            apiName: 'onCompassChange',
            params: {
              b: 2,
              success2: function (e) {
                console.log('H5', e)
              }
            }
          }
        });
      }
    },
    mounted() {
    },
    computed: {}
  }
</script>

<style scoped lang="less">

</style>
