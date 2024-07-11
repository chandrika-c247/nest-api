## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Installation

1. Clone the repo
   ```sh
   git clone https://{github_username}:{github_token}@github.com/chandrika-c247/nest-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## <a name="docker">🐳 Docker</a>

This app is Docker ready !

The Dockerfile is available at the root of the project.

### 🚀 Production mode

To run the app with Docker, command are available :

```bash
docker compose up
```
When starting the app in production mode with Docker, a container for the API and a container for the MongoDB database are created.

Docker compose will use the `production` step of the Dockerfile to build the image.

For more information, please check the **[docker-compose.yml file](https://github.com/chandrika-c247/nest-api/blob/main/docker-compose.yml)**.


## <a name="env-variables">🌿 Env variables</a>

Environnement files are available in the **[env example file](https://github.com/chandrika-c247/nest-api/blob/main/.env.example)**.

You can create a `.env` file in root directory to override the default values when starting the API locally.

Environment variables are :

|        Name         |               Description               | Required |
|:-------------------:|:---------------------------------------:|:--------:|
|       `PORT`        | Port on which the API will be available |    ✅     |
|  `JWT_EXPIRATION`   | The expiration time (In second) after which the JWT MUST token will expire.  |    ✅     |
|    `JWT_SECRET`     | Using the same key you can generate JWT token |    ✅     |
|    `MONGODB_URI`    | Mongo DB database url                   |    ✅     |
|     `MAIL_HOST`     | Mail host provider                      |    ❌     |
|    `MAIL_USER`      | Mail user name                          |    ❌     |
|  `MAIL_PASSWORD`    | Mail password                           |    ❌     |
|    `MAIL_FROM`      | Email address for mail sender address   |    ❌     |

## <a name="github-actions">🐙 GitHub Actions</a>

This project uses **GitHub Actions** to automate some boring tasks.

You can find all the workflows in the **[.github/workflows directory](https://github.com/chandrika-c247/nest-api/tree/main/.github/workflows).**

## File-Upload-using-Multer
File Upload in Nest.js using Multer is an important feature for any web application. Multer is a Node.js or express middleware, that makes it easy to handle multipart/form-data when your users upload files. When a website user uploads a file to a server, it is usually submitted via a form and encoded as multipart/form-data. Before using it you have to create a uploads folder inside root directory.

Read More: https://github.com/chandrika-c247/nest-api/blob/main/src/auth/auth.controller.ts?plain=1#L58

<!-- ROADMAP -->
## Feature included

- [x] JWT Token
- [x] User authentication
- [x] Nodemailer
- [x] Multer for image upload
- [x] Swagger for api documentation
- [x] Role by API access
- [x] API validation
- [x] Dockerize app
- [x] CI/CD pipeline using guthub workflow
