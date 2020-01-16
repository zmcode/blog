import axiosTool from '../index.js'

// 上传接口
export const upload = params => {
    return axiosTool.httpServer(
        {
            url: '/upload',
            method: 'post'
        },
        params
    )
}
// 更新用户信息接口
export const UserInfoUpdata = params => {
    return axiosTool.httpServer(
        {
            url: '/user/updata',
            method: 'put'
        },
        params
    )
}

// 获取用户信息接口
export const UserInfo = params => {
    return axiosTool.httpServer(
        {
            url: '/user/info',
            method: 'get'
        },
        params
    )
}

// 获取文章分类接口
export const cateGory = params => {
    return axiosTool.httpServer(
        {
            url: '/category',
            method: 'get'
        },
        params
    )
}

// 获取用户个人主页接口
export const otherInfo = ({ id }, params) => {
    return axiosTool.httpServer(
        {
            url: `/user/${id}/center`,
            method: 'get'
        },
        params
    )
}

// 获取用户个人信息文章接口
export const userArticle = ({ id }, params) => {
    return axiosTool.httpServer(
        {
            url: `/user/${id}/article`,
            method: 'get'
        },
        params
    )
}

// 速记分类接口
export const GetRecordSelect = params => {
    return axiosTool.httpServer(
        {
            url: '/shorthand/topic',
            method: 'get'
        },
        params
    )
}

// 获取用户id
export const getUserId = params => {
    return axiosTool.httpServer(
        {
            url: '/user/id',
            method: 'post'
        },
        params
    )
}
