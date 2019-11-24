import cookieParse from 'cookie-parse'
export const actions = {
    nuxtServerInit(store, { req }) {
        if (req.headers.cookie && process.server) {
            const cookie = req.headers.cookie || ''
            const res = cookieParse.parse(cookie)
            store.commit('login/changeUserInfo', {
                userInfo: JSON.parse(res.userinfo).userInfo
            })
            store.commit('login/changeUserToken', {
                token: res.token || ''
            })
        }
    }
}
