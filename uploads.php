<?php
/**
 * Created by PhpStorm.
 * User: clement
 * Date: 22/04/17
 * Time: 09:52
 */

$dir = 'storage/uploads';

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