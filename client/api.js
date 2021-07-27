import request from 'superagent'

const worksUrl = '/api/v1/works/'

export function getScheduledWorks() {
  return request
    .get(worksUrl)
    .then(response => response.body)
}
