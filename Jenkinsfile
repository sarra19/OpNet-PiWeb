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
        // stage('Install frontend dependencies - BackOffice') {
        //     steps {
        //         dir('Frontend/BackOffice') {
        //             sh 'npm install'
        //         }
        //     }
        // }
        stage('Install frontend dependencies - FrontOffice') {
            steps {
                dir('Frontend/FrontOffice') {
                    sh 'npm install'
                }
            }
        }
        // stage('Unit Test') {
        //     steps {
        //         script {
        //             if (fileExists('Backend/package.json')) {
        //                 dir('Backend') {
        //                     sh 'npm test || echo "No tests found for backend"'
        //                 }
        //             } else {
        //                 echo "Skipping backend tests as package.json not found"
        //             }
        //             dir('Frontend/BackOffice') {
        //                 sh 'npm test'
        //             }
        //             dir('Frontend/FrontOffice') {
        //                 sh 'npm test'
        //             }
        //         }
        //     }
        // }
        stage('Build application') {
            steps {
              
               
                dir('Frontend/FrontOffice') {
                    sh 'npm run dev'
                }
            }
        }
    }
}
