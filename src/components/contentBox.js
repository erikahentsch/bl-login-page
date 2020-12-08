import React from 'react'
import {makeStyles} from '@material-ui/core'
import {Link} from 'react-router-dom'

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


import Alerts from '../pages/AlertsPage'

const styles = makeStyles({
    root: {
        display: 'flex',
        width: '100%',
        position: 'relative',
        flexDirection: 'column',
        alignContent: 'center',
        '& hr': {
            width: '80%',
            height: 10,
            border: 'none',
            borderTop: '2px solid grey'
        }
    },
    title: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 120,
        top: -4,
        fontSize: 24,
        padding: '0px 5px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        flexWrap: 'wrap',
        height: 210,
        alignContent: 'space-around',
        alignSelf: 'center'
    },
    iconRoot: {
        margin: '5px 5px',
        alignItems: 'center',
        '& a': {
            display: 'flex',
            textDecoration: 'none',
            color: 'black'
        },
        '& img': {

        },
        '& div': {
            fontSize: 20,
            paddingLeft: 5,
            textDecoration: 'none'
        }
    }
});

const IconBox = (props) => {
    const classes = styles();

    const IconDiv = (props) => {
        return (
                <div className={classes.iconRoot}>
                    <Link to="/alerts">
                        <img src={props.icon}/>
                        <div>{props.label}</div>
                    </Link>
                </div>
            )
    }


    return (
        <div className={classes.root}>
            <div className={classes.title}>Content</div>
            <hr />
            <div className={classes.container}>
                <IconDiv icon={AlertsIcon} label={'Alerts'} />
                <IconDiv icon={ClosingsIcon} label={'Closings'} />
                <IconDiv icon={CustomIcon} label={'Custom'} />
                <IconDiv icon={ElectionsIcon} label={'Elections'} />
                <IconDiv icon={EventsIcon} label={'Events'} />
                <IconDiv icon={FinancialsIcon} label={'Financials'} />
                <IconDiv icon={MediaIcon} label={'Media'} />
                <IconDiv icon={QueryIcon} label={'Query'} />
                <IconDiv icon={SponsorIcon} label={'Sponsor'} />
                <IconDiv icon={SportsIcon} label={'Sports'} />
                <IconDiv icon={TrafficIcon} label={'Traffic'} />
                <IconDiv icon={TwitterIcon} label={'Twitter'} />
                <IconDiv icon={WeatherIcon} label={'Weather'} />
            </div>
            <hr />

        </div>
    )
}

export default IconBox