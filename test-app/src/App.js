import axios from "axios"
import {useState} from "react"
import "./App.css";
import Navbar from './components/navbar/Navbar';
import Dashboard from "./components/pages/dashboard";
import Second from "./components/pages/second";



function App() {

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios
      .post("http://localhost:4001/chat", { prompt: prompt })
      .then((res) => {
        console.log(prompt);
        setResponse(res.data);
      })
      .catch((err) =>{
        console.error(err);
      })
  }


  return (
    <>
    <Navbar/>
    <Dashboard/>
    <Second/>
     <div>
        <form onSubmit={handleSubmit}>
          <div>
            Ask something
          </div>
          <div>
            <input 
            type="text" 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}/>
          </div>
          <button type="submit">Submit</button>
        </form>
        <div>
          <p>{response}</p>
        </div>
     </div>
    </>
  );
}

export default App;
