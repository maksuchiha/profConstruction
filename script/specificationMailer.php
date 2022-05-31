<?php

$post = json_decode(file_get_contents('php://input'), true);


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './mailer/Exception.php';
require './mailer/PHPMailer.php';
require './mailer/SMTP.php';


$mail = new PHPMailer(true);

try {
    //Server settings
//    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = 'smtp.yandex.ru';                                 //SMTP почты
    $mail->SMTPAuth = true;
    $mail->Username = 'unipikweb@yandex.ru';                     //login
    $mail->Password = 'enkokiboqbwnbphi';                           //pass
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;                                              //порт почты
    $mail->CharSet = "utf-8";
    //Recipients
    $mail->setFrom('unipikweb@yandex.ru', 'Профстрой');              // от кого
    $mail->addAddress('sale@unipik.ru');                           // кому

    //Content
    $mail->isHTML(true);
    $mail->Subject = 'Заголовок письма';                         // тема сообщения
    $mail->Body = sprintf('email: %s, <br> имя: %s, <br> телефон: %s, <br> высота: %s, <br> ширина: %s, <br> длина: %s, <br> место: %s, <br> монтаж: %s, <br> материал: %s', $post['email'] ?? '', $post['name'] ?? '', $post['phone'] ?? '', $post['height'] ?? '', $post['width'] ?? '', $post['length'] ?? '', $post['place'] ?? '', $post['mounting'] ?? '', $post['material'] ?? '');

    $mail->send();
    echo json_encode(['nice' => 'ok']);
} catch (Exception $e) {
    echo 'not-ok';
}