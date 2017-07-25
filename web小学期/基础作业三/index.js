function jquery(para)
{   
    var parray;
    if(typeof para=== 'string')
       {
            if(para.match(/.*\[.*\=.*\]/))
                {
                    parray=para.split(/\[|\=|\^\=|\&\=|\*\=|\]/);
                    para=para.replace(parray[2],'\"'+parray[2]+'\"');
                }
                
            this.maches=Array.from(document.querySelectorAll(para));
       }
    else if(para instanceof NodeList )
        this.maches=Array.from(para);
    else if(para instanceof Array)
        this.maches=para;
    else this.maches=[para];
  
}


jquery.prototype.attr=function(strname,strvalue){
    if(strvalue===undefined)
     return this.maches[0]===undefined ? undefined : this.maches[0].getAttribute(strname);
    else
     this.maches.forEach( (element) => {
         element.setAttribute(strname,strvalue);
        });
    return this;
}

var j=$;
var $=(para)=>new jquery(para);

jquery.prototype.noConflict=function(){
    $=j;
}

jquery.prototype.get=function(index){
    if(index===undefined)
      return this.maches;
    else
      return this.maches[index]===undefined ? undefined :this.maches[index];
}

jquery.prototype.prop=function(str){
    if(this.maches[0]!==undefined && this.maches[0].getAttribute(str))
      return true
    else return false;

}

jquery.prototype[Symbol.iterator]=function(){
    var nextIndex=0;
    return {
        next: ()=>
        {
            return nextIndex < this.maches.length ?
                {value: this.maches[nextIndex++], done: false} :
                {done: true};
        }
    }
}

jquery.prototype.addClass=function(para){
    if(typeof para==='string')
       para.split(' ').forEach((str)=> {
          this.maches.forEach((element)=> {
              element.classList.add(str);
          });   
       });
    else
       this.maches.forEach((element, index) => {
            param.call(element, index, element.className).split(' ').forEach((str) => {
                element.classList.add(str);
            });
        })
}

jquery.prototype.each = function (fun) {
    this.maches.forEach((element, index) => {
        fun.call(element, index, element);
    })
}

