'use strict';

// Update the following variables with your own values
const apiKey = ''; //Add Api Key here
const userId = ''; // Add your user ID here

document.addEventListener('DOMContentLoaded', function () {
    const payButton = document.getElementById('pay-button');

    if (payButton) {
        payButton.disabled = true;
        window.grailpay.init({
            containerId: 'widget-container',            
            userId: userId,
            token: apiKey,
            sandbox: false, // Set to true to enable sandbox (test) mode; false for production
            onError: function (error) {
                console.log('GrailPay.onError', error);
            },
            onLinkedDefaultAccount: function (data) {
                let responseContainer = document.getElementById('response-container');
                if (responseContainer) {
                    responseContainer.innerHTML = data?.account_id ? `AccountId: ${data.account_id}` : '';
                }
            }
        }).then(function (res) {
            if (res.status) {
                payButton.disabled = false;
                console.log('GrailPay Banklink Widget initialized successfully');
            }
        }).catch(function (err) {
            console.log(err, 'Error initializing GrailPay Banklink Widget');
        });

        payButton.addEventListener('click', function () {
            window.grailpay.open();
        });
    }
});