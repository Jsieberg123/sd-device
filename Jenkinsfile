pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                sh 'packageFiles/package.sh $BUILD_NUMBER'
                sh 'cp -f bin/*.deb /apps/sd-device.deb'
            }
        }
    }
}