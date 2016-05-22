# DELETE BUILT FOLDERS

./clean.sh

# Build the SPA client
(cd ../client/dashpay-spa && gulp)

# Build the libs (for referencing the JS files directly)
grunt --gruntfile ../lib/dashpay-lib/Gruntfile.js
grunt --gruntfile ../lib/dashpay-wallet-sdk/Gruntfile.js

# Build the (deprecated) html client
grunt --gruntfile ../client/dashpay-wallet-html/Gruntfile.js
