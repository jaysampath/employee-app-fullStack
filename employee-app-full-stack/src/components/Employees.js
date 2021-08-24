import { useState, useEffect } from "react";
import EmployeeItem from "./EmployeeItem";

import classes from "./Employees.module.css";
// const DUMMY_EMPLOYEES = [
//   {
//     id: "e1",
//     firstName: "Jay",
//     lastName: "Sampath",
//     email: "jayasampath111@gmail.com",
//   },
//   {
//     id: "e2",
//     firstName: "Harsha",
//     lastName: "Kolluru",
//     email: "harsha@gmail.com",
//   },
//   {
//     id: "e3",
//     firstName: "Harish",
//     lastName: "Kolli",
//     email: "harish@gmail.com",
//   },
// ];

const Employees = () => {
  const [fetchedEmployees, SetFetchedEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchEmployees = async () => {
      const response = await fetch("/api/employees");
      if (!response.ok) {
        throw new Error("Error while fetching data");
      }
      //console.log('get all employees responce',response);
      const data = await response.json();
      //  console.log('fetched data=',data);
      const fetchedResults = [];
      for (const key in data) {
        fetchedResults.push({
          id: data[key].empId,
          firstName: data[key].firstName,
          lastName: data[key].lastName,
          email: data[key].email,
        });
      }

      SetFetchedEmployees(fetchedResults);
      // console.log('fetched results = ',fetchedResults);
      setIsLoading(false);
    };
    try {
      fetchEmployees().catch((error) => {
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (isLoading) {
    return (
      <div className={classes.loading}>
        <p>fetching.. employee data</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className={classes.title}>Employees</h1>

      {!isLoading && (
        <table className="table table-striped table-hover">
          <thead className={`thead-dark  ${classes.thead}`}>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetchedEmployees.map((employee) => {
              return (
                <EmployeeItem
                  key={employee.id}
                  id={employee.id}
                  firstName={employee.firstName}
                  lastName={employee.lastName}
                  email={employee.email}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Employees;
