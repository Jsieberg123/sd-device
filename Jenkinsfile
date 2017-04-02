pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                sh 'zip -r sd-device.zip .'
                sh 'md5sum sd-device.zip > sd-device.hash'
                sh 'cp sd-device.zip /apps/sd-device.zip'
                sh 'cp sd-device.hash /apps/sd-device.hash'
            }
        }
    }
}