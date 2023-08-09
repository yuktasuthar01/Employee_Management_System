import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios"; 
import { v4 as uuidv4 } from "uuid";


function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []); 
  
  const addEmployee = () => {
    axios
      .post(`${process.env.REACT_APP_API}/create`, {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      })
      .then(() => {
        setEmployeeList([
          ...employeeList,
          {
            _id: uuidv4(),
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage,
          },
        ]);
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
      });
  };

  const getEmployees = () => {
    axios.get('/employees')
    axios
      .get(`${process.env.REACT_APP_API}/employees`)
      .then((response) => {
        setEmployeeList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  return (
    <div className="App">
          <h1 className="center-heading">Employee Management System</h1>
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Salary (LPA):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">

        {employeeList.map((val) =>  {
          return (
            <div className="employee" key={val._id}>
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Salary: {val.wage}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
