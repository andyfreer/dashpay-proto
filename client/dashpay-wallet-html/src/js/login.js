// login controller

function Initlogin() {
    // cheating...
    //$('#inp-login-uname').val('andy');
    //$('#inp-login-pwd').val('123456');

    $('#inp-login-uname').val('');
    $('#inp-login-pwd').val('');
    $('#txt-login-result').hide();
    $('#btn-login').prop('disabled', false);
}

// init the form on load
Initlogin();

// form submit clicked
$("#btn-login").click(function() {

    var uname = $('#inp-login-uname').val();
    var upwd = $('#inp-login-pwd').val();
    var alertMsg = $('#txt-login-result');
    var btn = $('#btn-login');

    // validate
    if (!uname || !upwd) {
        showAlertMsg('Enter a username and password', alertMsg, true);
    } else {

        // disable the button before calling D-API...
        btn.prop('disabled', true);
        $('#inp-login-pwd').val('');

        wallet.Login(uname, upwd,
            function (err, res) {

                btn.prop('disabled', false);

                if (err) {
                    console.log('Response Error: ' + err);
                    showAlertMsg("Error: Couldn't connect", alertMsg, true);
                } else {
                    console.log('Response: ' + JSON.stringify(res));
                    if (res.status === 404) {
                        showAlertMsg('User not found', alertMsg, true);
                    } else if (res.status === 401) {
                        showAlertMsg('The password is incorrect', alertMsg, true);
                    } else if (res.status !== 200) {
                        showAlertMsg('Masternode error.  Please try again.', alertMsg, true);
                    } else {
                        // Status 200 - don't do anything here because the wallet sdk will callback with login result
                    }
                }
            }
        );
    }
});