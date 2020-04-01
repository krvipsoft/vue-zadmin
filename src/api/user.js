import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: '/api/user/index',
    method: 'post',
    data
  })
}

export function getUserDetail(id) {
  return request({
    url: '/api/user/detail',
    method: 'get',
    params: {}
  })
}

export function createUser(data) {
  return request({
    url: '/api/user/store',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/api/user/update/' + data.id,
    method: 'post',
    data
  })
}

export function destroyUser(id) {
  return request({
    url: '/api/user/destroy/' + id,
    method: 'post',
    data: {}
  })
}
