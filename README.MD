## About The Project
<p>Hello dear recruiters. The purpose of developing this application is to fulfill the project requested as deliverable by the GPT4Sales recruiting team. The project consists in developing a full stack app, using NestJS and Next.js as main frameworks.</p>

## Built with

[![Next][Nextjs.io]][Nextjs-url]
[![Node.js][Nodejs.io]][Node-url]
[![NestJS][Nestjs.io]][Nest-url]
[![MongoDB][Mongodb.io]][Mongo-url]
[![Docker][Docker.io]][Docker-url]

## Installation
First, we install both NestJS globally, if we don't have them:
```
npm install -g @nestjs/cli
```

Next, enter to both ```frontend``` and ```backend``` dirs using a Terminal, and enter the next command:
```
npm install
```

## Setting up the DB
To launch the database, all that we need is to have Docker installed on our equipment, and then enter the root directory of this repo, and enter the next command:
```
docker-compose up -d
```

## Execute app in dev environment
After we install our ```frontend``` and ```backend``` projects, we can run both of them using the same command, but in each one of the corresponding directories:
```
npm run start:dev
```


[React.io]: https://img.shields.io/badge/react-00C6F7?style=for-the-badge&logo=react&logoColor=white
[Nextjs.io]: https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Nodejs.io]: https://img.shields.io/badge/nodejs-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Nestjs.io]: https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[Mongodb.io]: https://img.shields.io/badge/mongodb-023430?style=for-the-badge&logo=mongodb&logoColor=white
[Docker.io]: https://img.shields.io/badge/docker-1D63ED?style=for-the-badge&logo=docker&logoColor=white


[React-url]: https://angular.io/
[Nextjs-url]: https://nextjs.org/
[Node-url]: https://nodejs.org/
[Nest-url]: https://nestjs.com/
[Mongo-url]:  https://www.mongodb.com/
[Docker-url]: https://www.docker.com/