NAME="sd-device_1."$1"-1"
ROOT='./bin'
BASE=$ROOT'/'$NAME
echo $BASE

rm -r $ROOT
mkdir $ROOT
mkdir $BASE
mkdir $BASE/apps
mkdir $BASE/lib
mkdir $BASE/lib/systemd
mkdir $BASE/lib/systemd/system
mkdir $BASE/DEBIAN

cp -R communications $BASE/apps/communications
cp -R tools $BASE/apps/tools
cp -R web-interface $BASE/apps/web-interface
cp app.json $BASE/apps/app.json
cp main.js $BASE/apps/main.js
cp package.json $BASE/apps/package.json
cp start.sh $BASE/apps/start.sh

cp sd-device.service $BASE/lib/systemd/system/sd-device.service

cp packageFiles/* $BASE/DEBIAN/

dpkg-deb --build $BASE