import axiosTool from '../index.js'
export const publishCodeShare= params => {
  return axiosTool.httpServer(
    {
      url: '/codeshare/publish',
      method: 'post'
    },
    params
  )
}

export const CodeShareList = params => {
  return axiosTool.httpServer(
    {
      url: '/codeshare/list',
      method: 'get'
    },
    params
  )
}

export const CodeShareSearch = params => {
  return axiosTool.httpServer(
    {
      url: '/codeshare/search',
      method: 'get'
    },
    params
  )
}