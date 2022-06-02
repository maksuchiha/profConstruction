<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './mailer/Exception.php';
require './mailer/PHPMailer.php';
require './mailer/SMTP.php';

function validateFile(array $file = null)
{
    if (empty($file['name'])) {
        return false;
    }
    try {
        // Undefined | Multiple Files | $_FILES Corruption Attack
        // If this request falls under any of them, treat it invalid.
        if (!isset($file['error']) || is_array($file['error'])) {
            throw new RuntimeException('Invalid parameters.');
        }

        switch ($file['error']) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_NO_FILE:
                throw new RuntimeException('No file sent.');
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                throw new RuntimeException('Exceeded filesize limit.');
            default:
                throw new RuntimeException('Unknown errors.');
        }

        // You should also check filesize here.
        if ($file['size'] > 1000 * 1000 * 100) {
            throw new RuntimeException('Exceeded filesize limit.');
        }
        return true;
    } catch (RuntimeException $e) {
        var_dump($e->getMessage());
        return false;
    }
}

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$organization = $_POST['organization'];
$text = $_POST['textarea'];
$file = $_FILES['file'];



// Формирование самого письма
$title = "Заголовок письма";
$body = "
<h2>Новое письмо</h2>
<b>Имя:</b> $name<br>
<b>Организация:</b> $organization<br>
<b>Почта:</b> $email<br>
<b>Телефон:</b> $phone<br><br>
<b>Сообщение:</b><br>$text
";

$mail = new PHPMailer(true);

try {
    //Server settings
//    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = 'smtp.spaceweb.ru';                                 //SMTP почты
    $mail->SMTPAuth = true;
//    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};
    $mail->Username = 'profstroy@unipik.ru';                     //login
    $mail->Password = 'xzkvCBj293hg@9s6';                           //pass
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;                                              //порт почты
    $mail->CharSet = "utf-8";
    //Recipients
    $mail->setFrom('profstroy@unipik.ru', 'Профстрой');              // от кого
    $mail->addAddress('sale@unipik.ru');                           // кому


    if (validateFile($file)) {
        $mail->addAttachment($file['tmp_name'], $file['name']);
    }

    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    // Проверяем отравленность сообщения
    if ($mail->send()) {$result = "success";}
    else {$result = "error";}
} catch (Exception $e) {
    echo $e->getMessage();
}