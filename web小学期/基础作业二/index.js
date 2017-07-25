/*

You can feel free to modify the exsisting codes.

You should ensure all functions (or classes) will be submitted are in global
scope.

If you have any question, you can ask in our course wechat group.

*/

'use strict';

function count(array) {
  var out = {
    'boolean': 0,
    'undefined': 0,
    'number': 0,
    'string': 0
  };
  for (var i in array) {
    let ele = array[i];
    if (typeof ele !== 'object') {
      out[typeof ele] += 1;
    }
    else {
      let y = count(ele);
      for (var i in y) {
        out[i] += y[i];
      }
    }
  }
  return out;
}
 console.log((count([1, [2, false]])));
// console.log(count([[2, [true, 4]], true, [2, false]]));

function isIPv4(s) {
   var regexp=/^(?:\d|[1-9]\d|1\d\d|2[0-4][0-9]|25[0-5]\.){3}\d|[1-9]\d|1\d\d|2[0-4][0-9]|25[0-5]$/;
   if(s.search(regexp)<0)
      return false;
   else return true; 
}
// console.log(isIPv4('166.111.4.100'));
// console.log(isIPv4('isIPv4=null;'));
//var input = {'a': 123, 'ab': 4567, 'abc': 890};
/*function mapper(k1, v1) {
  return [[k1, v1], [k1 + 'b', v1 + 10], [k1 + 'c', v1 + 20]];
}
*/
function map(mapper, input) {
  var mapperout=[];
  for (var i in input) 
  {  
     mapperout=mapperout.concat(mapper(i,input[i]));
  }
  var out={};
  for (var i in mapperout) 
    {
     var ele=mapperout[i];
     if(out[ele[0]]===undefined)
       out[ele[0]]=[ele[1]];
     else 
       out[ele[0]]=out[ele[0]].concat(ele[1]);
    }
  return out;
}

//console.log(map(mapper,input));
// var maptmp=map(mapper,input);
/*function reducer(k2, v2s) {
  var ans = 0;
  for (var i = 0; i < v2s.length; ++i) {
    ans += v2s[i];
  }
  return [k2 + '_out', ans];
}
*/

function reduce(reducer,maptmp)
{
  var reducerout=[];
  for (var i in maptmp) {
    reducerout=reducerout.concat([reducer(i,maptmp[i])]);
  }
  var out={};
  for (var i in reducerout) {
    var ele=reducerout[i];
     if(out[ele[0]]===undefined)
       out[ele[0]]=ele[1];
     else 
       out[ele[0]]=out[ele[0]]+ele[1];
  }
  return out;
}
//console.log( reduce(reducer, maptmp));


function stringIterator(s) {
  // you can modify funciton to class
  // TODO:
  var nextIndexout=0; 
  this.hasNext=function()
  {
     if(s[nextIndexout]===undefined)
        return false;
     else{
       nextIndexout++;
       return true;
     }       
  }
   this.nextValue=function()
   {
    var y=nextIndexout-1; 
    return s[y];
   }
  this[Symbol.iterator]=function(){
    var nextIndex=0;
    return {
        next: function()
        {
            return nextIndex < s.length ?
                {value: s[nextIndex++], done: false} :
                {done: true};
        }
    }
  }
}
//   var iterator = new stringIterator('我爱前端课！');
// while(iterator.hasNext()){
//     console.info(iterator.nextValue());
// }
// var sentence = new stringIterator('我爱前端课！');
// for(let char of sentence){
//     console.info(char);
// }


function equal(o1, o2) {
  if(typeof o1===typeof o2)
    return o1===o2;
  if((o1.length===0 &&typeof o2===undefined)
    ||(typeof o1===undefined&&typeof o2.length=== 0 ))
   return true;
  if(typeof o1==='number' &&typeof o2===('string'||'boolean'))
    return o1=== Number(o2);
  if(typeof o1===('string'||'boolean') && typeof o2==='number')
    return Number(o1)===o2;
  if(typeof o1===('string'||'number'||'symbol')&&(typeof o2==='object'))
    return o1===o2.valueof;
  if(typeof o2===('string'||'number'||'symbol')&&(typeof o1==='object'))
    return o2===o1.valueof;
  return false;  
}
