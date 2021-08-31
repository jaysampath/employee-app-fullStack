import classes from "./UpdateEmlpoyee.module.css";
import { useState } from "react";
import { useHistory, useLocation, Prompt } from "react-router-dom";

const UpdateEmployee = (props) => {
  const location = useLocation();
  let params = location.state;
  const history = useHistory();
  const [firstNameInput, setFirstNameInput] = useState(params.firstName);
  const [lastNameInput, setLastNameInput] = useState(params.lastName);
  const [emailInput, setEmailInput] = useState(params.email);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isEntering, setIsEntering] = useState(false);
  const paramsId = params.id;
  //console.log(params);
  console.log('isEntering: ',isEntering);
  const firstNameChangeHandler = (event) => {
    setFirstNameInput(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setLastNameInput(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const cancelHandler = () => {
    setIsEntering(false);
    history.replace("/employees");
  };

  const updateEmployeeFocusHandler = () => {
    console.log('focusss')
    setIsEntering(true);
  };

  const emailValidate = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const updateHandler = (event) => {
    event.preventDefault();
    setIsEntering(false);
    const updatedFirstName = firstNameInput;
    const updatedLastName = lastNameInput;
    const updatedEmail = emailInput;
    const id = params.id;
    if (
      updatedEmail === params.email &&
      updatedFirstName === params.firstName &&
      updatedLastName === params.lastName
    ) {
      setIsEntering(false);
      setErrorMsg("Nothing is changed!");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return;
    }

    // console.log(  "updated values: " +   id +   " " +    updatedFirstName +   " " +   updatedLastName +   " " +  updatedEmail  );

    if (
      updatedFirstName.trim().length === 0 ||
      updatedLastName.trim().length === 0 ||
      updatedEmail.trim().length === 0
    ) {
      setErrorMsg("All inputs are mandatory");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return;
    }

    if (!emailValidate(updatedEmail)) {
      setErrorMsg("Email is invalid");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return;
    }

    const updatedEmployee = {
      empId: id,
      firstName: updatedFirstName,
      lastName: updatedLastName,
      email: updatedEmail,
    };

    const updateEmployee = async () => {
      if (
        !window.confirm(
          "Are you sure. you want to update this employee's details?"
        )
      ) {
        return;
      }
      setIsUpdating(true);
      const response = await fetch("/api/employees", {
        method: "PUT",
        body: JSON.stringify(updatedEmployee),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Error while updating employee");
      }
      //  const data = await response.json();
      // console.log("new update response: ", data);
      setIsUpdating(false);
      setIsEntering(false);
      setSuccessMsg(`Employee with id- ${paramsId}  updated Successfully!`);
      setTimeout(() => {
        setSuccessMsg("");
        history.replace("/employees");
      }, 3000);
      // setEmailInput("");
      // setFirstNameInput("");
      // setLastNameInput("");
      // history.replace("/employees");
    };

    try {
      updateEmployee().catch((error) => {
        console.log(error.message);
        setIsUpdating(false);
      });
    } catch (error) {}
  };

  if (isUpdating) {
    return (
      <p className={classes.successDiv}>
        Updating the employee (id= {paramsId}) details
      </p>
    );
  }

  return (
    <div>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave? All your entered data will be lost!"
        }
      />
      <h1 className={classes.updateTitle}>
        Update Employee with Id - {paramsId}
      </h1>
      <div className={successMsg === "" ? "" : classes.successDiv}>
        {successMsg}
      </div>
      <div className={errorMsg === "" ? "" : classes.errorDiv}>{errorMsg}</div>
      <div className={classes.update}> 
      <form onFocus={updateEmployeeFocusHandler} >
        <div className={classes.control}>
          <label className="form-label">First name</label>
          <input
            className="form-control"
            type="text"
            onChange={firstNameChangeHandler}
            value={firstNameInput}
          />
        </div>
        <div className={classes.control}>
          <label className="form-label">Last name</label>
          <input
            className="form-control"
            type="text"
            onChange={lastNameChangeHandler}
            value={lastNameInput}
          />
        </div>
        <div className={classes.control}>
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            onChange={emailChangeHandler}
            value={emailInput}
          />
        </div>
        <div className={classes.actions}>
          <button
            onClick={updateHandler}
            type="submit"
            className={classes.button1}
          >
            Update
          </button>
          
        </div>
      </form>
      <button
            className={classes.button2}
            type="button"
            onClick={cancelHandler}
          >
            Cancel
          </button>
      </div>
      
    </div>
  );
};

export default UpdateEmployee;
