$('document').ready(function() {

//=======Pageload Form ==========
$("#contactfrm").validate({
    ignore: ".ignore",
    rules: {
        name: {
            required: true,
            minlength: 2

        },
        lname: {
            required: true,
            minlength: 2
        },
        email: {
            required: true,
            email: true
        },
        mobile:{
            required:true,
            minlength:10,
            maxlength:10
        },
    
   hiddenRecaptcha: {
            required: function () {
                if (grecaptcha.getResponse() === '') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    errorElement: "span",
    errorClass: "error text-danger",
    messages: {
        name: { minlength: "Name at least 4 characters" },
        email: { email: "please enter a valid email address" },
        mobile: { minlength: "please enter a valid phone number" },
        mobile: { maxlength: "please enter a valid phone number 10 digits" },

    },

    submitHandler: submitForm

});

/* handle form submit */

function submitForm() {

    var data = $("#contactfrm").serialize();

    // var name = document.getElementById("cname").value;

    

    $.ajax({
        type: 'POST',
        url: 'assets/forms/contact-form.php',

        data: data,
        beforeSend: function() {
            $("#btn-contact").css('cursor', 'progress');
            $("#btn-contact").attr('disabled','true');
            $("#btn-contact").html(' <span class="spinner-grow spinner-grow-sm"></span> Loading..');
        },

        success: function(data) {
            if (data.status === 'error') {
                $("#btn-contact").html('Submit <span class="material-symbols-outlined">keyboard_arrow_right</span>');
                $("#btn-contact").css('cursor', 'pointer');
                $("#btn-contact").removeAttr('disabled');
                Swal.fire({
                    icon: 'error',
                    title: "Error",
                    html: data.message,
                    // timer: 2000
                }).then(okay => {
                    if (okay) {
                    }
                });

            } else if (data.status === 'success') {
                    $("#btn-contact").html('Submit <span class="material-symbols-outlined">keyboard_arrow_right</span>');
                    $("#btn-contact").css('cursor', 'pointer');
                    $("#btn-contact").removeAttr('disabled');
                    document.getElementById("contactfrm").reset();
                    localStorage.setItem('currentURL', data.redirecturl );
                    Swal.fire({
                        icon: 'success',
                        title: "Success",
                        // html: "Thank You, <br> Your enquiry is being processed. Our representative will get in touch with you shortly.",
                        showConfirmButton: false,
                        timer: 5000
                      });
                    setTimeout(thankYou,5000);
            } else {

                    $("#btn-contact").html('Sumbit');
                    $("#btn-contact").css('cursor', 'pointer');
                    $("#btn-contact").removeAttr('disabled');
                    Swal.fire({
                        icon: 'error',
                        title: "Error",
                        html: +data.message,
                        timer: 2000
                    }).then(okay => {
                        if (okay) {
                        }
                    });
            }

            function thankYou() {

                window.location.replace("thank-you.html");

                //window.location.replace("thank-you.html?name="+name+""); // Removing it as with next form submit you will be adding the div again in your code.

            }

        }

    });

    return false;

}

/* handle form validation */
$("#floorplanfrm").validate({
    rules: {
        name: {
            required: true,
            minlength: 4
        },
        email: {
            required: true,
            email: true
        },
        mobile:{
            required: true,
            maxlength: 10
        },
    },
    errorElement: "span",
    errorClass: "text-danger",
    messages: {
        email: { email: "please enter a valid email address" },

    },
    submitHandler: submitfloorForm
});
/* handle form submit */
function submitfloorForm() {
    var data = $("#floorplanfrm").serialize();

    $.ajax({
        type: 'POST',
        url: 'assets/forms/submit-form.php',
        data: data,
        beforeSend: function() {
            $("#btn-floorplanfrm").css('cursor', 'progress');
            $("#btn-floorplanfrm").attr('disabled','true');
            $("#btn-floorplanfrm").html('<span class="spinner-grow spinner-grow-sm"></span>Sending..');
        },
        success: function(data) {
            if (data.status === 'error') {
                $("#btn-floorplanfrm").html('Submit');
                $("#btn-floorplanfrm").css('cursor', 'pointer');
                $("#btn-floorplanfrm").removeAttr('disabled');

                Swal.fire({
                    icon: 'error',
                    title: "Error",
                    html: data.message,
                }).then(okay => {
                    if (okay) {
                    }
                });

            } else if (data.status === 'success') {
                    $("#btn-floorplanfrm").html('Successful!');
                    $("#btn-floorplanfrm").css('cursor', 'pointer');
                    $("#btn-floorplanfrm").removeAttr('disabled');
                    document.getElementById("floorplanfrm").reset();
                    $('#onload-form').modal('hide');
                    localStorage.setItem('currentURL', data.redirecturl );
                    localStorage.setItem('pageload', "yes" );
                    Swal.fire({
                        icon: 'success',
                        title: "Success",
                        // html: ""+data.message+"",
                        showConfirmButton: false,
                        timer: 2500
                      });
                    setTimeout(thankYou,2500);
            } else {
               		$("#btn-floorplanfrm").html('Submit');
                    $("#btn-floorplanfrm").css('cursor', 'pointer');
                    $("#btn-floorplanfrm").removeAttr('disabled');
                    Swal.fire({
                        icon: 'error',
                        title: "Error",
                        html: +data.message,
                        timer: 2000
                    }).then(okay => {
                        if (okay) {
                        }
                    });

            }
            function thankYou() {
                window.location.replace("thank-you.html?sendmail=success"); // Removing it as with next form submit you will be adding the div again in your code.
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#btn-floorplanfrm").html('Submit');
            $("#btn-floorplanfrm").css('cursor', 'pointer');
            $("#btn-floorplanfrm").removeAttr('disabled');
            $(".loading").css('display', 'none');
            Swal.fire({
                    icon: 'error',
                    title: "Error",
                    html: textStatus + ' ' + errorThrown,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 2000
                });
        } 
    });
    return false;
}


// popupEnq
$("#popupEnq").validate({
    rules: {
        name: {
            required: true,
            minlength: 4
        },
        email: {
            required: true,
            email: true
        },
        mobile:{
            required: true,
            maxlength: 10
        },
    },
    errorElement: "span",
    errorClass: "text-danger",
    messages: {
        email: { email: "please enter a valid email address" },

    },
    submitHandler: submitFormpopupEnq
});
/* handle form submit */

function submitFormpopupEnq() {
    var data = $("#popupEnq").serialize();

    $.ajax({
        type: 'POST',
        url: 'assets/forms/submit-form.php',
        data: data,
        beforeSend: function() {
            $("#btn-pop").css('cursor', 'progress');
            $("#btn-pop").attr('disabled','true');
            $("#btn-pop").html('<span class="spinner-grow spinner-grow-sm"></span>Sending..');
        },
        success: function(data) {
            if (data.status === 'error') {
                $("#btn-pop").html('Submit');
                $("#btn-pop").css('cursor', 'pointer');
                $("#btn-pop").removeAttr('disabled');

                Swal.fire({
                    icon: 'error',
                    title: "Error",
                    html: data.message,
                }).then(okay => {
                    if (okay) {
                    }
                });

            } else if (data.status === 'success') {
                    $("#btn-pop").html('Successful!');
                    $("#btn-pop").css('cursor', 'pointer');
                    $("#btn-pop").removeAttr('disabled');
                    document.getElementById("popupEnq").reset();
                    $('#enquiry-form').modal('hide');
                    localStorage.setItem('currentURL', data.redirecturl );
                    Swal.fire({
                        icon: 'success',
                        title: "Success",
                        // html: ""+data.message+"",
                        showConfirmButton: false,
                        timer: 2500
                      });
                    setTimeout(thankYou,2500);
            } else {
               		$("#btn-pop").html('Submit');
                    $("#btn-pop").css('cursor', 'pointer');
                    $("#btn-pop").removeAttr('disabled');
                    Swal.fire({
                        icon: 'error',
                        title: "Error",
                        html: +data.message,
                        timer: 2000
                    }).then(okay => {
                        if (okay) {
                        }
                    });

            }
            function thankYou() {
                window.location.replace("thank-you.html?sendmail=success"); // Removing it as with next form submit you will be adding the div again in your code.
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#btn-pop").html('Submit');
            $("#btn-pop").css('cursor', 'pointer');
            $("#btn-pop").removeAttr('disabled');
            $(".loading").css('display', 'none');
            Swal.fire({
                    icon: 'error',
                    title: "Error",
                    html: textStatus + ' ' + errorThrown,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 2000
                });
        } 
    });
    return false;
}


});