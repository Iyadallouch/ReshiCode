import React from 'react';
import './Services.css';
import {ReactTyped} from 'react-typed'; // Import the Typed component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faRobot, faLaptopCode, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons';

const Services = () => {

   
    return (
        <div id='services'>
            <div className='achievements'>
                <h1 className='typing-animation'>
                    <ReactTyped strings={['Our Services']} typeSpeed={70} showCursor={true} loop={true} backDelay={2000}/>
                </h1>  
                <div>     
                <div className='services-card'>
    <div className='counting-number'>
    <div className='opacity'>
    <FontAwesomeIcon className='icon' icon={faComments} size="3x" />

        <p className='font-multiColor'>Chat</p>
        </div>
        <p className='description'>make it shorter</p>
    </div>
</div>
<div className='services-card'>
    <div className='counting-number'>
    <div className='opacity'>
    <FontAwesomeIcon className='icon' icon={faRobot} size="5x"  />
        <p className='font-multiColor'>Chatbot</p>
        </div><FontAwesomeIcon icon="fa-solid fa-robot" />
        <p className='description'>make it shorter
        </p>
    </div>
</div>
<div className='services-card'>
    <div className='counting-number'>
    <div className='opacity'>
    <FontAwesomeIcon className='icon'icon={faLaptopCode} size="5x"/>
        
        <p className='font-multiColor'>Live</p>
        </div>
        <p className='description'>make it shorter
</p>
    </div>
</div>
<div className='services-card'>
    <div className='counting-number'>
        <div className='opacity'>
    <FontAwesomeIcon className='icon' icon={faMagnifyingGlassChart} size="5x" />

        <p className='font-multiColor'>test</p>
        </div>
        <p className='description'>make it shorter</p>
    </div>
</div>
</div>   

            </div>
          
        </div>
    );
};

export default Services;
