// 创建state源
const state = () => ({
    UserToken: '', // 用户token
})

// 创建异步action数据
const action = {
    nuxtServerInit ({ commit }, { req }) {
        console.log(req);
    },
    
    login({ commit, state }) {
       
    }
}

const mutations = {
    changeUserToken ({ commit, state }) {
    }
}

export default {
    state,
    action,
    mutations
}