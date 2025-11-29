pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    environment {
        DOCKER_IMAGE = "kalyan3436/node-backend"
        SERVER = "ubuntu@64.227.130.185"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'cd backend && npm install'
            }
        }

        stage('Run tests') {
            steps {
                sh 'cd backend && npm test'
            }
        }

        stage('Build TypeScript') {
            steps {
                sh '''
                    cd backend
                    if [ -f "./tsconfig.json" ]; then
                        npm run build
                    fi
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:latest ./backend'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([string(credentialsId: 'docker_pass', variable: 'DOCKER_PASSWORD')]) {
                    sh """
                        echo $DOCKER_PASSWORD | docker login -u yourdockerhubusername --password-stdin
                        docker push $DOCKER_IMAGE:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['server_ssh']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no $SERVER "
                            docker pull $DOCKER_IMAGE:latest &&
                            docker stop backend || true &&
                            docker rm backend || true &&
                            docker run -d --name backend -p 5500:5500 --env-file /root/backend.env $DOCKER_IMAGE:latest
                        "
                    """
                }
            }
        }
    }
}
