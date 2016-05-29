# CLEAN BUILD FOLDERS
#------------------------------------------

rm -rfv ../lib/dashpay-lib/dist
rm -rfv ../lib/dashpay-wallet-sdk/dist
rm -rfv ../lib/dashpay-wallet-client/dist
rm -rfv ../lib/dashpay-checkout-sdk/dist
rm -rfv ../client/dashpay-wallet-html/dist
rm -rfv ../client/dashpay-spa/dist

rm -rfv ../client/dashpay-spa/bundle.js

rm -rfv ../lib/dashpay-lib/build
rm -rfv ../lib/dashpay-wallet-sdk/build
rm -rfv ../lib/dashpay-wallet-client/build
rm -rfv ../lib/dashpay-checkout-sdk/build
rm -rfv ../client/dashpay-wallet-html/build
rm -rfv ../client/dashpay-spa/build


# BUILD ALL PROJECTS
#------------------------------------------

# Build the SPA client
(cd ../client/dashpay-spa && gulp)

# Build the libs (for referencing the JS files directly)
grunt --gruntfile ../lib/dashpay-lib/Gruntfile.js
grunt --gruntfile ../lib/dashpay-wallet-sdk/Gruntfile.js

# Build the (deprecated) html client
grunt --gruntfile ../client/dashpay-wallet-html/Gruntfile.js
