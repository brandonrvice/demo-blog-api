aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 612370013845.dkr.ecr.us-west-2.amazonaws.com/fuzzle-api
docker build -t fuzzle-api .
docker tag fuzzle-api:latest 612370013845.dkr.ecr.us-west-2.amazonaws.com/fuzzle-api:latest
docker push 612370013845.dkr.ecr.us-west-2.amazonaws.com/fuzzle-api:latest
# aws ecs update-service --cluster rythm-ecs-cluster --service fuzzle-api-service --force-new-deployment
# aws ecs stop-task --task 09aa51df-3944-448a-8b1c-0fefb1be824c --cluster rythm-ecs-cluster
aws ecs update-service --cluster rythm-ecs-cluster --service fuzzle-api-service --desired-count 0
sleep 20
aws ecs update-service --cluster rythm-ecs-cluster --service fuzzle-api-service --desired-count 1