$(document).ready(function(){
});



$('.main_form_box_content_form').submit(function(event){
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
    let formReq = document.querySelectorAll('._req');

    for (let i = 0; i < formReq.length; i++) {
        const input = formReq[i];
        formRemoveError(input);
        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                console.log(emailTest(input));
                formAddError(input);
                mail++;
            }
        } else if (input.getAttribute('type') === "checkbox" && input.checked === false) {
            formAddError(input);
            error++;
        } else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
    }
    return [error, mail];
}
//Ставим ошибки
function formAddError(item) {
    item.parentElement.classList.add('error');
    item.classList.add('error');
}
//Cнимаем ошибки
function formRemoveError(item) {
    item.parentElement.classList.remove('error');
    item.classList.remove('error');
}
//Проверка почты
function emailTest(item) {
    console.log(item.value)
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(item.value);
}