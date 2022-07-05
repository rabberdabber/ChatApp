ls
rm -r compose
clear
ls
docker images
clear
ls
clear
ls
clear
ls
gcloud container clusters get-credentials rabberdabber-chatapp --region asia-northeast3 --project voltaic-cocoa-355013
docker ps
clear
ls
kubectl apply -f .
clear
docker ps
docker ps -a
docker images
clear
kubectl get po
clear
ls
docker images
ls
docker images
docker tag 20170844/chats chats
docker teag 20170844/userauth userauth
docker tag 20170844/userauth userauth
clear
docker ps
docker images
kubectl get po
kubectl apply -f .
clear
kubectl get po
docker images
docker tag chats compose_chats
docker tag userauth compose_userauth
docker images
clear
ls
kubectl apply -f .
kubectl get po
docker images
gcloud container clusters get-credentials rabberdabber-chatapp --region asia-northeast3 --project voltaic-cocoa-355013
mongo
clear
docker images
docker tag chats asia.gcr.io/voltaic-cocoa-355013/chats:version1
docker push 
Push an image or a repository to a registry
docker images
docker push asia.gcr.io/voltaic-cocoa-355013/chats:version1
clear
ls
kubectl apply -f .
clear
kubectl get po
docker networks ps
docker network ps
clear
docker network ls
kubectl apply -f .
kubectl get po
kubectl delete pods chats-7d6df86dd-8gpbz 
kubectl get po
clear
kubectl apply -f .
kubectl get po
clear
kubectl get po
kubectl get services
kubectl get po
clear
kubectl get po
kubectl get services
curl 10.92.0.156:3000
curl --version
kubectl exec -it chats-79ffbcf6-n5f72 sh
clear
ls
kubect get po
kubectl get po
kubectl describe pod db-userauth-84cf9bc446-hxgx7
clear
kubectl apply -f .
clear
kubectl apply -f .
clear
kubectl describe pod db-userauth-84cf9bc446-hxgx7
clear
kubectl get po
kubectl get deployment
kubectl delete deployment db-userauth
kubectl get po
ls
kubectl apply -f .
clear
kubectl get po
kubectl get db-userauth-84cf9bc446-gh8jf
kubectl get po
kubectl logs db-userauth-84cf9bc446-gh8jf
kubectl get po
kubectl get db-userauth-84cf9bc446-gh8jf
kubectl logs db-userauth-84cf9bc446-gh8jf
clear
kubectl apply -f .
kubectl get po
kubectl get deployment
kubectl expose deployment chats --name=chats-service --type=LoadBalancer --port 3000 --target-port 3000
kubectl get service
clear
kubectl get po
kubectl expose deployment userauth --name=userauth-service --type=LoadBalancer --port 3333 --target-port 3333
kubectl expose deployment mongochat --name=mongochat-service --type=LoadBalancer --port 27017 --target-port 27017
docker ps
kubectl get po
kubectl get services
kubectl get endpoints chats-service
kubectl get services
clear
kubectl get endpoints chats-services
kubectl get endpoints chats-service
kubectl get deployment
kubectl get services
clear
kubectl describe service chats-service
kubectl get services
curl http://34.64.86.140:3000
clear
kubectl run -it --rm --restart=Never chats 
kubectl run -it --rm --restart=Never chats --image=20170844/chats sh
clear
kubectl get po
kubectl get deployment
kubectl exec chats-79ffbcf6-n5f72 -c chats -- sh
kubectl exec chats-79ffbcf6-n5f72 bash
kubectl exec chats-79ffbcf6-n5f72 -- bash
kubeclt get pod
kubectl get pod
kubectl exec chats-79ffbcf6-n5f72 -- sh
kubectl exec -it  chats-79ffbcf6-n5f72 -- sh
clear
kubectl get services
kubectl get endpoints
ls
kubectl get services
kubectl get deployments
clear
kubect get service chats-service --output yaml
kubectl get service chats-service --output yaml
kubectl exec -it chats -- sh
clear
kubectl get deployments
kubectl get services
kubectl exec chats -it -- bash
clear
kubectl get endpoints chats
kubect get endpoints chats
kubectl get endpoints chats
kubectl exec -it chats -- bash
ls
clear
ls
kubectl exec -it chats -- bash
gcloud container clusters get-credentials rabberdabber-chatapp --region asia-northeast3 --project voltaic-cocoa-355013
clear
kubectl get deployments
kubectl get endpoints
docker exec -it chats -- bash
kubectl get po
docker exec -it chats-79ffbcf6-n5f72 -- bash
kubectl get po
kubectl exec -it chats -- bash
kubectl get pods
kubectl describe chats-79ffbcf6-n5f72
kubectl describe chats
kubectl get pods -l app=chats
kubectl get pods -l
kubectl get pods 
kubectl get deployments
clear
kubectl get pods
kubectl get deployments
kubectl get pods -l app=chats
kubectl get pods -l app=userauth
kubectl get pods -l app=mongochat
clear
kubectl get deployments
kubectl get pods -l app=hostnames
kubectl get pods -l app=chats
kubectl get pods --all-namespaces
kubectl get pods -l default=chats
kubectl get pods -l default
clear
kubectl get pods --all-namespaces
kubectl get pods chats
clear
kubectl get pods -l chats -o go-template='{{range .items}}{{.status.podIP}}{{"\n"}}{{end}}'
kubectl get pods -l chats
kubectl get pods chats
kubectl get pods chats -o go-template='{{range .items}}{{.status.podIP}}{{"\n"}}{{end}}'
clear
kubectl get pods -o go-template='{{range .items}}{{.status.podIP}}{{"\n"}}{{end}}'
kubectl get services
kubectl get deployments
kubectl get endpoints
kubectl get po
kubectl exec -it chats-79ffbcf6-n5f72 -- bash
kubectl get services
kubectl get svc chats-service
kubectl get svc chats
clear
nslookup kubernetes.default
kubectl exec -it chats-79ffbcf6-n5f72 -- bash
kubectl get
kubectl get chats
kubectl get svc chats
kubectl exec -it chats-79ffbcf6-n5f72 -- bash
kubectl get svc chats
clear
kubectl get endpoints chats
kubectl exec -it chats-79ffbcf6-n5f72 -- bash
clear
kubectl get po
kubectl get endpoints
kubectl get services
kubectl exec -it chats-79ffbcf6-n5f72 -- bash
kubectl get nodes --output wide
gcloud compute firewall-rules create test-node-port --allow tcp:
kubectl get services
clear
kubectl get service chats-services --output yaml
kubectl get service chats-service --output yaml
curl 34.64.86.140:3000
kubectl get nodes --output wide
gcloud compute firewall-rules create test-node-port --allow tcp:32070
kubectl get endpoints
curl 34.64.40.23:32070
clear
kubectl get service chats-service --output yaml
kubectl get service chats --ouput yaml
kubectl get service chats --output yaml
kubectl get services
clear
kubectl get services
kubectl get service chats --output yaml
clear
kubectl get nodes --ouput wide
kubectl get nodes --output wide
clear
ls
kubectl get nodes --output wide
kubectl get service chats --output yaml
clear
kubectl get services
kubectl get service chats-service --output yaml
curl 34.64.86.140:32070
gcloud compute firewall-rules create test-node-port --allow tcp:32070
clear
gcloud compute firewall-rules delete test-node-port
clear
ls
kubectl get deployments
kubectl expose deployment chats --name chats-service-rabb --type NodePort --protocol 80 --target-port 3000
kubectl expose deployment chats --name chats-service-rabb --type NodePort --protocol TCP --port 80 --target-port 3000
kubectl get services
kubectl get service chats-service-rabb --output yaml
gcloud compute firewall-rules create test-node-port --allow tcp:30462
kubectl get nodes --ouput wide
kubectl get nodes --output wide
curl 34.64.40.23:30462
clear
kubectl exec -it chats-79ffbcf6-n5f72 -- bash
kubectl get services
kubectl get service chats-service-rabb --output yaml
kubectl get service mongochat-service --output yaml
curl 34.64.136.141:27017
clear
kubectl get services
kubectl exec -it chats-79ffbcf6-n5f72 -- bash
kubectl get services
kubectl exec -it chats-79ffbcf6-n5f72 -- bash
kubectl get services
kubectl exec -it chats-79ffbcf6-n5f72 -- bash
kubectl get nodes --output wide
kubectl exec -it chats-79ffbcf6-n5f72 -- bash
kubectl get services
kubectl delete services chats-service chats-service-rabb mongochat-service userauth-service
kubectl get services
kubectl exec -it chats-79ffbcf6-n5f72 -- bash
kubectl get services
gcloud compute firewall-rules delelte test-node-port
gcloud compute firewall-rules delete test-node-port
clear
kubectl get service chats --watch
kubectl expose deployment chats --name chats-service --type LoadBalancer --port 80 --target-port 3000
kubectl get services
curl http://34.64.236.148
kubectl logs chats-service
clear
kubectl describe services
clear
kubectl get services
kubectl get services chats-service yaml
kubectl get services chats-service -o  yaml
gcloud compute firewall-rules create my-rule --allow=tcp:80
curl http://34.64.236.148:80
curl http://34.64.236.148:80/
gcloud compute firewall-rules delete my-rule
clear
ls
kubectl get deployments
kubectl get services
kubectl delete service chats-service
kubectl get services
clear
kubectl get deployment
kubectl expose deployment chats --type=LoadBalancer --name=chats-service 
kubectl get services chats-service
clear
kubectl get services chats-service
kubectl describe services chats-service
kubectl get pods --output=wide
kubectl describe pods chats
kubectl describe services my-service
kubectl describe services chats-service
curl http://34.64.136.141:3000
clear
minikube
clear
minikube service chats-service
curl https://34.64.136.141:3000
kubectl get deployments
kubectl describe deployments
clear
kubectl get services
kubectl exec -it chats-79ffbcf6-n5f72 -- bash
clear
kubectl get deployments
kubectl logs -f deployment/chats
clear
kubectl logs -f deployment/userauth
clear
kubectl get services
sudo ip route list table local | grep 10.92.0.188
sudo ip route list table local | grep 34.64.136.141
sudo ip route list table local
kubectl get services chats-service -o yaml
curl http://34.64.136.141:3000
clear
kubectl get services
kubectl get services chats-service -o yaml
kubectl expose deployment chats --name=chats-service --type=LoadBalancer --port 80 --target-port 3000
clear
kubectl get services
kubectl exec -it chats-79ffbcf6-n5f72 -- bash
kubectl get services
clear
kubectl get services
clear
kubectl logs deployments/chats
kubectl logs services/chats-service
clear
kubectl get services
kubectl get deployments
kubectl get pods
clear
kubectl get deployments
gcloud deployment-manager deployments delete chats  --delete-policy=ABANDON
kubectl get deployments
clear
kubectl get po
kubectl get deployments
clear
ls
touch mysql-pod.yml mysql-service.yml mongo-pod.yml mongo-service.yml chats-pod.yml chats-service.yml userauth-pod.yml userauth-service.yml
clear
kubectl apply -f .
clear
kubectl get pods
clear
kubectl get pods
kubectl describe db-userauth
kubectl describe pod db-userauth
kubectl get pods
kubectl get services
clear
ls
clear
kubectl get pods
kubectl logs pods db-userauth
kubectl logs  db-userauth
kubectl apply -f mysql-pod.yml
clear
kubectl apply -f mysql-pod.yml
clear
kubectl get po
kubectl delete pods db-userauth --grace-period=0 --force
kubectl get po
clear
kubectl apply -f mysql-pod.yml
kubectl get po
kubectl get services
kubectl logs chats
kubectl logs userauth
clear
kubectl get services
kubectl exec -it chats -- bash
ls
kubectl get po
kubectl delete pods chats --grace-period=0 --force
clear
kubectl get po
ls
cat chats-pod.yml
docker images
clear
docker images
ls
kubectl apply -f chats-pod.yml
kubectl get po
kubectl exec -it chats -- bash
kubectl get po
kubectl logs chats
kubectl logs userauth
kubectl exec -it chats -- bash
kubectl get po
kubectl get services
clear
kubectl get po
kubectl delete pods userauth --grace-period=0 --force
kubectl get po
clear
ls
kubectl get po
ls
kubectl apply -f userauth-pod.yml
clear
kubectl get po
clear
kubectl get services
clear
kubectl get po
kubectl delete pods chats --grace-period=0 --force
clear
kubectl get po
clear
ls
kubectl apply -f chats-pod.yml 
clear
kubectl get po
ls
kubectl exec -it chats -- bash
clear
kubectl delete pods chats --grace-period=0 --force
kubectl get po
ls
kubectl apply -f chats-pod.yml 
kubectl get po
kubectl delete pods chats --grace-period=0 --force
clear
kubectl apply -f chats-pod.yml 
kubectl get po
clear
kubectl get po
clear
kubectl delete pods chats --grace-period=0 --force
kubectl apply -f chats-pod.yml 
clear
kubectl delete pods chats --grace-period=0 --force
clear
ls
kubectl apply -f chats-pod.yml 
clear
kubectl get po
kubectl apply -f chats-pod.yml 
kubectl get po
kubectl delete pods chats --grace-period=0 --force
clear
kubectl apply -f chats-pod.yml 
clear
kubectl get po
kubectl delete pods chats --grace-period=0 --force
clear
kubectl get test-node-port
kubectl apply -f chats-pod.yml 
clear
kubectl get po
clear
kubectl delete pods chats --grace-period=0 --force
kubectl get po
kubectl apply -f chats-pod.yml 
clear
ls
clear
ls
clear
ls
pwd
