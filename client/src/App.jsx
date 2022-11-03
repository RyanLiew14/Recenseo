import logo from "./logo.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const baseURL = "http://localhost:5001/api/v1/users";
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => setData(response.data));
  }, []);

  return (
    <div className="text-3xl font-bold underline">
      {data?.users.map((user) => (
        <p>{user.name}</p>
      ))}
    </div>
  );
}
export default App;
