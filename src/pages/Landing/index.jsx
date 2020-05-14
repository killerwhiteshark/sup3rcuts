import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';

const Landing = () => {

    return (
        <div style={{width: '100%'}}>
            <Typography align="center" variant="h4" gutterBottom={true}>
            Welcome to Sup3rcuts!
            </Typography>
                <Typography align="center" variant="h6" gutterBottom={true} style={{padding: '20px'}}>
                    Sup3rcuts strikes back! Centralizing the powerhouse game “Street Fighter: 3rd Strike”, Sup3rcuts is a strong community of players that represents the skill, knowledge, and people of offline play. Focused on bringing players together to play on a single screen to resurrect the rush of fighting an opponent that’s right next to you, and exercise sportsmanship that the online generation is lacking.
                </Typography>
                <Typography align="center" variant="h6" gutterBottom={true} style={{padding: '20px'}}>
                    The spirit of the offline era is still alive! Struggling to compete with the raging movement of online competition is keeping out small community on its feet. Sup3rcuts values offline play for players of all skill levels to teach, learn, and compete together face to face.
                </Typography>
            <br/>
            <Typography align="center" variant="h6" gutterBottom={true} style={{padding: '20px'}}>
                    Join us with planning events, prize tournaments, one on one teachings, group huddles of group announcements, and good ol’ 3rd strike!
                </Typography>
            <div className="container">
            <Typography align="center" variant="h4" gutterBottom={true} style={{padding: '20px'}}><Link to='/login' >Log in</Link></Typography>
            <Typography align="center" variant="h5" gutterBottom={true} style={{padding: '20px'}}>No account?<Link to='signup' >Signup</Link>!</Typography>
            </div>
        </div>
        )
}

export default Landing