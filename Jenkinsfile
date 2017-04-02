pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                sh 'pwd'
                sh 'zip -r sd-device.zip .'
                sh 'md5sum sd-device.zip > sd-device.hash'
                sh 'mv sd-device.zip /apps'
                sh 'mv sd-device.hash /apps'
            }
        }
    }
}