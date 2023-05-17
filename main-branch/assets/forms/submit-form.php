<?php
ob_start();
session_start();


header('Content-type: application/json; charset=UTF-8');



$response = array();
$validation = "";



include 'config.php';
include('UserInfo.php');
include('PHPMailer/class.phpmailer.php');
include('PHPMailer/class.smtp.php');



$ip         = UserInfo::get_ip();

$device     = UserInfo::get_device();

$os         = UserInfo::get_os();

$browser    = UserInfo::get_browser();

$country  = "";
$region   = "";
$city     ="";
$location= "";


date_default_timezone_set('Asia/Kolkata');
$date = date("j F Y, g:i a");
$logo = 'https://puriseleqt.com/assets/img/logo.png';

$response = array();
$validation = "";

if ($_POST) {

    

	 if(!empty($_POST['utm_campaign'])){$utm_campaign = $_POST['utm_campaign'];}else{ $utm_campaign = '';}

    if(!empty($_POST['utm_medium'])){$utm_medium = $_POST['utm_medium'];}else{$utm_medium = '';  }

     if(!empty($_POST['utm_source'])){$utm_source = $_POST['utm_source'];}else{$utm_source = '';}

    if(!empty($_POST['utm_term'])){$utm_term = $_POST['utm_term'];}else{$utm_term = ''; }

     if(!empty($_POST['utm_content'])){$utm_content = $_POST['utm_content'];}else{$utm_content= '';}





	$name = $_POST['name'];

	$email = $_POST['email'];

	$phone = $_POST['mobile'];

	$source = $_POST['source'];

	$page = $_SERVER['HTTP_REFERER'];

    

	if (empty(trim($name))) {

		$validation .= "Please enter name </br>";

	} else if (!preg_match("/^[a-zA-Z ]*$/", $name)) {

		$validation .= "Only letters and white space allowed</br>";

	} else if ($name === "test" || $name === "demo" || $name === "user") {

		$validation .= "Plese Specify valid name</br>";

	}



	if (empty(trim($email))) {

		$validation .= "Please enter email </br>";

	} else {

		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

			$validation .= "Invalid email format <br>";

		}

	}



	if (empty($phone)) {

		$validation .= "Please enter phone </br>";

	} else if (!is_numeric($phone)) {

		$validation .= "Please enter only digits !</br>";

	} else if (!preg_match("/^[7890]\d{9}/", $phone)) {

		$validation .= "Please enter valid number</br>";

	} else if (strlen($phone) > 10) {

		$validation .= "phone less than 10 digits only ! </br>";

	}



	if (!empty($validation)) {

		$response['status'] = 'error';

		$response['message'] = $validation;

		echo json_encode($response);

		exit();

	}





	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$sql = $conn->prepare("INSERT INTO purileads (name, email, mobile, source, ip, device, os, browser, utm_source, utm_medium, utm_campaign, utm_content, utm_term)

          values(:name, :email, :mobile, :source, :ip, :device, :os, :browser, :utm_source, :utm_medium, :utm_campaign, :utm_content, :utm_term)");



	$sql->bindParam(':name', $name);

	$sql->bindParam(':email', $email);

	$sql->bindParam(':mobile', $phone);

	$sql->bindParam(':source', $source);

	$sql->bindParam(':ip', $ip);

	$sql->bindParam(':device', $device);

	$sql->bindParam(':os', $os);

	$sql->bindParam(':browser', $browser);

	$sql->bindParam(':utm_source', $utm_source);

	$sql->bindParam(':utm_medium', $utm_medium);

	$sql->bindParam(':utm_campaign', $utm_campaign);

	$sql->bindParam(':utm_content', $utm_content);

	$sql->bindParam(':utm_term', $utm_term);



	if ($sql->execute()) {



		date_default_timezone_set('Asia/Kolkata');

	    $date = date("j F Y, g:i a");

		$mail = new PHPMailer(true); // the true param means it will throw exceptions on errors, which we need to catch



		//$mail->IsSMTP(); // telling the class to use SMTP

		$to = $email;

		$mail->CharSet = "text/html; charset=UTF-8;";

		$mail->Host = "smtpout.secureserver.net	"; // SMTP server

		$mail->SMTPDebug = 0; // enables SMTP debug information (for testing)

		$mail->SMTPAuth = true; // enable SMTP authentication

		$mail->SMTPSecure = "ssl"; // sets the prefix to the servier

		$mail->Port = 465; // set the SMTP port for the GMAIL server

		$mail->Username = 'info@puricreators.com	'; // GMAIL username

		$mail->Password = 'Info@2022'; // GMAIL password

		

		$mail->SetFrom('info@puricreators.com	', 'Puri SeleQt');

		$mailAutoReply = clone $mail;

		$mail->AddReplyTo('info@puricreators.com	', 'Puri SeleQt');

		$mail->AddAddress($email, $name);



		$mail->Subject = 'Auto reply from Puri SeleQt';



		$messageBody = "<html><body>";

		$messageBody .= "<h2><u>Puri SeleQt Website: Get in Touch Enquiry</u></h2></br>Thank you for contacting us. This is to confirm that your message has been received by us on date " . $date . ".<br><br>The details provided by you were as mentioned below-<br><br>";

		$messageBody .= "<strong>Name  </strong><strong> : </strong>" . $name . "<br>";

		$messageBody .= "<strong>Email Id.  </strong><strong> : </strong>" . $email . "<br>";

		$messageBody .= "<strong>Mobile No. </strong><strong> : </strong>" . $phone . "<br>";

		$messageBody .= "We will be replying to you shortly. <br>";

		$messageBody .= "Thanks & Regards, <br> Puri SeleQt<br><br>";

    	$messageBody .= "<img style='width:150px' src=$logo>";

    	$messageBody .= "</body></html>";

		$mail->Body = $messageBody;



		$mail->IsHTML(true);



		try {



			if (!$mail->send()) {

			} else {

				$mailAutoReply->addAddress('info@puricreators.com', 'Puri SeleQt');

				$mailAutoReply->addCC('shailesh.m@thoughtinteract.com', 'Marketing');

				$mailAutoReply->AddReplyTo($email, $name);

				$mailAutoReply->Subject = 'Enquiry for Get in Touch';

				$autoMailTo = 'info@puricreators.com	';

				$messageBody = "<html><body>";

				$messageBody .= "<h2><u>Puri SeleQt Website: Get in Touch Enqiry</u></h2></br>The details provided by the enquirer are mentioned below:<br><br>";

				$messageBody .= "<strong>Name  </strong><strong> : </strong>" . $name . "<br>";

				$messageBody .= "<strong>Email Id  </strong><strong> : </strong>" . $email . "<br>";

				$messageBody .= "<strong>Mobile No.  </strong><strong> : </strong>" . $phone . "<br>";

				$messageBody .= "<strong>Source  </strong><strong> : </strong>" . $source . "<br>";

				$messageBody .= "<strong>IP Address.  </strong><strong> : </strong>" . $ip . "<br>";

    			$messageBody .= "<strong>Device.  </strong><strong> : </strong>" . $device . "<br>";

    			$messageBody .= "<strong>OS.  </strong><strong> : </strong>" . $os . "<br>";

    			$messageBody .= "<strong>Browser.  </strong><strong> : </strong>" . $browser . "<br>";

				$messageBody .= "Enquirer is awaiting your reply.";

				$messageBody .= "</body></html>";



				$mailAutoReply->Body = $messageBody;



				$mailAutoReply->IsHTML(true);



				if (!$mailAutoReply->send()) {

					$response['status'] = 'eroor';

					$response['message'] = "2 - Mailer Error: " . $mail->ErrorInfo;

				} else {


					$response['status'] = 'success';

					$response['message'] = "Thank you for your response";

					$response['redirecturl'] = $_SERVER['HTTP_REFERER'];



				}

				echo json_encode($response);

			}



		} catch (Exception $e) {

			$status = "Mail not send";

			$mailfail = new PHPMailer(true); // Passing `true` enables exceptions

			//Server settings

			$mailfail->SMTPDebug = 0; // Enable verbose debug output

			$mailfail->isSMTP(); // Set mailer to use SMTP

			$mailfail->Host = 'sg3plcpnl0036.prod.sin3.secureserver.net'; // Specify main and backup SMTP servers

			$mailfail->SMTPAuth = true; // Enable SMTP authentication

			$mailfail->Username = 'info@puricreators.com	'; // SMTP username

			$mailfail->Password = 'bigb@977'; // SMTP password

			$mailfail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted

			$mailfail->Port = 587; // TCP port to connect to



			$mailfail->setFrom('info@puricreators.com	', 'Admin');

			$mailfail->addAddress("smartyweb28@gmail.com");

			$mailfail->isHTML(true); // Set email format to HTML

			$mailfail->Subject = 'Password has been change Contact US Form';

			$mailfail->Body = 'Could not authenticate ';



			$mailfail->send();



			$response['status'] = 'success';

			$response['message'] = "Thank you for your response";

			$response['redirecturl'] = $_SERVER['HTTP_REFERER'];

			echo json_encode($response);

		} 

		

	} else {

		$response['status'] = 'error';

		$response['message'] = "Not able to add data please contact Admin ";

		echo json_encode($response);

	}







} else {header('Location:http://puriseleqt.com/');}



?>