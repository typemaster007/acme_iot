# acme_iot
ACME Iot Sensor data simulation and visualization app (Frontend + Backend)

This project simulates the creation, deletion, updation of IOT sensor data(Like Thermostats, Smart bulbs, smart home devices etc) and also visualizes the updated live data as a dashboard to the user.

The frontend of the project(Dashboard and sensor data simulator) is built in ReactJS and the backend server logic is built using Python Flask. The database used here is MongoDB atlas.

Both the frontend and backend of the project are dockerized for easy building and running of the services.


Getting started
---------------

The stack has been assembled as a series of Docker containers using `docker-compose`. The network is defined in `docker-compose.yml`.
The dockercompose utilizes the dockerfiles present in the frontend and backend projects.

### Building and running the project

1. If you already have the acme_iot project folder in your local folder you can skip this step otherwise clone the full project repository in your local folder using the command "git clone https://github.com/typemaster007/acme_iot.git" in the command line

2. Change directory to the folder acme_iot

3. Make sure you have docker and docker-compose installed in your system.

4. Run the command "docker-compose up"

5. Docker-compose (the above command) will install the necessary libraries,dependent files and builds the frontend and backend projects.

6. You can then access the frontend of the project in your localhost browser with the following url "http://localhost:3000"

Note: The project is designed for a localhost environment so make sure the browser you are using is in the localhost machine (Example ubuntu 18.04 with GUI having Mozilla)

7. The backend REST server of the project can be accessed in the local browser at "http://localhost:5000/getdevices"

---------------------------------------------------
Troubleshooting
----------------------------------------------------
8. You can stop the containers using Ctrl+C or the command docker stop <container_id> in your terminal.

9. You can check if the services are running currently using the command "docker ps -a"

10. You can clean the docker services by using the command "docker system prune"

```
$ docker-compose up