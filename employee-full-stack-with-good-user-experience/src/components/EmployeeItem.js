import classes from "./EmployeeItem.module.css";

import { Link, useHistory } from "react-router-dom";

const EmployeeItem = (props) => {
  const history = useHistory();

  const deleteHandler = () => {
    if (!window.confirm("Are you sure. you want to delete this employee?")) {
      return;
    }

    const deleteEmployee = async () => {
      const response = await fetch(`/api/employees/${props.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Error while deleting employee");
      }

      //   const data = await response.json();
      //  console.log('delete response: ',data);

      history.go("/employees");
    };

    try {
      deleteEmployee().catch((error) => {
        console.log(error.message);
      });
    } catch (error) {}
  };

  return (
    <tr className={classes.tableRow}>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>{props.email}</td>
      <td>
        <Link
          className={classes.update}
          to={{
            pathname: "/update",
            state: {
              id: props.id,
              firstName: props.firstName,
              lastName: props.lastName,
              email: props.email,
            },
          }}
        >
          Update
        </Link>
        <button className={classes.delete} onClick={deleteHandler}>
          {" "}
          delete{" "}
        </button>
      </td>
    </tr>
  );
};

export default EmployeeItem;
