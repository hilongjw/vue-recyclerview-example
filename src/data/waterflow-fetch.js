import { NUM_IMAGES } from './wechat-data'

let id = 0

export function getItem () {
  return new Promise(resolve => {
    var item = {
      id: ++id,
      image: 'static/images/image' + Math.floor(Math.random() * NUM_IMAGES) + '.jpg'
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

export function fetch (count, items) {
  count = Math.max(30, count)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var items = []
      for (var i = 0; i < Math.abs(count); i++) {
        items[i] = getItem()
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
