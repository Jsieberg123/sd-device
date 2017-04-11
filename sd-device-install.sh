#!/bin/bash

# Install using command "wget -O - https://apps.jacobsieberg.info/apps/sd-device-install.sh | sudo  bash"

#apt-get update
#apt-get install npm -y
V=$(curl https://apps.jacobsieberg.info/apps/sd-device.version)
wget  https://apps.jacobsieberg.info/apps/sd-device_1.$V-1.deb -O sd-device.deb --no-cache
dpkg -i sd-device.deb
apt-get install -f
#echo "00 * * * * wget -O - https://apps.jacobsieberg.info/apps/sd-device-install.sh | sudo  bash" >> mycron
#crontab mycron
#rm mycron
#rm sd-device.dep