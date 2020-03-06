import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {

    return (
        <div className='s9 m6`'>
            <div className="container">
                <h4 className="col center">Welcome to Sup3rcuts!</h4>
            </div>
            <div className="row">
            <div className="col m9">
                <h5>
                    Sup3rcuts strikes back! Centralizing the powerhouse game “Street Fighter: 3rd Strike”, Sup3rcuts is a strong community of players that represents the skill, knowledge, and people of offline play. Focused on bringing players together to play on a single screen to resurrect the rush of fighting an opponent that’s right next to you, and exercise sportsmanship that the online generation is lacking.
                </h5>
            <br/>   
                <h5>
                    The spirit of the offline era is still alive! Struggling to compete with the raging movement of online competition is keeping out small community on its feet. Sup3rcuts values offline play for players of all skill levels to teach, learn, and compete together face to face.
                </h5>
            <br/>
                <h5>
                    Join us with planning events, prize tournaments, one on one teachings, group huddles of group announcements, and good ol’ 3rd strike!
                </h5>
            </div>
            </div>
            <div className="container">
               <h4><Link to='/login' >Log in</Link></h4>
                <h5>No account?<Link to='signup' >Signup</Link>!</h5>
            </div>
        </div>)
}

export default Landing