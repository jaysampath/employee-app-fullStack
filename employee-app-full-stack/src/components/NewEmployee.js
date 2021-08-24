import classes from "./NewEmployee.module.css";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
const NewEmployee = () => {
  const [isadding,setIsAdding] = useState(false);
  
  const history = useHistory();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();

  const addNewEmployeeHandler = (event) => {
    event.preventDefault();
    
    const newFirstName = firstNameInputRef.current.value;
    const newLastName = lastNameInputRef.current.value;
    const newEmail = emailInputRef.current.value;

    if(newFirstName.trim().length===0 || newLastName.trim().length===0 || newEmail.trim().length===0){
      return ;
    }
    
    const newEmployee = {
      firstName:newFirstName,
      lastName:newLastName,
      email: newEmail
    };

    const addEmployee = async () =>{
      setIsAdding(true);
       const response = await fetch('/api/employees',{
         method:'POST',
         body: JSON.stringify(newEmployee),
         headers: {
          'Content-Type': 'application/json',
        },
       })
       if(!response.ok){
         console.log(response);
         throw new Error('Error while adding new employee');
       }
       const data = await response.json();
       console.log('new add response: ',data);
       setIsAdding(false);
       history.replace('/employees');
    }

    try{
      addEmployee().catch(error=>{
        console.log(error.message);
        setIsAdding(false);
      })
    }catch(error){

    }

    
    

  }
  if(isadding){
    return <p>Adding new Employee to your company's data</p>
  }
  

  return (
    <div>
      <h1>Add an employee to your company</h1>
      <form>
        <div className="col-4">
          <label className="form-label">First name</label>
          <input className="form-control" ref={firstNameInputRef} type="text" />
        </div>
        <div className="col-4">
          <label className="form-label">Last name</label>
          <input className="form-control" ref={lastNameInputRef} type="text" />
          <div className="col-4"></div>
          <label className="form-label">Email</label>
          <input className="form-control" ref={emailInputRef} type="email" />
        </div>
        <button type="submit" onClick={addNewEmployeeHandler} className={classes.submit}>
          Add
        </button>
        <button className={classes.cancel}>Cancel</button>
      </form>
    </div>
  );
};

export default NewEmployee;
