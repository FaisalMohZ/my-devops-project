pipeline {
    agent any

    environment {
        SNYK_TOKEN = credentials('snyk-api-token')  // Securely fetch API token
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/YOUR_GITHUB_USERNAME/my-devops-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SAST - Snyk Security Scan') {
            steps {
                sh 'export SNYK_TOKEN=${SNYK_TOKEN} && snyk test || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-vulnerable-app:latest .'
            }
        }

        stage('Run Security Monitoring') {
            steps {
                sh 'export SNYK_TOKEN=${SNYK_TOKEN} && snyk monitor || true'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run -d -p 3000:3000 --name vulnerable-app my-vulnerable-app:latest'
            }
        }
    }
}
