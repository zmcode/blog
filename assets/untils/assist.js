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
      this.props = props || {}
      this.source = this.props.source || window.localStorage
      this.initRun()
    }
    initRun () {
      let data = this.source
      let now = Date.now()
      let datas = data['articleReaded']
      if (datas) {
        Array.from(JSON.parse(datas)).forEach((item, index) => {
          if (now > item.expires) {
            this.remove(index)
          }
        })
      }
    }
    get(key) {
      const source = this.source
      const value = source[key] ? JSON.parse(source[key]) : source[key]
      return value
    }
    set(key, value) {
      let source = this.source
      source[key] = JSON.stringify(value)
    }
    remove(index) {
      const data = this.source
      let datas = data['articleReaded']
      const newArr = Array.from(JSON.parse(datas)).filter((item, now) => {
        return now !== index
      })
      data['articleReaded'] = JSON.stringify(newArr)
    }
  }