import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {

    return( 
        <div className='s9 m6`'>
            <h3>This is the Landing page</h3>
            <h4>
                <Link to='/login' >Log in</Link>
            </h4>
        </div>)
}

export default Landing