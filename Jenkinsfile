pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                sh 'packageFiles/pckage.sh $BUILD_NUMBER'
                sh 'cp -f *.deb /apps/
            }
        }
    }
}