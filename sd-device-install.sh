#!/bin/bash

# Install using command "wget -O - https://apps.jacobsieberg.info/apps/sd-device-install.sh | sudo  bash"

apt-get update
apt-get install npm -y
npm install n -g
n stable
V=$(curl https://apps.jacobsieberg.info/apps/sd-device.version)
wget  https://apps.jacobsieberg.info/apps/sd-device_1.$V-1.deb -O sd-device.deb --no-cache
dpkg -i sd-device.deb