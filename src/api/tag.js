import request from '@/utils/request'

export function getTagList(data) {
  return request({
    url: '/api/tag/index',
    method: 'post',
    data
  })
}

export function getTagAll(query) {
  return request({
    url: '/api/tag/all',
    method: 'get',
    params: query
  })
}

export function getTagDetail(id) {
  return request({
    url: '/api/tag/detail',
    method: 'get',
    params: {}
  })
}

export function createTag(data) {
  return request({
    url: '/api/tag/store',
    method: 'post',
    data
  })
}

export function updateTag(data) {
  return request({
    url: '/api/tag/update/' + data.id,
    method: 'post',
    data
  })
}

export function destroyTag(id) {
  return request({
    url: '/api/tag/destroy/' + id,
    method: 'post',
    data: {}
  })
}
