// global ref to DashPay-Wallet SDK that also contains DashPay-Lib
var Dash = require('DashPayWallet');

// create a global DashPay Wallet object..
var wallet = new Dash.Wallet();
var eventHandler = function(item) {

    if (item === 1) {

        // show the logged in page
        $('#page-loggedout').hide();
        $('#page-loggedin').show();

        // default to show the accounts tab when the prototype logs in...
        SelectAccountsTab();

    } else if (item === 0) {

        // show the logged out page
        $('#page-loggedin').hide();
        $('#page-loggedout').show();
    }

    console.log("event: " + item);
};

wallet.subscribe(eventHandler);

// hide content on load
$('#page-loggedin').hide();
$('#page-loggedout').hide();


// show the welcome modal
$('#modal-welcome').modal();
$("#btn-welcome-modal").click(function() {
    $('#page-loggedout').show();
    $('#modal-welcome').modal('hide');
});

// handle welcome modal close not using the button
$('#modal-welcome').on('hide.bs.modal', function () {
    $('#page-loggedout').show();
});


// wire the logout button
$("#btn-logout").click(function() {
    Logout();
});

$("#btn-reload").click(function() {
    // later this will just refresh current data screen by refetching data...
    Logout();
});
function Logout() {
    /* - proper logout needs more work...
     wallet.Logout();
     Initlogin();
     InitSignup();
     */
    window.location.reload();
}

// show tooltips
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({
        placement : 'top'
    });
});

// show form alert messages
function showAlertMsg(msg, alertObj, isError) {
    //alertObj.removeClass('alert-info');
    //alertObj.addClass('alert-error');
    alertObj.text(msg);
    alertObj.show();
}

// vertically centr all modals...
// http://stackoverflow.com/a/20444744
(function ($) {
    "use strict";
    function centerModal() {
        $(this).css('display', 'block');
        var $dialog  = $(this).find(".modal-dialog"),
            offset       = ($(window).height() - $dialog.height()) / 2,
            bottomMargin = parseInt($dialog.css('marginBottom'), 10);

        // Make sure you don't hide the top part of the modal w/ a negative margin if it's
        // longer than the screen height, and keep the margin equal to the bottom margin of the modal
        if(offset < bottomMargin) offset = bottomMargin;
        $dialog.css("margin-top", offset);
    }

    $(document).on('show.bs.modal', '.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });
}(jQuery));


var activeTab = null;
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    activeTab = e.target;
    prevTab = e.relatedTarget;
    console.log('tab = ' + activeTab);

    switch (activeTab.hash) {
        case '#tab-4':
            SelectAccountsTab();
            break;

    }
});
