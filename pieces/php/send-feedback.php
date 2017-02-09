<?php
    $recepient = "i@dpripa.com";
    $sitename = "Project Name";

    $name = trim($_POST["name"]);
    $phone = trim($_POST["phone"]);

    $message = "Имя: $name \nТелефон: $phone";

    $pagetitle = "Заказ обратного звонка с сайта \"$sitename\"";
    mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
?>