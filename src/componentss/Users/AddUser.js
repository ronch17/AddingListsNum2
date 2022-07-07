/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import Card from "../../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../../UI/Button";
import ErrorModal from "../../UI/ErrorModal";

const AddUser = (props) => {
  //   const [enteredUsername, setEnteredUsername] = useState("");
  //   const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const userNameValue = useRef();
  const formRef = useRef(null);

  const addUserHandler = (event) => {
    event.preventDefault();

    // get userName + userAge without lisitin to change
    const formData = event.target.elements;

    const userName = formData.username.value;
    const age = formData.age.value;

    console.log(formData);
    console.log(userNameValue.current.value);

    if (userName.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age(> 0).",
      });
      return;
    }
    props.onAddUser(userName, age);
    formRef.current.reset();
  };

  const errorHandler = () => {
    setError(null);
  };

  //   const userNameChangeHandler = (event) => {
  //     setEnteredUsername(event.target.value);
  //   };

  //   const ageNameChangeHandler = (event) => {
  //     setEnteredAge(event.target.value);
  //   };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler} ref={formRef}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // value={enteredUsername}
            // onChange={userNameChangeHandler}
            ref={userNameValue}
          />
          <label htmlFor="age">Age (Year)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageNameChangeHandler}
            ref={formRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
