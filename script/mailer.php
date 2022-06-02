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
    $mail->Host = 'smtp.spaceweb.ru';                                 //SMTP почты
    $mail->SMTPAuth = true;
    $mail->Username = 'profstroy@unipik.ru';                     //login
    $mail->Password = 'xzkvCBj293hg@9s6';                           //pass
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;                                              //порт почты
    $mail->CharSet = "utf-8";
    //Recipients
    $mail->setFrom('profstroy@unipik.ru', 'Профстрой');              // от кого
    $mail->addAddress('sale@unipik.ru');                           // кому

    //Content
    $mail->isHTML(true);
    $mail->Subject = 'Заголовок письма';                         // тема сообщения
    $mail->Body = sprintf('email: %s, <br> имя: %s, <br> телефон: %s', $post['email'] ?? '', $post['name'] ?? '', $post['phone'] ?? '');

    $mail->send();
    echo json_encode(['nice' => 'ok']);
} catch (Exception $e) {
    echo $e->getMessage();
}