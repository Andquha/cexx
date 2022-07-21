$(document).ready(function () {
    $('.main_advantage_box_content_slider').slick({
      adaptiveHeight: true,
      slidesToShow: 4,
      slidestoScroll: 1,
      speed: 1000,
      easing: 'ease',
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      swipe: true,
      nextArrow: '.main_advantage_box_content_slider_arrows_right',
      prevArrow: '.main_advantage_box_content_slider_arrows_left',
      responsive:[
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            }
        }
      ]
    });
  });



const form = $('#form');
const formshow = $('#formshow');

form.submit(function(event){
    event.preventDefault();
        let Form = $(this);
        let errors = formValidate(Form);
        let error = errors[0];
        let mail = errors[1];
        console.log(errors);
        if(error === 0){
            if(mail === 0){
                Form.addClass('sending');
                $('body').addClass('active');
                $.ajax({
                    type: Form.attr('method'),
                    url: Form.attr('action'),
                    data: new FormData(this),
                    contentType: false,
                    cache: false,
                    processData: false,
        
                    success: function(e){
                        $('input').val('');
                        $('textarea').val('');
                        alert('Спасибо! Письмо отправленно')
                        Form.removeClass('sending');
                        Form.removeClass('active');
                        document.body.classList.remove("active");
                    }
                })
            }else{
                alert('В поле "Your E-mail" обезательно нужны "@" и "."')
            }
        }else{
            alert('Заполните все обезательные поля')
        };
});
formshow.submit( function(event){
        event.preventDefault();
        let Form = $(this);
        let errors = formValidate(Form);
        let error = errors[0];
        let mail = errors[1];
        console.log(errors);
        if(error === 0){
            if(mail === 0){
                Form.addClass('sending');
                $('body').addClass('active');
                $.ajax({
                    type: Form.attr('method'),
                    url: Form.attr('action'),
                    data: new FormData(this),
                    contentType: false,
                    cache: false,
                    processData: false,
        
                    success: function(e){
                        $('input').val('');
                        $('textarea').val('');
                        alert('Спасибо! Письмо отправленно')
                        Form.removeClass('sending');
                        $('.main_form_box_show').removeClass('active');
                        document.body.classList.remove("active");
                    }
                })
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
    let formReq = form.children('._req');

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

// Кнопка меню
let button = $('.header_menu_button_img');

button.on('click', function(e){
    e.preventDefault();
    if(button.hasClass('active')){
        close();
    }else{
        open();
    }
});

function close(){
    button.removeClass('active');
    $('body').removeClass('active');
    $('.header_menu_list').removeClass('active');
};
function open(){
    button.addClass('active');
    $('body').addClass('active');
    $('.header_menu_list').addClass('active');
};

// Кнопки Faq
let faq = $('.main_faq_box_question_item');

faq.on('click', function(e){
    e.preventDefault();
    if($(this).hasClass('active')){
        faq.removeClass('active');
        faq.children().removeClass('active');
    }else{
        faq.removeClass('active');
        faq.children().removeClass('active');
        $(this).addClass('active');
        $(this).children().addClass('active');
    }
});

// Каталог
const img = $('.main_production_box_item_img')
const h = $('.main_production_box_item_h');

img.on('mouseover', function(e){
    img.parent().css({"background-color": "#fff"});
    h.css({"color": "#000"});
    $(this).parent().css({"background-color": "#000"})
    $(this).siblings('.main_production_box_item_h').css({"color": "#fff"})
});
img.on('mouseout', function(e){
    img.parent().css({"background-color": "#fff"});
    h.css({"color": "#000"});
});

h.on('mouseover', function(e){
    h.parent().css({"background-color": "#fff"});
    h.css({"color": "#000"});
    $(this).parent().css({"background-color": "#000"})
    $(this).css({"color": "#fff"})
});
h.on('mouseout', function(e){
    h.parent().css({"background-color": "#fff"});
    h.css({"color": "#000"});
});

img.on('click', function(e){
    e.preventDefault();
    $('body').addClass('active');
    $('.main_form_box_show').addClass('active');
});
h.on('click', function(e){
    e.preventDefault();
    $('body').addClass('active');
    $('.main_form_box_show').addClass('active');
});

$('.footer_container_box_social_button').on('click', function(e){
    e.preventDefault();
    $('body').addClass('active');
    $('.main_form_box_show').addClass('active');
});

$('.main_form_box_show_content_img_close').on('click', function(e){
    e.preventDefault();
    $('body').removeClass('active');
    $('.main_form_box_show').removeClass('active');
});


// Скролл на кнопках 
$('a[href^="#"]').on("click", function () {
    let href = $(this).attr("href");

    close();

    $("html, body").animate({
        scrollTop: $(href).offset().top - 30
    }, {
        duration: 370,   // по умолчанию «400»
        easing: "linear" // по умолчанию «swing»
    });
    return false;
});