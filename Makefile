build:
	docker build -t api-runner runner
	docker-compose build
	#docker build -t api-executor executor

run:
	docker-compose --file dev-compose.yml up
	#docker run -it -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock api-executor
