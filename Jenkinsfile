pipeline {
    // agent any // This is fine if the Jenkins master or a pre-configured agent has everything.
    // For more control, you might define a Windows agent label:
    agent { label 'windows-agent' } // Make sure you have an agent with this label configured in Jenkins
    options {
        skipDefaultCheckout true // Add this line
    }
    environment {
        DOCKER_IMAGE_NAME = "bhuvanmdev/restuarant-website" // Change this
        DOCKER_IMAGE_TAG = "latest" // Or use something dynamic like "${env.BUILD_NUMBER}"
        // For Kubeconfig:
        // 1. Store your kubeconfig as a 'Secret file' in Jenkins credentials.
        // 2. Or, if kubectl is already configured system-wide for the user Jenkins runs as,
        //    and that user has access to the default kubeconfig location (%USERPROFILE%\.kube\config),
        //    you might not need explicit withKubeConfig for local Docker Desktop k8s.
        //    However, using withKubeConfig is more robust and explicit.
        // KUBE_CONFIG_CREDENTIALS_ID = 'your-kubeconfig-secret-file-id' // ID of your Kubernetes config (Secret file type) in Jenkins
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
                    // Docker commands are generally the same on Windows when using Docker Desktop for Linux containers.
                    // The docker.build() step from the Docker Pipeline plugin handles this.
                    docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}", ".")
                }
            }
        }

        stage('Push Docker Image (Optional)') {
            when {
                // expression { return true } // Uncomment and adapt if you always want to push
                branch 'main'
            }
            steps {
                script {
                    // Ensure Docker credentials (e.g., for Docker Hub) are configured in Jenkins.
                    // The ID 'docker-hub-credentials' is an example.
                    // docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                    //    docker.image("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}").push()
                    // }

                    // Or using bat for direct docker push (less secure if credentials are not handled by Jenkins plugin)
                    // You would need to 'docker login' on the agent machine beforehand or handle login in the script.
                    // For a mini-project and local testing, if you've already logged in via Docker Desktop, this might work.
                    bat "docker push ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                // Using withKubeConfig is the recommended way to handle Kubernetes configuration.
                // It temporarily sets up the KUBECONFIG environment variable for the enclosed commands.
                // Make sure 'your-kubeconfig-secret-file-id' in Jenkins Credentials is of type 'Secret file'
                // and you've uploaded your kubeconfig file there.
                withKubeConfig([credentialsId: KUBE_CONFIG_CREDENTIALS_ID]) {
                    // Use 'bat' to execute kubectl commands on Windows.
                    // Ensure kubectl.exe is in the system PATH or provide the full path.
                    bat "kubectl apply -f k8s-deployment.yaml"

                    // Optional: Force rollout to pick up the new image if imagePullPolicy is not 'Always'
                    // or if the tag hasn't changed but the image content has (e.g. 'latest').
                    bat "kubectl rollout restart deployment simple-website-deployment"
                }
                // Alternative if kubectl is already configured globally and accessible by Jenkins user
                // (e.g., Docker Desktop Kubernetes which sets up %USERPROFILE%\.kube\config):
                // script {
                //    bat "kubectl apply -f k8s-deployment.yaml"
                //    bat "kubectl rollout restart deployment simple-website-deployment"
                // }
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