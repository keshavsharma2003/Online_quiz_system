export const fn = (function(){
      var count = 0;
  return function autoNumber(){
      count++;
      return count;
  }
  })();