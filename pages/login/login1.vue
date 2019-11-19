<template>
    <view class="content">
			<view class="login-hd">
				<view class="login-icon-wrap">
					<image class="login-icon" src="../../common/images/logo-fangchan.png"></image>
				</view>
				<text class="login-name">登录</text>
			</view>
			<view class="login-bd">
				<form class="login-form" @submit="formSubmit">
					<view class="login-wrap">
						<view class="form-item mb-25">
							<view class="form-aux">手机号</view>
							<view class="form-input-wrap">
								<i class="iconfont iconzhanghu font-normal input-icon"></i>
								<input class="grid-cell f-15 form-input" type="text" value="" name="username" adjust-position placeholder="请输入手机号" placeholder-style="color:#999" v-model="username"/>
								<i class="input-clear iconfont iconqingchu" v-show="username" @click="clearUsername"></i>
							</view>
						</view>
						<view class="form-item">
							<view class="form-aux">密码 <i class="iconfont ml-5" :class="[showPassword ? 'iconyanjing' : 'iconyanjing1']" @click="showPassword = !showPassword"></i></view>
							<view class="form-input-wrap">
								<i class="iconfont iconmima font-normal input-icon"></i>
								<input class="grid-cell f-15 form-input" type="text" name="password" adjust-position :password="showPassword ? false : true" value="" placeholder="请输入密码" placeholder-style="color:#999" v-model="password"/>
								<i class="input-clear iconfont iconqingchu" v-show="password" @click="clearPassword"></i>
							</view>
						</view>
						<view class="form-item-text">
							<span class="grid-cell"></span>
							<span class="font-primary font-md">忘记密码</span>
						</view>
					</view>
					<view class="btn-login-wrap">
							<button form-type="submit" class="btn-login btn-submit">登录</button>
					</view>
				</form>
				<view class="form-item-text">
					<span class="grid-cell"></span>
					<span class="font-primary font-md">注册账号</span>
				</view>
			</view>
			
        <view class="input-group">
            <view class="input-row border">
                <text class="title">账号：</text>
                <m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
            </view>
            <view class="input-row">
                <text class="title">密码：</text>
                <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="submit">登录</button>
        </view>
        <view class="action-row">
            <navigator url="../reg/reg">注册账号</navigator>
            <text>|</text>
            <navigator url="../pwd/pwd">忘记密码</navigator>
        </view>
        <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
            <view class="oauth-image" v-for="provider in providerList" :key="provider.value">
                <image :src="provider.image" @tap="oauth(provider.value)"></image>
            </view>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    // import {login} from '@/api/auth';
    import {login} from '@/api';
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import mInput from '../../components/m-input.vue'

    export default {
        components: {
            mInput
        },
        data() {
            return {
              providerList: [],
              hasProvider: false,
              account: '',
              password: '',
              positionTop: 0
            }
        },
        computed: mapState(['forcedLogin']),
        created() {
          console.log('login', login);
        },
        methods: {
          submit() {
            login(this.account, this.password).then(res => {
              console.log('res', res);
            })
          },
            ...mapMutations(['login']),
            initProvider() {
                const filters = ['weixin', 'qq', 'sinaweibo'];
                uni.getProvider({
                    service: 'oauth',
                    success: (res) => {
                        if (res.provider && res.provider.length) {
                            for (let i = 0; i < res.provider.length; i++) {
                                if (~filters.indexOf(res.provider[i])) {
                                    this.providerList.push({
                                        value: res.provider[i],
                                        image: '../../static/img/' + res.provider[i] + '.png'
                                    });
                                }
                            }
                            this.hasProvider = true;
                        }
                    },
                    fail: (err) => {
                        console.error('获取服务供应商失败：' + JSON.stringify(err));
                    }
                });
            },
            initPosition() {
                /**
                 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
                 * 反向使用 top 进行定位，可以避免此问题。
                 */
                this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
            },
            bindLogin() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (this.account.length < 5) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号最短为 5 个字符'
                    });
                    return;
                }
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
                /**
                 * 下面简单模拟下服务端的处理
                 * 检测用户账号密码是否在已注册的用户列表中
                 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
                 */
                const data = {
                    account: this.account,
                    password: this.password
                };
                const validUser = service.getUsers().some(function (user) {
                    return data.account === user.account && data.password === user.password;
                });
                if (validUser) {
                    this.toMain(this.account);
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '用户账号或密码不正确',
                    });
                }
            },
            oauth(value) {
                uni.login({
                    provider: value,
                    success: (res) => {
                        uni.getUserInfo({
                            provider: value,
                            success: (infoRes) => {
                                /**
                                 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
                                 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
                                 */
                                this.toMain(infoRes.userInfo.nickName);
                            }
                        });
                    },
                    fail: (err) => {
                        console.error('授权登录失败：' + JSON.stringify(err));
                    }
                });
            },
            toMain(userName) {
                this.login(userName);
                /**
                 * 强制登录时使用reLaunch方式跳转过来
                 * 返回首页也使用reLaunch方式
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../main/main',
                    });
                } else {
                    uni.navigateBack();
                }

            }
        },
        onReady() {
            this.initPosition();
            this.initProvider();
        }
    }
</script>

<style>
    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .action-row navigator {
        color: #007aff;
        padding: 0 20upx;
    }

    .oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .oauth-image {
        width: 100upx;
        height: 100upx;
        border: 1upx solid #dddddd;
        border-radius: 100upx;
        margin: 0 40upx;
        background-color: #ffffff;
    }

    .oauth-image image {
        width: 60upx;
        height: 60upx;
        margin: 20upx;
    }
		
		.login-hd {
			width: 100%;
			height: 600upx;
			background-color: #4286f5;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-bottom: 80upx;
			box-sizing: border-box;
		}
		.login-icon {
			width: 180upx;
			height: 180upx;
		}
		.login-name {
			color: #fff;
			font-size: 48upx;
			padding: 30upx 30upx 0;
		}
		.login-bd {
			padding: 0 26upx;
		}
		.login-wrap {
			width: 100%;
			min-height: 200upx;
			background-color: #fff;
			border-radius: 16upx;
			margin-top: -112upx;
			box-shadow: 0 0 10upx 0 rgba(0,0,0,.15);
			padding: 80upx 0;
			box-sizing: border-box;
		}
		.login-wrap .form-item {
			padding: 0 70upx;
		}
		.login-wrap .form-item:last-child {
			margin-bottom: 0;
		}
		.login-wrap .form-item .form-aux {
			font-size: 28upx;
			color: #666;
			display: flex;
			align-items: center;
		}
		.login-wrap .form-item .form-input-wrap {
			position: relative;
			width: 100%;
			padding: 10upx 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #ccc;
		}
		.login-wrap .form-item .form-input-wrap .input-icon{
			font-size: 30upx;
			margin-right: 10px;
		}
		.login-wrap .form-item .form-input-wrap .input-clear {
			font-size: 30upx;
			margin-left: 10px;
			color: #ccc;
		}
		.form-item-text {
			display: flex;
			padding: 0 70upx;
			margin-top: 20upx;
		}
		.btn-login-wrap {
			height: 100upx;
			line-height: 100upx;
			padding: 0 50upx;
			margin-top: -50upx;
		}
		.btn-login-wrap .btn-login {
			width: 100%;
			height: 100%;
			border-radius: 100upx;
			background-color: #4286f5;
			color: #fff;
		}
</style>
