(function(){
    var me = {}; 

    var form = document.querySelector('.form-container');
    var closeButton = null;

    function onClose(e){
        me.close();
        closeButton.removeEventListener('click', onClose)
    }

    me.open = function(){
        form.classList.remove('is-hidden');
        closeButton = document.querySelector('.form__close-button');
        closeButton.addEventListener('click', onClose) 
    };
    
    me.close = function(){
        form.classList.add('is-hidden');
    };
    
    me.isValid = function(){

        var requiredFields = document.querySelectorAll('[data-valid="required"]');

        var emailValue = document.querySelector('[type=email]').value;

        var numberValue = document.querySelector('[type=tel]').value;

        if(!me.isAllCompleted(requiredFields)){
            console.log('Word all');
            return false;
        }else if (!is.validation.isEmail(emailValue)) {
            console.log('Not valid email');
            return false;
          } else if (!is.validation.isNumber(numberValue)) {
            console.log('Not valid phone');
            return false;
          }
        return true;
    };

    me.isAllCompleted = function(data) {
        var result = true;
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            if (!is.validation.isNotEmpty(data[i].value)) {
            result = false;
            break;
            }
        }
        return result;

    }

    is.form = me;
}());