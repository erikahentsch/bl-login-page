import React, {useContext} from "react";
import {makeStyles} from '@material-ui/core'
import {Link} from 'react-router-dom'

import HomeIcon from '../images/home.png'
import AlertsIcon from '../images/alerts.png'
import ClosingsIcon from '../images/closing.png'
import CustomIcon from '../images/custom.png'
import ElectionsIcon from '../images/elections.png'
import EventsIcon from '../images/events.png'
import FinancialsIcon from '../images/financials.png'
import MediaIcon from '../images/media.png'
import QueryIcon from '../images/query.png'
import SponsorIcon from '../images/sponsor.png'
import SportsIcon from '../images/sports.png'
import StoriesIcon from '../images/stories.png'
import TrafficIcon from '../images/traffic.png'
import TwitterIcon from '../images/twitter.png'
import WeatherIcon from '../images/weather.png'
import LogoutIcon from '../images/log_out.png'

import ContentBox from './contentBox'
import Alerts from '../pages/AlertsPage'
import {UserContext} from '../UserContext'


const styles =makeStyles({
  root: {
    flex: 3,
    '& ul': {
      listStyleType: 'none',
      padding: 0, 
      margin: 10,
      display: 'flex'
    },
    '& li': {
      padding: 2
    }
  }
})

const Template = (props) => {
  const {loggedIn, toggleLogin} = useContext(UserContext)


  const classes = styles()

  return (
    <div className={classes.root}>
      {loggedIn && <ul>
        <li>
          <Link to="/"><img src={HomeIcon}/></Link>
        </li>
        <li>
          <Link to="/alerts"><img src={AlertsIcon}/></Link>
        </li>
        <li>
          <Link to="/closings"><img src={ClosingsIcon}/></Link>
        </li>
        <li>
          <Link to="/custom"><img src={CustomIcon}/></Link>
        </li>
        <li>
          <Link to="/elections"><img src={ElectionsIcon}/></Link>
        </li>
        <li>
          <Link to="/events"><img src={EventsIcon}/></Link>
        </li>
        <li>
          <Link to="/financials"><img src={FinancialsIcon}/></Link>
        </li>
        <li>
          <Link to="/media"><img src={MediaIcon}/></Link>
        </li>
        <li>
          <Link to="/query"><img src={QueryIcon}/></Link>
        </li>
        <li>
          <Link to="/sponsor"><img src={SponsorIcon}/></Link>
        </li>
        <li>
          <Link to="/sports"><img src={SportsIcon}/></Link>
        </li>
        <li>
          <Link to="/traffic"><img src={TrafficIcon}/></Link>
        </li>
        <li>
          <Link to="/twitter"><img src={TwitterIcon}/></Link>
        </li>
        <li>
          <Link to="/weather"><img src={WeatherIcon}/></Link>
        </li>
        <li>
          <Link onClick={toggleLogin} to="/"><img src={LogoutIcon}/></Link>
        </li>
      </ul>}
    </div>
  )
}

export default Template;