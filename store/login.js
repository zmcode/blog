import Cookies from 'js-cookie'
import { Login } from '../axios/api/user'

// 创建state源
export const state = () => ({
    UserToken: Cookies.get('token') || '',  // 用户token
    userInfo: 
        Cookies.get('userinfo') && Cookies.get('userinfo') !== 'undefined' 
            ? JSON.parse(Cookies.get('userinfo')) : {},
    isLogin: Cookies.get('isLogin') || false             
})

// 创建异步action数据
export const actions = {
    handleUserLogin({ commit }, data) {
       return new Promise ((resolve, reject) => {
            Login(data)
                .then(req => {
                    resolve(req)
                    commit('changeUserToken', req.data)
                    commit('changeUserInfo', req.data)
                    commit('changeStatus', true)
                })
                .catch(err => {
                    reject(err)
                })
       })
    },

    // 登出
    handleClearLoginOut({ commit }) {
        Cookies.set('userinfo', JSON.stringify({}))
        Cookies.set('token', '')
        commit('changeUserToken', {})
        commit('changeUserInfo', {})
        commit('changeStatus', false)
    }
}
    
export const mutations = {
    changeUserToken ( state, data ) {
        state.UserToken = data.token || ''
        // 更新cookie数据
        Cookies.set('token', data.token || '')
    },
    changeUserInfo( state, data ) {
        state.userInfo = data.userInfo || {}
        // 更新cookie数据
        Cookies.set('userinfo', data || '')
    },
    changeStatus( state, data ) {
        state.isLogin = data || false
        // 更新cookie数据
        Cookies.set('isLogin', data || false)
    }
}

export default {
    state,
    actions,
    mutations
}