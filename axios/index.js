import axios from 'axios'
import login from '../store/login'

const myAxios = axios.create({
  })

// 请求拦截
myAxios.interceptors.request.use(
    config => {
        let userData = login.state()
        if (userData.UserToken && userData.UserToken !== '') {
            config.headers.Authorization = `Bearer ${userData.UserToken}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 响应拦截
myAxios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        // 没有token或者过期处理
        if (error.response && error.response.status === 401 || error.response.status === 404) {
            process.browser && (window.location.href = '/login')
        }
        return Promise.reject(error.response)
    }
)


// 封装请求
// @parmas  opts{Object} 配置信息
// @parmas  data{Object} 请求参数
const httpServer = (opts, data) => {
    const headers = {}
    // 设置请求的配置
    const httpOptions = {
        method: opts.method.toLowerCase(),
        url: opts.url,
        timeout: 3000,
        // 配置不一样的baseURl,通过环境
        baseURL: process.browser ? process.env.VUE_APP_API : 'http://127.0.0.1:3000',
        headers: Object.assign(headers, opts.headers),
        withCredentials: true // 允许跨域发生cookie
        // headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZGNmOTgyMTRiNGFiNTBlNDAzOTA5MjIiLCJpYXQiOjE1NzQyNjcwNTQsImV4cCI6MTU3NDg3MTg1NH0.bLkaQbCyBb_OaXr__StsXD7rsWswcAW2CoFwvjLeR4U"}
        // baseURL: process.browser ? process.env.VUE_APP_API : opts.baseURL
    }

    // 区分post或者get
    if (httpOptions.method === 'get' || httpOptions.method === 'delete') {
        httpOptions.params = data
    } else {
        httpOptions.data = data
    }
    // 封装
    const promise = new Promise((resolve, reject) => {
        myAxios(httpOptions)
            .then(req => {
                resolve(req.data)
            })
            .catch(error => {
                reject(error)
            })
    })
    // 最终返回成功or失败promise
   return promise
}

// 暴露
export default {
    httpServer
}

