import { cateGory } from '../axios/api/common'

export const actions = {
    getCateGory () {
        return new Promise((resolve, reject) => {
            cateGory()
                .then(res => {
                    console.log(res, 'res')
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}