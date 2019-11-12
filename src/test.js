import { getInfos } from './lib/jquery.test';
console.log('2')
getInfos('test');

import { Add } from './lib/math.extend'
let addResult = Add(1, 3);
console.log('Add(1, 3):', addResult);
console.log('Add(x, y):', Add(2, 4));