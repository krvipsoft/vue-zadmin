import request from '@/utils/request'

export function getCategoryList(data) {
  return request({
    url: '/api/category/index',
    method: 'post',
    data
  })
}

export function getCategoryAll(query) {
  return request({
    url: '/api/category/all',
    method: 'get',
    params: query
  })
}

export function getCategoryDetail(id) {
  return request({
    url: '/api/category/show/' + id,
    method: 'get',
    params: {}
  })
}

export function createCategory(data) {
  return request({
    url: '/api/category/store',
    method: 'post',
    data
  })
}

export function updateCategory(data) {
  return request({
    url: '/api/category/update/' + data.id,
    method: 'post',
    data
  })
}

export function destroyCategory(id) {
  return request({
    url: '/api/category/destroy/' + id,
    method: 'post',
    data: {}
  })
}
