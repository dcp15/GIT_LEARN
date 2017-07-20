var test = function (testcase) {

  function subtest(original_string, call_with_new) {
    var result = {
      es6_flavored: true,
      java_flavored: true
    };


    // es6-flavored
    var output;
    try {
      output = [];
      var sentence;
      if(call_with_new){
        sentence = new stringIterator(original_string);
      }else{
        sentence = stringIterator(original_string);
      }
      for (let char of sentence) {
        output.push(char);
      }
      assert.strictEqual(output.join(','), testcase.split('').join(','));
    } catch (e) {
      result.es6_flavored = false;
    }


    // java-flavored
    try {
      output = [];
      var iterator;
      if(call_with_new){
        iterator = new stringIterator(original_string);
      }else{
        iterator = stringIterator(original_string);
      }
      while (iterator.hasNext()) {
        output.push(iterator.nextValue());
      }
      assert.strictEqual(output.join(','), testcase.split('').join(','));
      
    } catch (e) {
      result.java_flavored = false;
    }
    return result;
  }

  //call with new
  var result_with_new = subtest(testcase, true);

  //call without new
  var result_without_new = subtest(testcase, false);
  
  var result = {};
  for (let key of ['es6_flavored', 'java_flavored']) {
    result[key] = result_with_new[key] || result_without_new[key];
  };

  assert.strictEqual(true, result.java_flavored);
  assert.strictEqual(true, result.es6_flavored); // 选做项

}

test('我爱前端课！');
test('hello, world');
