# Advanced Docker Full Stack Project

A robust full-stack application demonstrating a microservices architecture using Docker. This project integrates a Node.js backend, a static frontend, a MySQL database, and an Nginx reverse proxy.

## 🚀 Features

*   **Microservices Architecture**: Separate containers for frontend, backend, database, and proxy.
*   **Dockerized**: Fully containerized environment using Docker Compose.
*   **Reverse Proxy**: Nginx handles routing to frontend and backend services.
*   **Database**: MySQL for persistent data storage with automatic initialization.
*   **Frontend**: Interactive UI to add and delete text messages.
*   **Backend**: robust REST API built with Express.js.
*   **Health Checks**: Integrated health checks for all services.
*   **Hot Reload**: Configured for development with auto-restart policies.

## 🛠 Tech Stack

*   **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
*   **Backend**: Node.js, Express.js
*   **Database**: MySQL 8.0
*   **Proxy**: Nginx (Alpine)
*   **Orchestration**: Docker Compose

## 📂 Project Structure

```
├── backend/            # Backend API (Node.js/Express)
│   ├── User.js         # (If applicable)
│   ├── server.js       # Main server entry point
│   └── Dockerfile      # Backend Docker configuration
├── frontend/           # Frontend Static Files
│   ├── index.html      # Main HTML file
│   ├── script.js       # Frontend logic and API calls
│   ├── style.css       # Styling
│   └── Dockerfile      # Frontend Docker configuration
├── nginx/              # Nginx Configuration
│   └── default.conf    # Nginx routing rules
├── docker-compose.yml  # Docker services orchestration
├── .env                # Environment variables
└── README.md           # Project documentation
```

## Project Workflow
![Project Screenshot](Screenshots/workflow.png)

## 📋 Prerequisites

Ensure you have the following installed on your machine:

*   [Docker](https://docs.docker.com/get-docker/)
*   [Docker Compose](https://docs.docker.com/compose/install/)

## ⚙️ Setup & Installation

1.  **Clone the Repository** (if you haven't already):
    ```bash
    git clone <repository-url>
    cd advanced-docker-project
    ```

2.  **Environment Configuration**:
    Create a `.env` file in the root directory if it doesn't exist, and add your database credentials:
    ```env
    MYSQL_ROOT_PASSWORD=rootpassword
    MYSQL_DATABASE=miniproject
    MYSQL_USER=user
    MYSQL_PASSWORD=password
    DB_HOST=mysql
    ```

3.  **Build and Run**:
    Execute the following command to build the images and start the containers:
    ```bash
    docker-compose up --build -d
    ```

4.  **Access the Application**:
    Open your browser and navigate to:
    *   **Frontend**: [http://localhost](http://localhost) (Served via Nginx on port 80)
    *   **Backend Health Check**: [http://localhost/api/health](http://localhost/api/health)

## 📡 API Endpoints

The backend API is accessible via Nginx at `/api/`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/all` | Fetch all saved messages. |
| `POST` | `/api/add` | Add a new message. Body: `{ "content": "text" }` |
| `DELETE` | `/api/delete/:id` | Delete a message by ID. |
| `GET` | `/api/health` | Check backend health status. |

## 🛑 Stopping the Services

To stop and remove the containers, networks, and volumes (optional):
```bash
docker-compose down
```
To remove volumes as well (wipes database data):
```bash
docker-compose down -v
```

## 🐛 Troubleshooting

*   **Database Connection Refused**: If the backend fails to connect immediately, it is designed to retry until the MySQL container is ready. Wait a few seconds for the health checks to pass.
*   **Port Conflicts**: Ensure ports `80` (Nginx), `3000` (Backend - internal), and `3306` (MySQL - internal) are not occupied on your host or modify the mapping in `docker-compose.yml`. note that only port 80 is exposed to host in the current configuration.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests.
