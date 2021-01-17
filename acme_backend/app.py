from flask_cors import CORS
from pymongo import MongoClient
import pymongo
import json
from flask import Flask, jsonify, request
app = Flask(__name__)

'''
Author: Amogh Adithya Bangalore
This is the backend prototype HTTP server that:
1. Exposes REST endpoints for clients to create a device, delete a device, read a device state, and
   update a device state.
2. Uses MongoDB Atlas which is a cloud-based non relational database that allows for efficient data 
   storage and retrieval.
'''

CORS(app)  # Added this for no access control origin cors policy error in frontend

client = pymongo.MongoClient(
    "mongodb+srv://testuser:test123@cluster0.mlfc9.mongodb.net/test?retryWrites=true&w=majority")
database = client.acme


@app.route("/", methods=["GET"])
def index():
    return "Hello index"

## READ SENSOR DEVICE STATE ##
@app.route("/getdevices", methods=["GET"])
def getdevices():
    device_list = []
    dev_collection = database.devices
    devices = dev_collection.find({}, {'_id': 0})
    for document in devices:
        device_list.append(document)
    print(device_list)
    return jsonify(device_list)

## CREATE NEW SENSOR DEVICE ##
@app.route("/createdevice", methods=["POST"])
def createdevice():
    get_devicedata = request.get_json()
    name = get_devicedata["name"]
    status = get_devicedata["status"]
    type = get_devicedata["type"]
    industry = get_devicedata["industry"]
    
    if not get_devicedata:
        err = {'ERROR': 'No data passed'}
        return jsonify(err)
    else:
        lastid = database.devices.find().sort([("_id", -1)]).limit(1)
        print("Last id:", lastid)
        if (lastid.count()>0): 
            print("Last id=",lastid)
            id = int(lastid[0]["id"]) + 1
        else:
            print("Last id2=",lastid)
            id = 1

        print(id)
        if database.devices.find_one({'name': name}):
            return jsonify("Device already present, cannot add")
        else:
            database.devices.insert(
                {'id': int(id), 'name': name, 'status': status, 'type': type, 'industry': industry })
            return jsonify("Device added successfully!")


## DELETE SENSOR DEVICE ##
@app.route("/deletedevice/<device_id>", methods=["DELETE"])
def deletedevice(device_id):
    if(device_id=='null'):
        return jsonify("Please enter the device ID"),200
    try:
        
        # Delete the device
        delete_device = database.devices.delete_one({"id": int(device_id)})

        if delete_device.deleted_count > 0 :
            # The response
            return jsonify("Device deleted"),200
        else:
            # Resource Not found
            return jsonify("Device not found!")
    except:
        # Error while trying to delete the resource
        # Add message for debugging purpose
        return "Internal server error, check server side log", 500
            

## UPDATE SENSOR DEVICE ##
@app.route("/updatedevice/<device_id>", methods=["PUT"])
def updatedevice(device_id):
    data = request.get_json()
    name = data["name"]
    status = data["status"]
    type = data["type"]
    industry = data["industry"]
    
    if not data:
        err = {'ERROR': 'No data passed'}
        return jsonify(err)
    else:
        # If Device name is passed and is found in db, replace it with the new value
        if name:
            if database.devices.find_one({'id': int(device_id)}):
                database.devices.update_one({'id': int(device_id)}, {
                    "$set": {'name': name, 'status': status, 'type': type, 'industry': industry }})
                return jsonify("Device updated Successfully!"),200
            else:
                return jsonify("Device not found, check if it is present in the database"),404

if __name__ == '__main__':
   app.run(debug=True, host='0.0.0.0')
