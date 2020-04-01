import request from '@/utils/request'

export function getRoleList(data) {
  return request({
    url: '/api/role/index',
    method: 'post',
    data
  })
}

export function getRoleAll(data) {
  return request({
    url: '/api/role/all',
    method: 'post',
    data
  })
}

export function getRoleDetail(id) {
  return request({
    url: '/api/role/show/' + id,
    method: 'get',
    params: {}
  })
}

export function createRole(data) {
  return request({
    url: '/api/role/store',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/api/role/update/' + data.id,
    method: 'post',
    data
  })
}

export function destroyRole(id) {
  return request({
    url: '/api/role/destroy/' + id,
    method: 'post',
    data: {}
  })
}
