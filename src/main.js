import count from './js/count'
import sum from './js/sum'

import './css/index.css'
import './less/index.less'

// var result1 = count(2, 1)
let result = count(2, 1)
console.log('log--->result', result)

console.log('log--->sum', sum(1, 4, 6))
console.log('log--->count', count(5, 2))
