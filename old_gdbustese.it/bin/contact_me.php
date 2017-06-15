<?php
// check if fields passed are empty
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
	
// create email body and send it	
$to = 'gdbustese@gmail.com'; // put your email
$email_subject = "Contatto inviato da:  $name";
$email_body = "Abbiamo ricevuto un nuovo messaggio dal sito. \n\n".
				  " Ecco i dettagli:\n \nNome: $name \n ".
				  "Email: $email_address\n Messaggio \n $message";
$headers = "Da: contacts@gdbustese.it\n";
$headers .= "Rispondere a: $email_address";	
$params =  "-f miamail@miosito.it";
mail($to,$email_subject,$email_body,$headers,$params);
return true;			
?>