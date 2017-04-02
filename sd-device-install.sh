#!/bin/bash

apt-get update
apt-get install npm -y
npm install n -g
n stable
wget --user getapp --password SeniorDesign2017 https://apps.jacobsieberg.info/sd-device.hash -O sd-device.hash --no-cache
wget --user getapp --password SeniorDesign2017 https://apps.jacobsieberg.info/sd-device.zip -O sd-device.zip --no-cache
mkdir sd-device
unzip sd-device.zip -d sd-device
rm sd-device.zip
cd sd-device
rm node.json -f
npm install
chmod +x sd-device.sh
chmod +x start.sh
cp sd-device.service /lib/systemd/system/sd-device.service
systemctl enable sd-device.service
systemctl start sd-device.service
