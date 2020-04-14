## fuzzle.xyz

[fuzzle.xyz](https://fuzzle.xyz)

## Architecture

### Static Website

ReactJS running on AWS S3 using Route 53, CloudFront and SSL using Certificate Manager

### API

NodeJS running in a docker container on AWS ECS. API endpoint is API Gateway using HTTP API.

### Data

MongoDB running on MongoDB Atlas

![Architecture](arch.png?raw=true "Architecture")
