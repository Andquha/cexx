$(document).ready(function(){
    $('.main_form_input_item').on("click", function() {  //Нужно вставить свой класс

        $(this).children('.main_form_input').focus();  //Нужно вставить свой класс

        var input = $(this).children('.main_form_input');   //Нужно вставить свой класс
        var inputLetter = input.next('.input_box').children('.input_letter');
        var tag = inputLetter.children('.tag');
        tag.removeClass('error');
        tag.addClass('focus');
        onFocus(input, tag);
        $(this).children('.main_form_input').on("change keyup input click", function() {
            var string = $(this);
            var stringarr = $(this).val().split("");
            var inp = inputLetter.children('.letter');

            if(lett(string)){
                clear(inp);
                if(stringarr.length > inp.length){
                    let txt = string.val().slice(0, -1);
                    alert("Пожалуйста используйте не больше "+ inp.length + " символов");
                    string.val(txt);
                }else{
                    renderLetter(stringarr, inp);
                }
            }else{
                clear(inp);
            }
        });
    });

    function lett(text){  //Проверяем инпут только на англиские буквы
        var letters = /^[A-Za-z @.]+$/;
        if(text.val().match(letters)){
            return true;
        }else{
            txt = text.val().slice(0, -1)
            text.val(txt);
            // alert("English letters only");
            return false;
        }
    }

    function onFocus(input, tag){   //Ставим фокус на звездочку если он есть
        input.focus(function(){tag.addClass('focus');})
             .blur(function(){tag.removeClass('focus');});
    }
    
    function renderLetter(string, input){   //Прописываем буквы
        for(i=0;i<string.length;i++){
            input[i].innerHTML = string[i];
        }
    }
     
    function clear(input){       //Удаляем буквы
        for(i=0;i<input.length;i++){
            input[i].innerHTML = '';
        }
    }

    $(".tag").each(function () {       //Превращяем img в svg html код
        var $img = $(this);
        var imgClass = $img.attr("class");
        var imgURL = $img.attr("src");
        $.get(imgURL, function (data) {
            var $svg = $(data).find("svg");
            if (typeof imgClass !== "undefined") {
                $svg = $svg.attr("class", imgClass + " replaced-svg");
                $svg.attr("style", "position: absolute;");
            }
            $svg = $svg.removeAttr("xmlns:a");
            if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
                $svg.attr("viewBox", "0 0 " + $svg.attr("height") + " " + $svg.attr("width"))
            }
            $img.replaceWith($svg);
        }, "xml");
    });
});



$('.main_form').submit(function(event){
    event.preventDefault();
    let errors = formValidate($(this));
    let error = errors[0];
    let mail = errors[1];
    console.log(errors);
    if(error === 0){
        if(mail === 0){

        }else{
            alert('В поле "Your E-mail" обезательно нужны "@" и "."')
        }
    }else{
        alert('Заполните все обезательные поля')
    };
});

//Проверяем заполнена ли форма
function formValidate(form) {
    let mail = 0;
    let error = 0;
    let formReq = form.children('._item').children('._req')
    let tags = form.children('._item').children('.input_box').children('.input_letter').children('.tag');

    for (let i = 0; i < formReq.length; i++) {
        const tag = tags[i]
        const input = formReq[i];
        console.log(input.value)
        formRemoveError(input, tag);
        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                console.log(emailTest(input));
                formAddError(input, tag);
                mail++;
            }
        } else if (input.getAttribute('type') === "checkbox" && input.checked === false) {
            formAddError(input, tag);
            error++;
        } else {
            if (input.value === '') {
                formAddError(input, tag);
                error++;
            }
        }
    }
    return [error, mail];
}
//Ставим ошибки
function formAddError(item, tag) {
    tag.classList.add('error');
    item.parentElement.classList.add('error');
    item.classList.add('error');
}
//Cнимаем ошибки
function formRemoveError(item, tag) {
    tag.classList.remove('error');
    item.parentElement.classList.remove('error');
    item.classList.remove('error');
}
//Проверка почты
function emailTest(item) {
    console.log(item.value)
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(item.value);
}