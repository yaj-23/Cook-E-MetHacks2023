import React from 'react'
import "./dashboard.css";
import heroPage from '../images/dashboardcooking.svg';
import { Button } from '../button/Button';


function Dashboard() {
  return (
    <>    
      <div className='dashboard'>
          <div className='left'>
          <div className='project-name'>
            <h1 className='project-title'>cooking at home just got easier</h1>
          </div>
          <div className='navigator-btns'>
            <Button className="btn1"
                buttonStyle='btn-primary' 
                buttonSize = 'btn-medium'
                buttonColor='dark'>
                    about
            </Button> 
            <Button className="btn1"
                buttonStyle='btn-primary' 
                buttonSize = 'btn-medium'
                buttonColor='dark'>
                    how
            </Button>   
            <Button className="btn1"
                buttonStyle='btn-primary' 
                buttonSize = 'btn-medium'
                buttonColor='dark'>
                    try
            </Button>            
          </div>
        </div>
        <div className='right'>
          <img  className="herosvg-image" alt="onlypans"src={heroPage}/>
        </div>
      </div>       
    </>
    )
}

export default Dashboard