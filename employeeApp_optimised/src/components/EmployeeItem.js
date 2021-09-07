import classes from "./EmployeeItem.module.css";

import { Link } from "react-router-dom";

const EmployeeItem = (props) => {
  const deleteHandler = () => {
    props.onDelete(props.id);
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
