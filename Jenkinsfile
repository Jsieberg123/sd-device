pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                sh 'zip -r sd-device.zip .'
                sh 'md5sum sd-device.zip > sd-device.hash'
                sh 'mv sd-device.zip sd-device2.zip'
                sh 'mv sd-device.hash /apps/sd-device.hash'
            }
        }
    }
}