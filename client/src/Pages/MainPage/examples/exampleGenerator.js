import React from 'react';
import Examples from './Examples';

import audit from '../../../images/userpic.png'
const ExampleGenerator = () => {
    return (
        <div id='examples'>
                        <h1>Our work</h1>

          
<Examples id="example-0" image={audit} title={`Test`} content={`test` } alt='same as title'  />
   
<Examples id="example-2" image={audit} title={`Test`} content={`test` } alt='same as title'  />

         </div>
    );
};

export default ExampleGenerator;



