<template>
    <div style="height: 100%">
        <div class="LoginWrap" :class="{isRegister: RegisterVisible, isLogin: LoginVisible}">
            <div class="content">
                <div class="cardWrap">
                    <div class="card shadow Noborder CardWelcome" :class="{isShow: WelcomeVisible}">
                        <div class="card-body">
                            <h1 class="card-title">遥近</h1>
                            <p class="card-message">不一样博客平台</p>
                            <div class="btn-wrap">
                                <a class="btn btnRegiste js-btn" data-target="register" @click='ShowRegister'>注册</a>
                                <a class="btn btnLogin js-btn" data-target="login" @click='ShowLogin'>登录</a>
                            </div>
                        </div>
                    </div>
                    <div class="card shadow Noborder CardRegiste" :class="{isShow: RegisterVisible}">
                        <div class="card-body">
                            <h2 class="card-title">注册新用户</h2>
                            <p class="card-message">欢迎你的到来，点赞、评价是对我最大的鼓励</p>
                            <form class="form-wrap">
                                <div class="form-group">
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder="名称"
                                        required="required"
                                        oninvalid="setCustomValidity('名称不能为空')"
                                        oninput="setCustomValidity('')"
                                        v-model="name"
                                    >
                                </div>
                                <div class="form-group">
                                    <input
                                        class="form-control"
                                        type="text" 
                                        placeholder="账号"
                                        required="required"
                                        oninvalid="setCustomValidity('账号不能为空')"
                                        oninput="setCustomValidity('')"
                                        v-model="username"
                                    >
                                </div>
                                <div class="form-group">
                                    <input
                                        class="form-control"
                                        type="password"
                                        placeholder="密码"
                                        required="required"
                                        oninvalid="setCustomValidity('密码不能为空')"
                                        oninput="setCustomValidity('')"
                                        v-model="password"
                                    >
                                </div>
                                <button class="btn btnRegiste" @click='RegisterUser'>注册</button>
                            </form>
                        </div>
                        <button class="btn-back" @click="showWelcome">
                            <Icon type="ios-arrow-back" class="RegisterIcon"/>
                        </button>
                    </div>
                    <div class="card shadow Noborder CardLogin" :class="{isShow: LoginVisible}">
                        <div class="card-body">
                            <h2 class="card-title">登录账号</h2>
                            <p class="card-message">有你的贡献博客将会更强大</p>
                            <form class="form-wrap">
                                <div class="form-group">
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder="账号"
                                        required="required"
                                        nullmsg='用户名不能为空'
                                        v-model="username"
                                    >
                                </div>
                                <div class="form-group">
                                    <input
                                        class="form-control"
                                        type="password"
                                        placeholder="密码"
                                        required="required"
                                         nullmsg='密码不能为空'
                                        v-model="password"
                                    >
                                </div>
                                <button class="btn btnLogin" @click="LoginUser">登录</button>
                            </form>
                        </div>
                        <button class="btn-back" @click="showWelcome">
                            <Icon type="ios-arrow-back" class="LoginIcon"/>
                        </button>
                    </div>
                </div>
            </div>
            <div class="ErrorWrap" v-if="showInf">
                <span :class="{error}">{{InfText}}</span>
                <img :src="InfImg">
            </div>
        </div>
    </div>

