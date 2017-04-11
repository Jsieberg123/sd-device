pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                sh 'echo $BUILD_NUMBER > /apps/sd-device.version'
                sh 'packageFiles/package.sh $BUILD_NUMBER'
                sh 'cp -f bin/*.deb /apps/'
                sh 'cp -f sd-device-install.sh /apps/sd-device-install.sh'
            }
        }
    }
}