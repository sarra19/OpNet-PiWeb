pipeline {
    agent any
    stages {
        stage('Install backend dependencies') {
            steps {
                dir('Backend') {
                    sh 'npm install'
                }
            }
        }
        stage('Install frontend dependencies - BackOffice') {
            steps {
                dir('Frontend/BackOffice') {
                    sh 'npm install'
                }
            }
        }
        stage('Install frontend dependencies - FrontOffice') {
            steps {
                dir('Frontend/FrontOffice') {
                    sh 'npm install'
                }
            }
        }
        stage('Unit Test') {
            steps {
                dir('Backend') {
                    sh 'npm test'
                }
                dir('Frontend/BackOffice') {
                    sh 'npm test'
                }
                dir('Frontend/FrontOffice') {
                    sh 'npm test'
                }
            }
        }
        stage('Build application') {
            steps {
                dir('Backend') {
                    sh 'npm run build-dev'
                }
                dir('Frontend/BackOffice') {
                    sh 'npm run build-dev'
                }
                dir('Frontend/FrontOffice') {
                    sh 'npm run build-dev'
                }
            }
        }
    }
}
