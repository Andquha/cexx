<?php
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $massage = $_POST['massage'];
        // Сообщение
    $message = "Имя: $name\r\nТелефон: $phone\r\nСообщение: $massage";
        // На случай если какая-то строка письма длиннее 70 символов мы используем wordwrap()
    $message = wordwrap($message, 70, "\r\n");

    // Отправляем
    mail('shveiniycehh@gmail.com', 'Заявка', $message, 'Reply-To:'.$email.'');
?>