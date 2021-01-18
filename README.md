# ACME IOT Technical Project
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

--------------------------------------------------------------------------------------------------------------------
Helper Steps
--------------------------------------------------------------------------------------------------------------------
8. If you make any changes to the code, you can rebuild the project by running "docker-compose build" and then "docker-compose up"

9. You can stop the containers using Ctrl+C or the command docker stop <container_id> in your terminal.

10. You can check if the services are running currently using the command "docker ps -a"

11. You can clean the docker services by using the command "docker system prune"
--------------------------------------------------------------------------------------------------------------------



### API Endpoints

```
1. Get devices present in the cloud (GET HTTP Method)
   URL           :    "http://localhost:5000/getdevices"
   JSON Response :    [
                        {
                            "id": 1,
                            "industry": "Automobile",
                            "name": "Model X",
                            "status": [
                                {
                                    "sname": "Fluid levels",
                                    "value": "25 ml"
                                },
                                {
                                    "sname": "Tire Pressure",
                                    "value": "30 psi"
                                }
                            ],
                            "type": "AI Device"
                        },
                        {
                            "id": 2,
                            "industry": "Home appliances",
                            "name": "LG Fridge",
                            "status": [
                                {
                                    "sname": "Ice level",
                                    "value": "20%"
                                },
                                {
                                    "sname": "Defrost alarm",
                                    "value": "10 min"
                                }
                            ],
                            "type": "Smart Fridge"
                        }
                      ]

2. Create a sensor device (POST HTTP Endpoint) : 
   URL           : "http://localhost:5000/createdevice"
   JSON Input    : {
                        "name": "Nest Mini4",
                        "status":[{"sname":"Devices","value":"6"},{"sname":"Reminder","value":"2"}],
                        "type": "Smart device control",
                        "industry": "Home appliances"
                    }
   JSON Response : "Device added successfully!"
   Status        :  200, OK

3. Update a sensor device state (PUT HTTP Endpoint) :
   URL           : "http://localhost:5000/updatedevice/10"
   JSON Input    : {
                        "name": "Nest Mini5",
                        "status":[{"sname":"Connections","value":"4"},{"sname":"Lists","value":"5"}],
                        "type": "Smart device",
                        "industry": "Home appliances"
                   }
   JSON Response : "Device updated Successfully!"
   Status        :  200, OK

4. Delete a sensor device (DELETE HTTP Endpoint) :
   URL           : "http://localhost:5000/deletedevice/<device_id>"
   Example       : "http://localhost:5000/deletedevice/10"
   JSON Response : "Device deleted"

```

### Repository Links:
"https://github.com/typemaster007/acme_iot.git"