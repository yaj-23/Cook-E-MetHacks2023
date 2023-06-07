import { Button } from '../button/Button';
import React from 'react'
import "./second.css";
import {Link} from 'react-scroll';



function Second() {
  return (
        <>    
        <div className='second'>
            <div id='about' className='second-container'>
                <h1 className='title'>What is cook-e</h1>
                <p1 className='about-text'>
                    Welcome to Cook - E, the ultimate cooking assistant designed to help you create delicious meals effortlessly. With Cohere's AI-powered recipe generator, you can easily discover new and exciting dishes and get step-by-step instructions to cook them perfectly every time.
                </p1>
            </div>
            <div id='how' className='second-container'>
                <h1 className='title'>How does cook-e work</h1>
                <p1 className='about-text'>
                    Our app provides you with an extensive list of ingredients, their costs and nearby stores where you can buy them, making it easy for you to get all the necessary ingredients without any hassle. With Cook - E, you no longer have to worry about the availability or cost of ingredients, we take care of it all for you.
                    Cook - E is designed with your needs in mind, our easy-to-use interface and intuitive navigation make it simple for you to find the recipes you need. Whether you are looking for a quick weeknight dinner or planning a special meal for your loved ones, Cook - E has got you covered.
                </p1>
            </div>
            <Link to='try'   duration={800} smooth={true}>
                <Button className="btn1"
                        buttonStyle='btn-primary' 
                        buttonSize = 'btn-medium'
                        buttonColor='dark'>
                            try
                </Button>   
            </Link>
        </div>
        
    </>
    )
}
export default Second