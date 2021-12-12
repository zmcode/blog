import { GetArticlelist } from '../axios/api/article'

export const actions = {
    getArticle (store, data) {
        // console.log(data, 'data') 
        return new Promise((resolve, reject) => {
            
            GetArticlelist(data)
                .then(res => {
                    resolve(res)
                })  
                .catch(err => {
                    reject(err)
                })
        })
    }
}