#!/bin/bash

if [ -z ${1} ]
then
echo "No app supplied."
exit
fi

if [ -z ${2} ]
then
echo "No name supplied."
exit
fi

zip -r ${2}.zip ${1}
md5sum ${2}.zip > ${2}.hash
scp -oStrictHostKeyChecking=no ${2}.zip write@apps.jacobsieberg.info:/apps/${2}.zip
scp -oStrictHostKeyChecking=no ${2}.hash write@apps.jacobsieberg.info:/apps/${2}.hash
rm -f ${2}.zip
rm -f ${2}.hash