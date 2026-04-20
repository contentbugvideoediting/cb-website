/* Content Bug CSS Injector — synchronous XHR (GHL-proof) */
(function(){
  try{
    var x=new XMLHttpRequest();
    x.open('GET','https://api.contentbug.io/website/design-system.css',false);
    x.send();
    if(x.status===200){
      var s=document.createElement('style');
      s.textContent=x.responseText;
      document.head.appendChild(s);
    }
  }catch(e){}
  document.body.classList.add('ws-page');
})();
