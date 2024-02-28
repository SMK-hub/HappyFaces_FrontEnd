pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/I-Batman/LMS.git']])
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'docker build -t frontend .'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose-frontend.yml up -d'
                }
            }
        }
    }
}
