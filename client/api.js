import request from 'superagent'

const worksUrl = '/api/v1/'

export function getScheduledWorks() {
  return request
    .get(worksUrl + 'works')
    .then(response => response.body)
}

export function getFerryPositions() {
  return request
    .get(worksUrl + 'ferrypositions')
    .then(response => response.body)
}