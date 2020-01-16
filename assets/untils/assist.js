// 判断参数是否是其中之一
export function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }
    return false
}
 // 封装localstorage
 export class Storage {
    constructor(props) {
      console.log(props)
      this.props = props || {}
      this.source = this.props.source || window.localStorage
      this.initRun()
    }
    initRun () {
      const reg = new RegExp('__expires__')
      let data = this.source
      let list = Object.keys(data)
      if (list.length > 0) {
        list.map(key => {
          if (!reg.test(key)) {
            let now = Date.now()
            let expires = data[`${key}__expires__`] || Date.now + 1
            if (now >= expires ) {
              this.remove(key)
            }
          }
          return key
        })
      }
    }
    get(key) {
      const source = this.source,
      expired = source[`${key}__expires__`] || Date.now + 1
      const now = Date.now()
      if ( now >= expired ) {
        this.remove(key)
        return
      }
      const value = source[key] ? JSON.parse(source[key]) : source[key]
      return value
    }
    set(key, value, expired) {
      let source = this.source
      source[key] = JSON.stringify(value)
      if (expired) {
          source[`${key}__expires__`] = Date.now() + 1000*60 * expired
      }
      return value
    }
    remove(key) {
      const data = this.source,
       value = data[key]
      delete data[key]
      delete data[`${key}__expires__`]
      return value
    }
  }