import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {

    return <div>
        <h1> This is the Landing page</h1>
        <h4>
            <Link to='/login' >Log in</Link>
        </h4>
        </div>
}

export default Landing