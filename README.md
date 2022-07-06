# ChatApp
Welcome to ChatApp, a chat application implemented using Node.js, Express.js, and Socket.io and employs a microservice architecture.

## Demo
![DemoGIF](./chatapp.gif)

## Application Links

- [Link to ChatApp](http://34.64.236.148:3000/) 
- [Demo Video On Youtube](https://www.youtube.com/watch?v=5frHxp0aO3Q&ab_channel=bereketsiyum)

## Description

- ChatApp is a chat application that is implemented as a couple of microservices communicating with each other. The application uses 4 services. 
  - The chat messaging service
  - The User information service.
  - Mysql and Mongodb services.
- The chat messaging service that employs node.js and express.js to create neat APIs, and socket.io library for dynamic client/server interaction.
- The second is a user authentication and management service that employs Restify to implement REST interface and a data model using Sequelize to communicate with a database to add users and stores user information such as username, password, etc .. in the database. the users directory corresponds to this service.
- The third and fourth services are a mysql database to store user information and a mongodb database to store chat messages. The data models of the databases are in models directory, named Chat and Message modules.
- I used 
- Finally, I deployed ChatApp using Google Kubernetes Engine(GKE) with 4 pods running corresponding to the 4 microservices. I containerized the 4 microservices using docker and uses those containers to create the pods. The yaml files for the containers are in the GKE_Yaml directory. Below are the screenshots of the running pods in the GKE and also cluster services.


![Screen Shot 2022-07-06 at 3 16 15 PM](https://user-images.githubusercontent.com/60803336/177481948-d4cdd39d-e12c-42b3-a20a-e4579297fb35.png)

![Screen Shot 2022-07-06 at 3 16 42 PM](https://user-images.githubusercontent.com/60803336/177482006-9f06b4a9-1e5b-4f94-88b1-b99961c637cd.png)

## Authors

+ Bereket Assefa
