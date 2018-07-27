(function(){
    
    var openFormButton = document.querySelector('.arrow-down');
    var nav = document.querySelector('.nav');
    
   

    if(openFormButton){
        openFormButton.addEventListener('click', function(e){
            e.preventDefault();
            is.form.open(); 
        })
    }

    var form = document.querySelector('.form');

    if(form){
        form.addEventListener('submit', function(e){
            e.preventDefault();
            if(is.form.isValid()){
                console.log("good");
            }else{
                console.log("not valid");
            }
            
        })
    }

    if (nav) {
        nav.addEventListener('click', function (e) {
          var target = e.target;
          if (target.tagName.toLowerCase() !== 'a') {
            return;
          }
          e.preventDefault();
          is.navigation.toggleToActiveLink(target);
        });
      }
}());