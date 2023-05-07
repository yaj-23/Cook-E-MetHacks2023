import React from 'react'
import axios from "axios"
import {useState} from "react"
import { Button } from '../button/Button';
import logo from '../images/cook-e.svg';
import "./CookE.css";

export default function CookE() {
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
    <div className='cookeApp'>
        <div className='appHeader'>
            <img src={logo} alt="" style={{ width: "300px"}}/>
            <h3 className='text-cookeapp'>get your favourite recipe in 10 seconds</h3>
        </div>
        <div className='prompt'>
            <form className='form' onSubmit={handleSubmit}>
            <div>
                <h3>Enter Prompt:</h3>
            </div>
            <div>
                <input  className='input'
                placeholder='Enter the name of your meal'
                type="text" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}/>
            </div>
            <Button type="submit" className="btn"  buttonStyle='btn-primary' buttonSize = 'btn-medium'buttonColor='dark'>
                Submit
            </Button>  
            </form>
        </div>
        <div className='response-container'>
            <p className='resp'>{response}</p>
        </div>

    </div>
    </>
  )
}
