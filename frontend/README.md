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

## Setup Instructions for FRONTEND

`Instructions for configuring the backend are in the flatirons-server readme.`

### 1. Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Yarn](https://yarnpkg.com/) or npm

Modify the .env file with your database credentials.

### 2️ Installation

Clone the repository and install dependencies:

```sh
 git clone https://github.com/flatironsdevelopment/rails_node_test_MCastegnaro.git

cd rails_node_test_MCastegnaro/wabapp/flatirons-ui

npm install  # or yar install
```

### 3 Running the Project

Start the development server:

```sh
yarn dev  # or npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 4 Building for Production

To create an optimized production build:

```sh
yarn build  # or npm run build
```

Then, start the server:

```sh
yarn start  # or npm start
```

# Screenshots

List of products

![Project Logo](assets/list.png)

Upload a csv file

![Project Logo](assets/upload.png)

Change currency

![Project Logo](assets/currency.png)

Order by name, price and expiration

![Project Logo](assets/order.png)

Search for name, price and expiration

![Project Logo](assets/search.png)

Upload massive csv files

![Project Logo](assets/massive.png)

## 📜 License

This project is licensed under the MIT License.
