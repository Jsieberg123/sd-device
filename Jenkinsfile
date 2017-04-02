pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                sh 'zip -r /apps/sd-device.zip .'
                sh 'md5sum /apps/sd-device.zip > /apps/sd-device.hash'
                sh 'mv -f sd-device.zip /apps/sd-device.zip'
                sh 'mv sd-device.hash /apps/sd-device.hash'
            }
        }
    }
}