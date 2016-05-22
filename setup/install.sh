# INSTALL NPM PACKAGES

# Install node packages each sub-project
(cd ../lib/dashpay-lib && npm install)
(cd ../lib/dashpay-wallet-sdk && npm install)
(cd ../lib/dashpay-wallet-client && npm install)
(cd ../lib/dashpay-checkout-sdk && npm install)
(cd ../client/dashpay-wallet-html && npm install)
(cd ../client/dashpay-spa && npm install)
(cd ../server/dashpay-dapi-node && npm install)

# Delete duplicates of bitcore-lib-dash or it throws an error when referenced
rm -rfv ../lib/dashpay-lib/node_modules/bitcore-ecies-dash/node_modules/bitcore-lib-dash
rm -rfv ../lib/dashpay-lib/node_modules/bitcore-message-dash/node_modules/bitcore-lib-dash
rm -rfv ../lib/dashpay-lib/node_modules/bitcore-mnemonic-dash/node_modules/bitcore-lib-dash