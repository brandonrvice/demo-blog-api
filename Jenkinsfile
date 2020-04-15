node {
    stage('get code from github'){
        git(
           url: 'https://github.com/brandonvio/fuzzle-api',
           credentialsId: 'aa1cfaef-9e77-4449-9208-43d6f6a8de44',
           branch: "master"
        )
    }
    stage("APP"){
        stage('build'){
            sh "aws ecs update-service --cluster rythm-ecs-cluster --service fuzzle-api-service --desired-count 0"
            sh "aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 612370013845.dkr.ecr.us-west-2.amazonaws.com/fuzzle-api"                
            sh "docker build -t fuzzle-api ."
            sh "docker tag fuzzle-api:latest 612370013845.dkr.ecr.us-west-2.amazonaws.com/fuzzle-api:latest"
        }
        stage('deploy'){            
            sh "docker push 612370013845.dkr.ecr.us-west-2.amazonaws.com/fuzzle-api:latest"
            sh 'aws ecs update-service --cluster rythm-ecs-cluster --service fuzzle-api-service --desired-count 1'
        }
    }
}