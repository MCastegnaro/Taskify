# 🚀 Full Stack Project (Frontend & Backend)

This project consists of a **NestJS** backend and a **Next.js** frontend, using **PostgreSQL** as the database and **Docker** for containerization.

---

## 📌 Technologies Used

### Backend:

- [NestJS](https://nestjs.com/) - Node.js framework
- [TypeORM](https://typeorm.io/) - ORM for database management
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Docker](https://www.docker.com/) - Containerization
- [Adminer](https://www.adminer.org/) - Simple local SGBD
- [Jest](https://jestjs.io/) - Automated testing

### Frontend:

- [Next.js](https://nextjs.org/) - React-based framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Axios](https://axios-http.com/) - HTTP client for API requests

---

## Setup Instructions for BACKEND

`Instructions for configuring the frontend are in the flatirons-ui readme.`

### 1️. Clone the Repository

```bash
git clone https://github.com/flatironsdevelopment/rails_node_test_MCastegnaro.git

cd rails_node_test_MCastegnaro/wabapp/flatirons-server
```

### 2️. Setup Environment Variables

Create a .env file in the backend/ directory using .env.example as a reference:

```bash
cp ./webapp/flatirons-server/.env.example ./webapp/flatirons-server/.env.example

```

Modify the .env file with your database credentials.

### 3. Create and running a database with Docker

In the root of flatirons-server folder run `docker-compose up -d`. This command will upload a postgres database that will be available in `localhost:8080` through Adminer SGDB.

### 4. Apply database migrations

In the root of flatirons-server folder run `npm run migration:run`. This command will create the necessary tables in the database.

### 5. Running the Backend

In the root of flatirons-server folder run the fallows commands:

```bash
npm install
npm run start:dev
```

These commands will first install the project's necessary dependencies and then make the API available for access in `localhost:3333` .

# key features

GET /products - get a list of products

![Project Logo](assets/api.png)

POST /products/upload - upload a csv file

![Project Logo](assets/upload.png)

### Common problems

- Error connecting to database:
  Make sure PostgreSQL containers are running (docker ps).

- ECONNREFUSED error when starting the API:
  The bank may not be ready. Wait a few seconds or restart Docker:

```bash
docker-compose restart
```

- Migrations not applied correctly:
  Check the connection with the bank and run again:

```bash
npm run migration:run
```

### You are now ready to run the project! Enjoy 🚀

## 📜 License

This project is licensed under the MIT License.
