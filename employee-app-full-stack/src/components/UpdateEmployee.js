import classes from "./UpdateEmlpoyee.module.css";
import {  useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
const UpdateEmployee = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const params = location.state;
  const [firstNameInput,setFirstNameInput]= useState(params.firstName);
  const [lastNameInput, setLastNameInput] = useState(params.lastName);
  const [emailInput, setEmailInput] = useState(params.email);
 
  //console.log(params);

  const firstNameChangeHandler = event =>{
    setFirstNameInput(event.target.value)
  }

  const lastNameChangeHandler = event =>{
    setLastNameInput(event.target.value)
  }

  const emailChangeHandler = event =>{
    setEmailInput(event.target.value)
  }

 const updateHandler= (event) =>{
    event.preventDefault();
    
    const updatedFirstName = firstNameInput;
    const updatedLastName = lastNameInput;
    const updatedEmail = emailInput;
    const id = params.id;

    console.log('updated values: '+id + " " +updatedFirstName+" "+updatedLastName+" "+updatedEmail);

    if(updatedFirstName.trim().length===0 || updatedLastName.trim().length===0 || updatedEmail.trim().length===0){
      return ;
    }
    
    const updatedEmployee = {
      empId:id,
      firstName:updatedFirstName,
      lastName:updatedLastName,
      email: updatedEmail
    };

    const updateEmployee = async () =>{
      setIsUpdating(true);
       const response = await fetch('/api/employees',{
         method:'PUT',
         body: JSON.stringify(updatedEmployee),
         headers: {
          'Content-Type': 'application/json',
        },
       })
       if(!response.ok){
         console.log(response);
         throw new Error('Error while updating employee');
       }
       const data = await response.json();
       console.log('new update response: ',data);
       setIsUpdating(false);
       setEmailInput('');
       setFirstNameInput('');
       setLastNameInput('');
       history.replace('/employees');
    }

    try{
      updateEmployee().catch(error=>{
        console.log(error.message);
        setIsUpdating(false);
      })
    }catch(error){

    }


   
              
  }

  if(isUpdating){
    return <p>Updating the employee (id= {}) details</p>
  }

  return (
    <div>
      <h1>Update Employee with Id - {props.id}</h1>
      <form>
        <div className="col-4">
          <label className="form-label">First name</label>
          <input className="form-control" type="text"  onChange={firstNameChangeHandler} value={firstNameInput} />
        </div>
        <div className="col-4">
          <label className="form-label">Last name</label>
          <input className="form-control" type="text" onChange={lastNameChangeHandler} value={lastNameInput}/>
          <div className="col-4"></div>
          <label className="form-label">Email</label>
          <input className="form-control" type="email" onChange={emailChangeHandler}  value={emailInput}/>
        </div>
        <button onClick={updateHandler} type="submit" className={classes.update}>
          Update
        </button>
        <button className={classes.cancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
