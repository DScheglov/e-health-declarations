PROJECT := e-health-patient-decl
IMAGE := dscheglov/e-health-patient-decl
DB_SVR := mongodb-server
PORT_MAP := 80:8888

drop:
	docker rm -f $(PROJECT)

clean: drop
	docker rmi -f $(IMAGE)

build:
	docker build -t $(IMAGE) .

run:
	docker run -d --name=$(PROJECT) --link $(DB_SVR) -p $(PORT_MAP) $(IMAGE)

up: build run
