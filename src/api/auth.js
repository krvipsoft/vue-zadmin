import request from '@/utils/request'

export function authLogin(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

export function authInfo(data) {
  return request({
    url: '/api/auth/info',
    method: 'post',
    data
  })
}

export function authLogout(data) {
  return request({
    url: '/api/auth/logout',
    method: 'post',
    data
  })
}
