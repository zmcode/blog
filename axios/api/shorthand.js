import axiosTool from '../index.js'

// 发布接口
export const publishShortHand = params => {
  return axiosTool.httpServer(
      {
          url: '/shorthand/publish',
          method: 'post'
      },
      params
  )
}

// 速记列表
export const ShortHandList = params => {
  return axiosTool.httpServer(
      {
          url: '/shorthand/list',
          method: 'get'
      },
      params
  )
}

// 模糊搜索
export const ShortHandSearch = params => {
  return axiosTool.httpServer(
      {
          url: '/shorthand/search',
          method: 'get'
      },
      params
  )
}
