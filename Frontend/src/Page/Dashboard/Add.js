import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Add({ employees, setEmployees, setIsAdding }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [date, setDate] = useState("");
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  console.log("date", date);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newEmployee = {
      firstName,
      lastName,
      email,
      salary,
      date,
    };

    try {
      // Send a POST request to add the new employee
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        newEmployee
      );

      if (response.status === 200) {
        const addedEmployee = response.data;

        // Update the state with the new employee data
        setEmployees([...employees, addedEmployee]);

        // Clear the form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setSalary("");
        setDate("");

        // Log a success message to the console
        console.log("Employee added:", addedEmployee);

        // Show a success message to the user
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: `${addedEmployee.firstName} ${addedEmployee.lastName}'s data has been Added.`,
          showConfirmButton: false,
          timer: 1500,
        });

        // Close the Add Employee form
        setIsAdding(false);
      } else {
        // Handle other possible response statuses here
        // For example, show an error message to the user
        console.error("Error adding employee:", response.data);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to add employee. Please try again.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      // Handle errors, e.g., show an error message to the user
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while adding the employee. Please try again.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          ref={textInput}
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Add;
