// accounts tab controller
//---------------------------

// onload
HideAccountsList();
HideCreateAccountForm();

// called when tab selected..
function SelectAccountsTab() {
    HideCreateAccountForm();
    ShowAccountsList();
}

// **************************************************
// Accounts list
// **************************************************
function ShowAccountsList() {
    $('#table-accounts').hide();
    $('txt-accounts-loading').show();
    $('#list-accounts').show();

    getAccounts(function (numAccounts) {
        console.log('numb. accounts: ' + numAccounts);
        if (numAccounts === 0) {
            HideAccountsList();
            ShowCreateAccountForm();
        } else {
            HideCreateAccountForm();
        }
    });
}
function HideAccountsList() {
    $('#table-accounts').hide();
}
function getAccounts(callback) {

    $('#table-accounts').hide();
    $('#txt-accounts-loading').show();

    var btn = $('#btn-accounts-get');
    wallet.getAccounts(
        function (err, res) {

            btn.prop('disabled', false);
            if (err) {
                console.log('Response Error: ' + err);
                showAlertMsg("Error: Couldn't connect", alertMsg, true);
            } else {
                //console.log('Response: ' + JSON.stringify(res));
                if (res.status === 402) {
                    showAlertMsg('The account name already exists!  Please try again.', alertMsg, true);
                } else if (res.status !== 200) {
                    showAlertMsg('Masternode error.  Please try again.', alertMsg, true);
                } else {

                    $('#table-accounts').show();
                    $('#txt-accounts-loading').hide();

                    $("#table-accounts-body").find("tr").remove();

                    // draw the decrypted account list data
                    $.each(res, function () {
                        $.each(this, function (name, value) {
                            //console.log(name + '=' + value.uname);
                            var tr = '<tr><td> '+value.accName+' </td><td> - </td><td> ';
                            tr += '<button class="btn btn-primary" type="button">Details</button>';
                            tr += '<button class="btn btn-info" type="button">Backup</button>';
                            tr += ' </td></tr>';
                            $('#table-accounts').append(tr);
                        });
                    });

                    callback(res.res.length);
                    return;
                }
            }
            callback(0);
        }
    );
}

// **************************************************
// Create account form
// **************************************************

// called if no accounts are found on tab load, or add account button clicked..
function ShowCreateAccountForm() {
    // create account form..
    $('#panel-accounts-create').show();
    $('#inp-createAccount-name').val('');
    $('#inp-createAccount-passphrase').val('');
    $('#txt-createAccount-result').hide();
    $('#btn-createAccount').prop('disabled', false);
    $('#btn-createAccount-refresh').prop('disabled', false);
    NewMnemonic();
}

// called after account add succeeded
function HideCreateAccountForm() {
    $('#panel-accounts-create').hide();
}

// add account button clicked..
$("#btn-createAccount-show").click(function() {
    ShowCreateAccountForm();
    HideAccountsList();
});

$("#btn-createAccount").click(function() {
    var accName = $('#inp-createAccount-name').val();
    var accPassphrase = $('#inp-createAccount-passphrase').val();
    var accPassphraseText = $('#txt-createAccount-passphrase').text();
    var alertMsg = $('#txt-createAccount-result');
    var btn = $('#btn-createAccount');

    // validate
    if (!accName) {
        showAlertMsg('Enter a name for the account', alertMsg, true);
    } else if (!accPassphrase || (accPassphrase !== accPassphraseText)) {
        showAlertMsg('Reenter the Account Passphrase as shown', alertMsg, true);
    } else {
        // disable the button before calling D-API...
        btn.prop('disabled', true);
        alertMsg.hide();

        wallet.createAccount(accName, accPassphrase,
            function (err, res) {

                btn.prop('disabled', false);
                if (err) {
                    console.log('Response Error: ' + err);
                    showAlertMsg("Error: Couldn't connect", alertMsg, true);
                } else {
                    console.log('Response: ' + JSON.stringify(res));
                    if (res.status === 402) {
                        showAlertMsg('The account name already exists!  Please try again.', alertMsg, true);
                    } else if (res.status !== 200) {
                        showAlertMsg('Masternode error.  Please try again.', alertMsg, true);
                    } else {
                        // success
                        HideCreateAccountForm();
                        ShowAccountsList();
                    }
                }
            }
        );
    }
});

function NewMnemonic() {
    var passphrase = Dash.lib.keys.genMnemonic();
    console.log('Mnemonic generated: ' + passphrase);
    $('#txt-createAccount-passphrase').text(passphrase);
}

$('#btn-createAccount-refresh').click(function() {
    NewMnemonic();
});
