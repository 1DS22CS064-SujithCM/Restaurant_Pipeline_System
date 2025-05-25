pipeline {

    agent { label 'windows-agent' } // Make sure you have an agent with this label configured in Jenkins
    options {
        skipDefaultCheckout true // Add this line
    }
    environment {
        DOCKER_IMAGE_NAME = "bhuvanmdev/restuarent-website" // Change this
        DOCKER_IMAGE_TAG = "latest" // Or use something dynamic like "${env.BUILD_NUMBER}"
        KUBE_CONFIG_CREDENTIALS_ID = 'your-kubeconfig-secret-file-id' // ID of your Kubernetes config (Secret file type) in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // This step is cross-platform and should work fine with Git for Windows installed.
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}", ".")
                }
            }
        }

        stage('Push Docker Image (Optional)') {
            
            steps {
                script {
                    
                    bat "docker image push ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {

                withKubeConfig([credentialsId: KUBE_CONFIG_CREDENTIALS_ID]) {

                    bat "kubectl apply -f k8s-deployment.yaml --namespace=default"

                    bat "kubectl apply -f k8s-service.yaml --namespace=default"

                    bat "kubectl rollout restart deployment restuarent-website-deployment --namespace=default"
    
                }

            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}