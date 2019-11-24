import axiosTool from '../index.js'

export const publishArticle = parmas => {
    return axiosTool.httpServer(
        {
            url: '/publish',
            method: 'post'
        },
        parmas
    )
}

export const GetArticlelist = parmas => {
    return axiosTool.httpServer(
        {
            url: '/list',
            method: 'get'
        },
        parmas
    )
}

// 草稿
export const draftList = parmas => {
    return axiosTool.httpServer(
        {
            url: '/draft',
            method: 'get'
        },
        parmas
    )
}

// 文章细节接口
export const articleDetail = ({ id }, parmas) => {
    return axiosTool.httpServer(
        {
            url: `/article/detail/${ id }`,
            method: 'get'
        },
        parmas
    )
}

// 编辑文章接口
export const editArticle = ({ id }, params) => {
    return axiosTool.httpServer(
        {
            url: `/article/updata/${ id }`,
            method: 'put'
        },
        params
    )
}

// 软删除文章
export const deleteArticle = ({ id }, params) => {
    return axiosTool.httpServer(
        {
            url: `/article/delete/${ id }`,
            method: 'delete'
        },
        params
    )
}

// 搜索文章
export const SearchArticle = params => {
    return axiosTool.httpServer(
        {
            url: '/article/search',
            method: 'get'
        },
        params
    )
}
