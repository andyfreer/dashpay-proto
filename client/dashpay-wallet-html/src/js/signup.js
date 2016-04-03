// signup controller

function InitSignup() {

    $('#inp-signup-uname').val('');
    $('#inp-signup-pwd').val('');
    $('#inp-signup-pwdconf').val('');
    $('#txt-signup-modal').text('');
    $('#txt-signup-result').hide();
    $('#txt-signup-uname-min-len').text('Minimum of ' + Dash.lib.config.userNameMinLen + ' characters');
    $('#txt-signup-pwd-min-len').text('Minimum of ' + Dash.lib.config.accPwdMinLen + ' characters');
    $('#btn-signup').prop('disabled', false);
}

// init the form on load
InitSignup();

// modal btn clicked
$("#btn-signup-modal").click(function() {
    $('#modal-signup').modal('hide');
    $('#tabs-loggedout a:first').tab('show');
});

//$('#inp-signup-uname').on('input', function() {
//    $('#inp-signup-uname'.closest('.form-group').removeClass("has-error"));
//});

// form submit clicked
$("#btn-signup").click(function() {

    var uname = $('#inp-signup-uname').val();
    var upwd = $('#inp-signup-pwd').val();
    var upwdconf = $('#inp-signup-pwdconf').val();
    var alertMsg = $('#txt-signup-result');
    var btn = $('#btn-signup');

    // validate
    if (uname.length < Dash.lib.config.userNameMinLen ) {
        showAlertMsg('Username must be ' + Dash.lib.config.userNameMinLen + ' chars or more long', alertMsg, true);
    } else if (upwd.length < Dash.lib.config.accPwdMinLen ) {
        showAlertMsg('Password must be ' + Dash.lib.config.accPwdMinLen + ' chars or more long', alertMsg, true);
    } else if (upwd !== upwdconf) {
        showAlertMsg('Both passwords must match', alertMsg, true);
    } else {
        // disable the button before calling API...
        btn.prop('disabled', true);

        wallet.Signup(uname, upwd,
            function (err, res) {

                // reset the form
                InitSignup();

                if (err) {
                    showAlertMsg("Error: Couldn't connect", alertMsg, true);
                } else {
                    if (res.status === 402) {
                        showAlertMsg('The Username already exists!  Please try again.', alertMsg, true);
                    } else if (res.status !== 200) {
                        showAlertMsg('Masternode error.  Please try again.', alertMsg, true);
                    } else {
                        //showAlertMsg('Your account was created!  Please login', alertMsg);

                        $('#txt-signup-modal').text("You're account was created!  Please login");
                        $('#btn-signup-modal').text('Login');
                        $('#modal-signup').modal();
                    }
                }
                console.log('signup ERR:' + JSON.stringify(err) + ' - RES:' + JSON.stringify(res));
            }
        );
    }
});