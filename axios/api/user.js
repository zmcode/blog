import axiosTool from '../index.js'

// 登陆接口
export const Login = params => {
    return axiosTool.httpServer(
        {
            url: '/login',
            method: 'post'
        },
        params
    )
}

// 注册接口
export const Register = params => {
    return axiosTool.httpServer(
        {
            url: '/register',
            method: 'post'
        },
        params
    )
}