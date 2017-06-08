import { MESSAGES, NUM_AVATARS, NUM_IMAGES } from './wechat-data'

const INIT_TIME = new Date().getTime()
let msgIndex = 0

function pickRandom (a) {
  return a[Math.floor(Math.random() * a.length)]
}

export function getItem (index) {
  return new Promise(resolve => {
    var item = {
      show: true,
      id: index,
      avatar: 'static/images/avatar' + Math.floor(Math.random() * NUM_AVATARS) + '.jpg',
      self: Math.random() < 0.1,
      image: Math.random() < 1.0 / 20 ? 'static/images/image' + Math.floor(Math.random() * NUM_IMAGES) + '.jpg' : '',
      time: new Date(Math.floor(INIT_TIME + msgIndex * 20 * 1000 + Math.random() * 20 * 1000)),
      message: pickRandom(MESSAGES)
    }
    if (item.image === '') {
      return resolve(item)
    }
    var image = new Image()
    image.src = item.image
    image.addEventListener('load', () => {
      resolve(item)
    })
    image.addEventListener('error', () => {
      item.image = ''
      resolve(item)
    })
  })
}

const MAX = 1000

export function fetch (limit, skip) {
  limit = Math.max(30, limit)
  limit + skip > MAX ? limit -= (skip + limit) - MAX : limit
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var items = []
      for (var i = 0; i < limit; i++) {
        items[i] = getItem(skip + i)
      }
      resolve(Promise.all(items))
    }, 500)
  })
  .then(list => {
    return {
      list: list,
      count: 1000
    }
  })
}
