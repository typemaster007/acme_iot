import React from 'react';
//import { Container } from "react-bootstrap";
import axios from 'axios';
import Popup from "reactjs-popup";
import "./Simulator.css"

let flag = 0;


const validateForm = (errors) => {
  let valid = false;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => {
      if (val === "set" && flag === 1) {
        valid = true;
      } else {
        valid = false;
      }
    }
  );
  return valid;
};


class SimulatorForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
      formValid: false,
      errorCount: null,
      id: null,
      industry: null,
      name: null,
      status: null,
      type: null,

      posts: [],

      errors: {
        title: "",
        desc: "",
        author: "",
      },
    };
  }

  

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "title":
        if (!event.target.value.match(/^[a-zA-Z0-9 ]+$/i)) {
          event.target.value = event.target.value.replace(
            /[^A-Za-z0-9 ]/gi,
            ""
          );
        } else {
          errors.title =
            value.length < 5 ? "Min 5 alphabetic characters!" : "set";
          if (value.length >= 5) {
            flag = 1;
          } else {
            flag = 0;
          }
        }
        break;

      case "desc":
        if (!event.target.value.match(/^[a-zA-Z0-9,! .]+$/i)) {
          event.target.value = event.target.value.replace(
            /[^A-Za-z0-9.,! ]/gi,
            ""
          );
        } else {
          errors.desc = value.length <= 1 ? "Enter some text!" : "set";
          if (value.length >= 2) {
            flag = 1;
          } else {
            flag = 0;
          }
        }
        break;

      case "author":
        if (!event.target.value.match(/^[a-zA-Z .]+$/i)) {
          event.target.value = event.target.value.replace(/[^A-Za-z. ]/gi, "");
        } else {
          errors.author =
            value.length < 5 ? "Min 5 alphabetic characters!" : "set";
          if (value.length >= 5) {
            flag = 1;
          } else {
            flag = 0;
          }
        }
        break;

      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => {
      //console.log(errors)
    });
    this.setState({ formValid: validateForm(this.state.errors) });
  };
  handleSubmit = () => {
    
    if (
      this.state.name == null ||
      this.state.status == null 
    ) {
      this.play("Empty Fields. Please Enter all details");
    } else {
      axios
        .post("http://localhost:5000/createdevice", this.state)
        .then((response) => {
          //console.log(response)

          if (response.data === "Device already present, cannot add") {
            this.play("Device title already present, enter a different name");
          } else {
            this.play("Device Added Successfully");
            //console.log(this.state)
            this.cancelCourse();
          }
        })
        .catch((error) => {
          //console.log(error)
        });
    }
  };

  handleEdit() {

    var url = "http://localhost:5000/updatedevice/" + this.state.id
    
    axios
    .put(url, this.state)
    .then((response) => {
        //console.log(response)
        if (response.data === "Device updated Successfully!") {
        this.play("Device Updated Successfully");
        } else if (response.data === "Device not found, check if it is present in the database") {
        this.play("Device not found, check if it is present in the database!");
        } else {
        this.play("Device data not passed, Enter Correct data");
        //console.log(this.state)
        }
    })
    .catch((error) => {
        //console.log(error)
    });
    
  }

  handledelete() {
    var url = "http://localhost:5000/deletedevice/" + this.state.id
    
      axios
        .delete(url, this.state)
        .then((response) => {
          
          if (response.data === "Please enter the device ID") {
            this.play("Please enter the device ID");
            }
          else if(response.data === "Device not found!") {
            this.play("Device not found! Incorrect Device ID");
          }
          else{
          this.play("Device deleted successfully!"); }
          this.cancelCourse(); 
        })
        .catch((error) => {
          console.log(error);
        });
    
  }

  resetForm = () => {
    this.setState({ name: "", id: "", status: "" });
  };
  cancelCourse = () => {
    this.setState({ name: "", id: "", status: "" });
    //console.log("Log" +this.state.title)
  };

  play(msg) {
    alert(msg);
    //NewMessageNotification.CustomizedSnackbars()
  }

  render() {

    return (
      <div>
        <h1
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          {" "}
          RentalVista Device Posts
        </h1>
        <div
          className="container"
          ref={this.inputRef}
          style={{
            padding: "25px",
            border: "2px solid black",
            borderRadius: "0.25rem",
            backgroundSize: "cover",
            opacity: "0.9",
          }}
        >
          
            <div className="col wrapper" >
            <div style={{}}>
                <div
                  style={{
                    color: "black",
                    justifyContent: "center",
                    padding: "5px",
                  }}
                >
                  <h3 style={{ justifyContent: "center" }}>
                    Welcome to ACME Sensor Data Simulator!
                  </h3>
                </div>
                <div
                  style={{
                    color: "black",
                    justifyContent: "center",
                    margin: "10px",
                  }}
                >
                  You can create a new sensor device, update it and delete it.
                </div>
              </div>
              <>
                <Popup
                    trigger={
                    <button
                        className="btn btn-primary "
                        style={{
                        padding: "5px",
                        margin: "5px",
                        }}
                    >
                        Create a new sensor Device
                    </button>
                    }
                    modal
                >
                    {(close) => (
                    <div
                        style={{
                        border: "solid 2px",
                        borderRadius: "10px",
                        background: "white",
                        marginTop: '20px',
                        padding: "10px"
                        }}
                    >
                        <h2
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            color: "black",
                        }}
                        >
                        Create Device Details
                        </h2>
                        <div
                        className="validmsg"
                        style={{ margin: "30px" }}
                        >
                        <p
                            className="card-title"
                            style={{ color: "black", margin: "auto" }}
                        >
                            
                            Name:
                            <input
                            className="form-control mb-2"
                            onChange={this.handleChange}
                            noValidate
                            name="name"
                            placeholder="Device Name"
                            style={{ width: "300px", display: "flex" }}
                            />
                        </p>
                        <p style={{ color: "black" }}>
                            Status:{" "}
                            <input
                            className="form-control mb-2 "
                            onChange={this.handleChange}
                            noValidate
                            placeholder="Device Status"
                            name="status"
                            style={{ width: "300px" }}
                            ></input>
                        </p>
                        <p style={{ color: "black" }}>
                            Type:{" "}
                            <input
                            className="form-control mb-2"
                            onChange={this.handleChange}
                            noValidate
                            placeholder="Device Type"
                            name="type"
                            style={{ width: "300px" }}
                            />
                        </p>
                        
                        <p style={{ color: "black" }}>
                            Industry:{" "}
                            <input
                            className="form-control mb-2"
                            onChange={this.handleChange}
                            noValidate
                            placeholder="Industry"
                            name="industry"
                            style={{ width: "300px" }}
                            />
                        </p>
                        <button
                            className="btn btn-success"
                            onClick={() => {
                            close();
                            this.handleSubmit();
                            }}
                        >
                            Create Device
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() => {
                            close();
                            }}
                            style={{ margin: "15px" }}
                        >
                            Cancel
                        </button>
                        </div>
                    </div>
                    )}
                </Popup>
                <Popup
                trigger={
                  <button
                    className="btn btn-primary "
                    style={{
                      padding: "5px",
                      margin: "5px",
                    }}
                  >
                    Edit Device
                  </button>
                }
                modal
              >
                {(close) => (
                  <div
                  style={{
                    border: "solid 2px",
                    borderRadius: "10px",
                    background: "white",
                    marginTop: '25px'
                    }}
                  >
                    <h2
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        color: "black",
                      }}
                    >
                      Edit Device Details
                    </h2>
                    <div
                      className="validmsg"
                      style={{ margin: "20px" }}
                    >
                      <p
                        className="card-title"
                        style={{ color: "black", margin: "auto" }}
                      >
                          
                        Name:
                        <input
                          className="form-control mb-2"
                          onChange={this.handleChange}
                          noValidate
                          name="name"
                          placeholder="Device Name"
                          style={{ width: "300px", display: "flex" }}
                        />
                      </p>
                      <p style={{ color: "black" }}>
                        Device ID:{" "}
                        <input
                          className="form-control mb-2"
                          onChange={this.handleChange}
                          noValidate
                          placeholder="Device ID"
                          name="id"
                          style={{ width: "300px" }}
                        />
                      </p>
                      <p style={{ color: "black" }}>
                        Status:{" "}
                        <input
                          className="form-control mb-2 "
                          onChange={this.handleChange}
                          noValidate
                          placeholder="Device Status"
                          name="status"
                          style={{ width: "300px" }}
                        ></input>
                      </p>
                      <p style={{ color: "black" }}>
                        Type:{" "}
                        <input
                          className="form-control mb-2"
                          onChange={this.handleChange}
                          noValidate
                          placeholder="Device Type"
                          name="type"
                          style={{ width: "300px" }}
                        />
                      </p>
                      
                      <p style={{ color: "black" }}>
                        Industry:{" "}
                        <input
                          className="form-control mb-2"
                          onChange={this.handleChange}
                          noValidate
                          placeholder="Industry"
                          name="industry"
                          style={{ width: "300px" }}
                        />
                      </p>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          close();
                          this.handleEdit();
                        }}
                      >
                        Update Device
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          close();
                        }}
                        style={{ margin: "15px" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </Popup>

              <Popup
                trigger={
                  <button
                    className="btn btn-primary"
                    style={{
                      padding: "5px",
                      margin: "5px",
                    }}
                    noValidate
                  >
                    Delete Device
                  </button>
                }
                modal
              >
                {(close) => (
                  <div
                    style={{
                        border: "solid 2px",
                        borderRadius: "10px",
                        background: "white",
                        padding: "25px"
                    }}
                  >
                    <h2
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        color: "black",
                      }}
                    >
                      Delete Device
                    </h2>
                    <div className="validmsg">
                      <p
                        style={{
                          color: "black",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        Are you sure you want to delete the Device?
                      </p>
                      <hr />
                      <p style={{ color: "black" }}>
                        Device ID:{" "}
                        <input
                          className="form-control mb-2"
                          onChange={this.handleChange}
                          noValidate
                          placeholder="Device ID"
                          name="id"
                          style={{ width: "300px" }}
                        />
                      </p>
                      <div
                        style={{
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            close();
                            this.handledelete();
                          }}
                          style={{ justifyContent: "center" }}
                        >
                          Delete Device
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            close();
                          }}
                          style={{ marginLeft: "20px" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Popup>
              </>  
              
            </div>
          
        </div>
        
      </div>
    );
  }
}

export default SimulatorForm;