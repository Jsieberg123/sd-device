pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                sh 'echo $BUILD_NUMBER > /apps/sd-device.version
                sh 'packageFiles/package.sh $BUILD_NUMBER'
                sh 'cp -f *.deb /apps/
            }
        }
    }
}