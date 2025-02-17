pipeline {
    agent any

    environment {
        SNYK_TOKEN = credentials('snyk-api-token')  // Securely fetch API token from Jenkins credentials
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/FaisalMohZ/my-devops-project.git'  // ✅ Using your GitHub username
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SAST - Semgrep Security Scan') {   // ✅ Semgrep Code Security Scan
            steps {
                sh '''
                if ! command -v semgrep &> /dev/null; then
                  pip install semgrep
                fi
                semgrep --config=auto . || true  # Runs Semgrep scan
                '''
            }
        }

        stage('SAST - Snyk Security Scan') {   // ✅ Snyk Security Scan
            steps {
                sh 'export SNYK_TOKEN=${SNYK_TOKEN} && snyk test || true'
            }
        }

        stage('Build Docker Image') {   // ✅ Build Docker Image
            steps {
                sh 'docker build -t my-vulnerable-app:latest .'
            }
        }

        stage('SCA - Snyk Dependency Monitoring') {   // ✅ Monitor Dependencies with Snyk
            steps {
                sh 'export SNYK_TOKEN=${SNYK_TOKEN} && snyk monitor || true'
            }
        }

        stage('Deploy Application') {   // ✅ Deploy to Local Container
            steps {
                sh 'docker run -d -p 3000:3000 --name vulnerable-app my-vulnerable-app:latest'
            }
        }
    }
}
