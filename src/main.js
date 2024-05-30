import count from './js/count'
import sum from './js/sum'

import './css/index.css'
import './less/index.less'

// var result1 = count(2, 1)
let result = count(2, 1)
console.log('log--->result', result)

console.log('log--->sum', sum(1, 4, 6))
console.log('log--->count', count(5, 2))
if (module.hot) {
  // 热模块替换之后做哪些事情,实际开发会用vue-loader，react-hot-loader
  module.hot.accept('./js/count', () => {
    console.log('count')
  })
  module.hot.accept('./js/sum', () => {
    console.log('sum-----')
  })
}

document.getElementById('btn').onclick = function () {
  // import('./js/count2')
  //   .then((res) => {
  //     console.log('log--->ok', res.default(3, 5))
  //   })
  //   .catch((err) => {
  //     console.log('log--->no')
  //   })

  import(/* webpackChunkName: "math"  */ './js/math')
    .then(({ mul }) => {
      console.log('log--->ok', mul(3, 5))
    })
    .catch((err) => {
      console.log('log--->no')
    })
}
