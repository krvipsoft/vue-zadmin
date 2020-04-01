import request from '@/utils/request'

export function getArticleList(data) {
  return request({
    url: '/api/article/index',
    method: 'post',
    data
  })
}

export function getArticleDetail(id) {
  return request({
    url: '/api/article/show/' + id,
    method: 'post',
    data: {}
  })
}

export function createArticle(data) {
  return request({
    url: '/api/article/store',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/article/update/' + data.id,
    method: 'post',
    data
  })
}

export function destroyArticle(id) {
  return request({
    url: '/api/article/destroy/' + id,
    method: 'post',
    data: {}
  })
}

