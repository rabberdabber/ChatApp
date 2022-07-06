# ChatApp
Welcome to ChatApp, a chat application implemented using Node.js, Express.js, and Socket.io and employs Restful interface and a microservice architecture.

## Used Languages,Frameworks,Databases and technologies
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

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
- I used HTML/CSS and Bootstrap to make minimal UI.
- Finally, I deployed ChatApp using Google Kubernetes Engine(GKE) with 4 pods running corresponding to the 4 microservices. I containerized the 4 microservices using docker and uses those containers to create the pods. The yaml files for the containers are in the GKE_Yaml directory. Below are the screenshots of the running pods in the GKE and also cluster services.


![Screen Shot 2022-07-06 at 3 16 15 PM](https://user-images.githubusercontent.com/60803336/177481948-d4cdd39d-e12c-42b3-a20a-e4579297fb35.png)

![Screen Shot 2022-07-06 at 3 16 42 PM](https://user-images.githubusercontent.com/60803336/177482006-9f06b4a9-1e5b-4f94-88b1-b99961c637cd.png)

## Authors

+ Bereket Assefa