</template>
<script>
import { Register } from  '../../axios/api/user.js'
import { mapActions } from 'vuex'
// import login from '../../store/login';
import md5 from 'md5'
export default {
  layout: 'login',
  // 数据源
  data () {
    return {
      WelcomeVisible: true, // 是否显示welcome
      RegisterVisible: false,// 是否显示注册
      LoginVisible:false,// 是否显示登录
      username: '', // 用户名
      password: '', // 密码
      name: '', // 名称
      showInf: false, // 是否显示提示
      InfText: '', // 提示文本
      InfImg:'', // 提示表情路径
      error: false, // 密码错误样式是否显示
    }
  },

  // 方法
  methods: {
    ...mapActions({
      bindLogin: 'login/handleUserLogin'
    }),
    // 显示函数
    ShowRegister () {
        this.WelcomeVisible = false
        this.RegisterVisible = true
        this.LoginVisible = false
    },
    ShowLogin () {
        this.WelcomeVisible = false
        this.RegisterVisible = false
        this.LoginVisible = true
    },
    showWelcome () {
      this.WelcomeVisible = true
      this.RegisterVisible = false
      this.LoginVisible = false
      this.username = ''
      this.password = ''
      this.name = ''
    },
    // 登录
    LoginUser (e) {
      e.preventDefault()
       this.bindLogin({
           username: this.username,
           password: md5(this.password),
       })
        .then(res => {
          if (res.code === 200) {
            let name = res.data.userInfo.name
            this.InfImg = require('~/assets/img/login_icon.png')
            this.InfText = `欢迎回来, ${name}`
            this.showInf = true
              this.$router.replace('/')
               setTimeout(() => {
                   this.showInf = false
               }, 2000)
          } else {
            this.InfImg = require('~/assets/img/error_icon.png')
            this.InfText = '账号或者密码错误'
            this.error = true
            this.showInf = true
            setTimeout(() => {
              this.showInf = false
              this.error = false
            }, 2000)
          }
        })
        // .catch(err => {
        //   this.$Message.error('网络出现异常')
        // })
    },

    // 注册
    RegisterUser (e) {
      e.preventDefault()
      Register({
           username: this.username,
           password: md5(this.password),
           name: this.name,
       })
       .then(req => {
          if (req.code === 200) {
              this.InfImg = require('~/assets/img/register_icon.png')
              this.InfText = '注册成功,去登陆吧'
              this.showInf = true
              this.ShowLogin()
            setTimeout(() => {
              this.showInf = false
            }, 2000)
          } else {
              this.InfImg = require('~/assets/img/error_icon.png')
              this.InfText = req.msg
              this.error = true
              this.showInf = true
          }
       })
       .catch(err => {
          this.$Message.error('网络出现异常', err)
        })
    }
  }
}
</script>

