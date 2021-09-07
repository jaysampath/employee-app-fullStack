import classes from "./NewEmployee.module.css";
import { Fragment, useRef, useState } from "react";
import { useHistory, Prompt } from "react-router-dom";
const NewEmployee = () => {
  const [isadding, setIsAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isEntering, setIsEntering] = useState(false);
  const history = useHistory();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();

  const emailValidate = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const cancelHandler = () => {
    history.replace("/employees");
  };

  const addEmployeeFocusHandler = () => {
    //console.log('focusss')
    setIsEntering(true);
  };

  const addNewEmployeeHandler = (event) => {
    event.preventDefault();
    setIsEntering(false);
    const newFirstName = firstNameInputRef.current.value;
    const newLastName = lastNameInputRef.current.value;
    const newEmail = emailInputRef.current.value;

    if (
      newFirstName.trim().length === 0 ||
      newLastName.trim().length === 0 ||
      newEmail.trim().length === 0
    ) {
      setIsEntering(false);
      setErrorMsg("All inputs are mandatory");
      const inputCheckTimer = setTimeout(() => {
        setErrorMsg("");
        clearTimeout(inputCheckTimer);
      }, 3000);
      return;
    }

    if (!emailValidate(newEmail)) {
      setErrorMsg("Email is invalid");
      const emailValidateTimer = setTimeout(() => {
        setErrorMsg("");
        clearTimeout(emailValidateTimer);
      }, 3000);
      return;
    }

    const newEmployee = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
    };

    const addEmployee = async () => {
      setIsAdding(true);
      const response = await fetch("/api/employees", {
        method: "POST",
        body: JSON.stringify(newEmployee),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Error while adding new employee");
      }
      //const data = await response.json();
      // console.log("new add response: ", data);
      setIsAdding(false);
      setSuccessMsg("New Employee Add Successfully!");
      const succesMsgTimer = setTimeout(() => {
        setSuccessMsg("");
        // history.replace("/employees");
        clearTimeout(succesMsgTimer);
      }, 3000);
      // history.replace("/employees");
    };

    try {
      addEmployee().catch((error) => {
        // console.log(error.message);
        setErrorMsg(error.message);
        setIsAdding(false);
        const errorTimer =  setTimeout(() => {
          setErrorMsg("");
          clearTimeout(errorTimer);
        }, 5000);
      });
    } catch (error) {}
  };
  if (isadding) {
    return <p className={classes.isAdding} >Adding new Employee to your company's data</p>;
  }

  return (
    <Fragment > 
    <h1 className={classes.addTitle}>Add an employee to your company</h1>
    <div className={successMsg === "" ? "" : classes.successDiv}>
      {successMsg}
    </div>
    <div className={errorMsg === "" ? "" : classes.errorDiv}>{errorMsg}</div>
    <div className={classes.add}>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave? All your entered data will be lost!"
        }
      />
    
      <form  onFocus={addEmployeeFocusHandler}>
        <div className={classes.control}>
          <label className="form-label">First name</label>
          <input className="form-control" ref={firstNameInputRef} type="text" />
        </div>
        <div className={classes.control}>
          <label className="form-label">Last name</label>
          <input className="form-control" ref={lastNameInputRef} type="text" />
        </div>
        <div className={classes.control}>
          <label className="form-label">Email</label>
          <input className="form-control" ref={emailInputRef} type="email" />
        </div>
        <div className={classes.actions}>
          <button
            type="submit"
            onClick={addNewEmployeeHandler}
            className={classes.button1}
          >
            Add
          </button>
        </div>
      </form>
      <button className={classes.button2} type="button" onClick={cancelHandler}>
        Cancel
      </button>
    </div>
    </Fragment>
  );
};

export default NewEmployee;
