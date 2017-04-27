<?php
/**
 * Created by PhpStorm.
 * User: clement
 * Date: 22/04/17
 * Time: 09:52
 */

$dir = 'storage/uploads';
$mail_from_name = 'Fermalux';
$mail_from = 'fermalux@misterjekyll.com';
$mail_subject = 'Votre fichier ci-joint';
$mail_html = '<a href="http://www.fermalux.be">
<img src="http://www.fermalux.be/images/skins/fermalux2016/images/logo.png" alt="Fermalux">
</a><br><br>
Cher client,<br><br>
Nous avons le plaisir de vous faire parvenir le document demandé ci-joint.<br><br>
Cordialement,<br>
L\'équipe Fermalux<br>
';


/////////////////////////////////////

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
$path = realpath('./'.$dir);

if (isset($_GET['blob_from_url'])) {

    $filename = str_replace((isset($_SERVER['HTTPS'])?'https://':'http://').$_SERVER['HTTP_HOST'].'/'.$dir,'',$_GET['blob_from_url']);
    $file = $path.$filename;
    $return = new stdClass();
    if (file_exists($file)) {
        $file_bin = file_get_contents($file);
        $file_base64 = base64_encode($file_bin);
        $return->success = true;
        $return->file = $file_base64;
    } else {
        $return->success = false;
    }
    exit(json_encode($return));

} else if (isset($_GET['mail_from_url'])) {

    $filename = str_replace((isset($_SERVER['HTTPS'])?'https://':'http://').$_SERVER['HTTP_HOST'].'/'.$dir,'',$_GET['mail_from_url']);
    $file = $path.$filename;
    $return = new stdClass();
    if (file_exists($file)) {
        if (filesize($file)>20000000) { // 20mb
            // do something else?
            $return->success = false;
        } else {
            require 'class.phpmailer.php';
            $mail = new PHPMailer;
            //$mail->SMTPDebug = 3;
            $mail->setFrom($mail_from, $mail_from_name);
            $mail->addAddress($_GET['t']);
            $mail->addAttachment($file);
            $mail->isHTML(true);
            $mail->Subject = $mail_subject;
            $mail->Body    = $mail_html;
            $mail->AltBody = strip_tags($mail_html);
            if (!$mail->send()) {
                $return->success = false;
                $return->error = $mail->ErrorInfo;
            } else {
                $return->success = true;
            }
        }
    } else {
        $return->success = false;
    }
    exit(json_encode($return));

} else {
    $files = array();
    foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path, RecursiveDirectoryIterator::SKIP_DOTS)) as $file)
    {
        $filename = $file->getFilename();
        if (substr($filename,0,1)=='.') continue;

        // exclude ext?
        $ext = $file->getExtension();

        // size
        $size = $file->getSize();

        // date
        $date = $file->getMTime();

        // folder?
        $fpath = $file->getPath();
        $folder = trim(str_replace($path, '', $fpath));
        if (strlen($folder)>0) {
            if (substr($folder,0,1)=='/') $folder = substr($folder, 1);
            $filename = $folder.'/'.$filename;
        }

        $files[$date][] = array('slug'=>$filename.'-'.$date.'-'.$size, 'url'=>(isset($_SERVER['HTTPS'])?'https://':'http://').$_SERVER['HTTP_HOST'].'/'.$dir.'/'.$filename);
        //echo $filename .'-'. $date .'-'. $size . "\n";
    }
    krsort($files);
    $files = call_user_func_array('array_merge', $files);
    $files_json = json_encode($files);
    exit($files_json);
}