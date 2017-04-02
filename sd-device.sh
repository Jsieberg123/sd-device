#!/bin/bash

cd /apps
oldHash=$(cat sd-device.hash)
wget --user getapp --password SeniorDesign2017 https://apps.jacobsieberg.info/apps/sd-device.hash -O sd-device.hash --no-cache
newHash=$(cat sd-device.hash)
if [ "$oldHash" = "$newHash" ] 
    then
    echo "Nothing to be done."
    exit
fi
cp sd-device/node.json node.json
wget --user getapp --password SeniorDesign2017 https://apps.jacobsieberg.info/apps/sd-device.zip -O sd-device.zip --no-cache
systemctl stop sd-device
rm -rf sd-device
mkdir sd-device
unzip sd-device.zip -d sd-device
cd sd-device
chmod +x start.sh
chmod +x sd-device.sh
rm -rf node_modules node.json
npm install
cd ..
mv node.json sd-device/node.json
systemctl start sd-device
rm sd-device.zip