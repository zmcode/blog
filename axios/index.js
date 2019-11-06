import axios from 'axios';
import login from '../store/login';
// 先使用组件的的提示信息(后期优化)
import { Notice } from 'iview';
// 请求拦截
axios.interceptors.request.use(
    config => {
        let userData = login.state()
        if (userData.UserToken) {
            config.headers.Authorization = `Bearer ${userData.UserToken}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);
// 响应拦截
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        // 没有token或者过期处理
        if (error.response && error.response.status === 401) {
            window.location.href('/login')
        }
        console.log(error)
        Notice.error(error)
    }
);

// 封装请求
// @parmas  opts{Object} 配置信息
// @parmas  data{Object} 请求参数
const httpServer = (opts, data) => {
    console.log(process.env.VUE_APP_API)
    // 设置请求的配置
    const httpOptions = {
        method: opts.method.toLowerCase(),
        url: opts.url,
        // 配置不一样的baseURl,通过环境
        baseURL: opts.baseURL || process.env.VUE_APP_API,
    };

    // 区分post或者get
    if (httpOptions.method === 'get') {
        httpOptions.params = data
    } else {
        httpOptions.data = data
    };
    // 封装
    const promise = new Promise((resolve, reject) => {
         axios(httpOptions)
            .then(req => {
                resolve(req.data)
            })
            .catch(error => {
                reject(error)
            })
    });
    // 最终返回成功or失败promise
   return promise
}

// 暴露
export default {
    httpServer
}

