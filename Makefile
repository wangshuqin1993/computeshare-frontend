TIMESTAMP=$(shell date +%Y%m%d%H%M)

docker:
	git fetch origin
	git merge origin/develop
	docker build -f script/Dockerfile -t hamstershare/computeshare-frontend:$(TIMESTAMP)  .
	docker push hamstershare/computeshare-frontend:$(TIMESTAMP)
	kubectl --kubeconfig $(HOME)/.kube/config_test -n computeshare set image deployment/computeshare-frontend computeshare-frontend=hamstershare/computeshare-frontend:$(TIMESTAMP)

docker-only:
	docker build -f script/Dockerfile -t hamstershare/computeshare-frontend:$(TIMESTAMP)  .