<style scoped lang="less">
    .LoginWrap {
    display: flex;
    height: 100vh;
    min-height: 35rem;
    align-items: center;
    justify-content: center;
    // background: linear-gradient(to right, #393e46, #eeeeee, #393e46, #393e46);
    background: #eeeeee;
    // transition: background 3s ease;    background: linear-gradient(to right, #3e434b, #393e46, #eeeeee, #ebe5e5);
    background-size: 500% 500%;
    transition: background 3s ease;
    background-position: 50% 50%;
    font-family: 'Josefin Sans', sans-serif;
        @media (min-width: 768px) {
          .content {
              max-width: 720px;
          }
          .cardWrap {
                max-width: 450px;
          }
        }
        @media (min-width: 576px) {
          .content {
              max-width: 540px;
          }
        }
        @keyframes InfoaAnimation {
          0% {
           transform: scale(0)
          }
          100% {
             transform: scale(1)
          }
        }
        .ErrorWrap {
          padding: 1px 15px;
          background-color: white;
          // border: 1px solid black;
          box-shadow: 0 1px 6px rgba(0,0,0,.2);
          box-shadow: 1px;
          border-radius: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 20px;
          animation: InfoaAnimation 0.2s;
          img {
            margin-left: 5px;
            transform: scale(0.8)
          }
          span {
            user-select: none;
            font-size: 14px;
            color:black;
            &.error {
              color: red
            }
          }
        }
        .content {
          width: 100%;
          padding-right: 15px;
          padding-left: 15px;
          margin-right: auto;
          margin-left: auto;
          .cardWrap {
                position: relative;
                margin: 0 auto;
                .card{
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      width: 100%;
                      padding-top: 1rem;
                      padding-bottom: 1rem;
                      // -webkit-transform: translate(-50%,-50%);
                      // transform: translate(-50%,-50%);
                      transition: all .2s .1s ease-out;
                      display: -ms-flexbox;
                      display: flex;
                      -ms-flex-direction: column;
                      flex-direction: column;
                      min-width: 0;
                      word-wrap: break-word;
                      background-color: #fff;
                      background-clip: border-box;
                      border: 1px solid rgba(0,0,0,.125);
                      border-radius: .25rem;
                      .card-body {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        flex: 1 1 auto;
                        padding: 1.25rem;
                        h1 {
                              user-select: none;
                              color: #222831;
                        }
                        p {
                            user-select: none;
                        }
                        .card-title {
                            user-select: none;
                            margin-bottom: .75rem;
                            font-weight: bold;
                            font-size: 1.8rem;
                        }
                        .card-message {
                          font-size: 13px;
                        }
                        .form-wrap {
                          margin-top: 10px;
                            .form-group {
                              margin-bottom: 1rem;
                              .form-control {
                                display: block;
                                width: 100%;
                                height: calc(2.25rem + 2px);
                                padding: .375rem .75rem;
                                font-size: 1rem;
                                line-height: 1.5;
                                color: #495057;
                                background-color: #fff;
                                background-clip: padding-box;
                                border: 1px solid #ced4da;
                                border-radius: .25rem;
                                transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                                &:focus {
                                  outline: 0;
                                }
                              }
                          }
                        }
                      }
                      .btn-wrap {
                          display: flex;
                          flex-direction: column;
                          .btn {
                              user-select: none;
                              cursor: pointer;
                              font-size: 1rem;
                              display: inline-block;
                              font-weight: 400;
                              color:black;
                              width: 10em;
                              border-radius: 20px;
                              border: 2px solid transparent;
                              text-align: center;
                              white-space: nowrap;
                              vertical-align: middle;
                              padding: 10px 20px;
                              margin: 6px 0;
                              transition: .3s;
                          }
                          .btnRegiste {
                            margin-top: 15px;
                             background-color: #393e4640;;

                            // color: white !important;
                            &:hover {
                             background-color: #eeeeee;
                             transform: translateY(-4px);
                              box-shadow: rgba(0, 0, 0, 0.4) 0 0.375em 1.5em -0.375em;
                            }
                          }
                          .btnLogin{
                            background-color: #393e46cc;
                              color: white;
                            &:hover {
                                background-color: #393e46;
                                color: white;
                                transform: translateY(-2px);
                                box-shadow: rgba(0, 0, 0, 0.4) 0 0.375em 1.5em -0.375em;
                            }
                          }
                      }
                      &:not(.isShow) {
                        opacity: 0;
                        transform: translate(-50%,-50%) rotateX(95deg);
                      }
                }
                .CardRegiste {
                  .form-control {
                      border-color:  #393e4640;
                      &:focus{
                            box-shadow: 0 0 0 0.2rem #393e4640;
                      }
                  }
                  .btnRegiste {
                    color: #495057;
                    width: 10em;
                    outline:none;
                    cursor: pointer;
                    transition: all .4s;
                    border-radius: 20px;
                    border: 2px solid transparent;
                    padding: .5rem 1rem;
                    font-size: 1.25rem;
                    line-height: 1.5;
                    &:hover {
                          background-color: #fff;
                          color: black !important;
                          font-weight: bold;
                          border: 2px solid black;
                    }
                  }
                  .btn-back {
                      cursor: pointer;
                      position: absolute;
                      top: 0;
                      left: 0;
                      border-radius: 0;
                      width: 3rem;
                      height: 3rem;
                      font-size: 1.5rem;
                      border: 0;
                      background-color:#eee;
                      outline: none;
                      transition: .4s;
                      &:hover {
                        background-color: #fff;
                        color: black;
                        font-weight: bold;
                      }
                      .RegisterIcon {
                        color: #495057;
                        font-weight: bold;
                      }
                  }
                }

                .CardLogin {
                  .form-control {
                      border-color:#393e46;

                      &:focus{
                            box-shadow: 0 0 0 0.15rem  #393e46;
                      }
                  }
                  .btnLogin {
                    background-color: #393e46cc;
                    color: white;
                    width: 10em;
                    outline:none;
                    cursor: pointer;
                    transition: all .4s;
                    border-radius: 20px;
                    border: 2px solid transparent;
                    padding: .5rem 1rem;
                    font-size: 1.25rem;
                    line-height: 1.5;
                     &:hover {
                        background-color: #fff;
                        color: black !important;
                        font-weight: bold;
                        border: 2px solid #393e46cc;
                    }
                  }
                  .btn-back {
                      cursor: pointer;
                      position: absolute;
                      top: 0;
                      left: 0;
                      border-radius: 0;
                      width: 3rem;
                      height: 3rem;
                      font-size: 1.5rem;
                      border: 0;
                      background-color:#393e46cc;
                      outline: none;
                      transition: .4s;
                      &:hover {
                        background-color: #fff;
                        font-weight: bold;
                        & > .LoginIcon {
                          color: black;
                        }
                      }
                      .LoginIcon {
                        color: white;
                        font-weight: bold;
                      }
                  }
                }
                .shadow {
                    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
                }
                .Noborder{
                  border: 0!important;
                }
                .card.isShow {
                    opacity: 1;
                    transform: translate(-50%,-50%);;
                    z-index: 5;
                }
          }
        }
      }
      .LoginWrap.isRegister{
        background-position: 100% 100%
      }
      .LoginWrap.isLogin{
        background-position: 0% 100%
      }
</style>
