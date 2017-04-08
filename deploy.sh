#!/bin/bash

while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -i)
    I=y
    shift
    ;;
    -h)
    ADDR="$2"
    shift 2 # past argument
    ;;
    *)
        shift    # unknown option
    ;;
    esac
done

if [ -z "$ADDR" ]
    then
        exit
fi

sudo rm -r -f node_modules
ssh pi@$ADDR 'mkdir -p app'
scp -r [!.]* pi@$ADDR:~/app
if [ "$I" = y ]
    then ssh pi@$ADDR 'cd app && sudo npm install'
fi
ssh pi@$ADDR 'sudo killall node'
ssh pi@$ADDR 'cd app && sudo node main.js'
