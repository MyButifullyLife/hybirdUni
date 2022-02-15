<style lang="less">
	.public-header {
		user-select: none;
		input {
			user-select: text;
		}
		&.header {
			display: flex;
			justify-content: space-between;
			position: fixed;
			z-index: 20;
			top: 0;
			left: 0;
			right: 0;
			height: 44px;
			box-sizing: border-box;
			line-height: 44px;
			text-align: center;
			background: #fff;
			/*border-bottom: solid #f1f1f1 1px;*/
			.back {
				position: relative;
				font-size: 16px;
				color: #979797;
				line-height: 44px;
				padding-left: 15px;
				width: 30px;
				&.icon-back {
					position: absolute;
					left: 16px;
					top: 14px;
					width: 14px;
					height: 14px;
					background: url("../../assets/images/myHeader/ico_back.svg") no-repeat center;
					background-size: contain;
					&:before {
						content: "";
						position: absolute;
						top: -10px;
						left: -10px;
						right: -10px;
						bottom: -10px;
						/*position: absolute;*/
						/*top: 50%;*/
						/*left: 11px;*/
						/*margin-top: -10px;*/
						/*line-height: 0;*/
						/*padding: 10px 0;*/
					}
				}
			}
			.close {
				position: relative;
				font-size: 16px;
				color: #979797;
				line-height: 44px;
				padding-left: 15px;
				margin-left: 5px;
				width: 30px;
				&.icon-close {
					position: absolute;
					left: 46px;
					top: 14px;
					width: 14px;
					height: 14px;
					background: url("../../assets/images/myHeader/ico_close.svg") no-repeat center;
					background-size: contain;
					&:before {
						content: "";
						position: absolute;
						top: -10px;
						left: -10px;
						right: -10px;
						bottom: -10px;
						/*position: absolute;*/
						/*top: 50%;*/
						/*left: 11px;*/
						/*margin-top: -10px;*/
						/*line-height: 0;*/
						/*padding: 10px 0;*/
					}
				}
			}
			.title {
				/*font-family: PingFangSC-Regular;*/
				font-size: 17px;
				color: #16336B;
				font-weight: bold;
			}
			.left-con {
				flex-grow: 1;
			}
			.middle-con {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: 65%;
			}
			.right-con {
				flex-grow: 0;
				padding-right: 15px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #16336B;
			}
		}
	}
</style>
<template>
	<header class="header public-header" v-if="show">
		<div class="back icon-back" v-if="showBack" @click="back"></div>
		<div class="close icon-close"  @click="close" v-if="showClose"></div>
		<div class="left-con">
			<slot name="left"></slot>
		</div>
		<div class="middle-con" v-if="!title">
			<slot name="middle"></slot>
		</div>
		<div class="title middle-con" v-if="title">{{title}}</div>
		<div class="right-con">
			<slot name="right"></slot>
		</div>
	</header>
</template>
<script>
	export default {
		props: {
			showBack: {
				type: Boolean,
				default: true
			},
			showClose: {
				type: Boolean,
				default: true
			},
			title: {
				type: String
			},
			show: {
				type: Boolean,
				default: true
			},
			backFun: {
				type: Function
			}
		},
		data() {
			return {};
		},
		mounted() {},
		methods: {
			back() {
				if (this.backFun) {
					this.backFun();
				} else {
					if(window.history.length <= 1){
						uni.navigateBack();
					} else {
						this.$router.back();
					}
				}
			},
			close() {
				this.$emit('close');
			}
		}
	};
</script>
