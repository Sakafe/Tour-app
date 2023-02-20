import { Grid } from '@mui/material';
import './TravelArea.css'
import React, { useContext } from 'react';
import { MyContext } from '../../App';

const TravelArea = (props) => {
    const [showarea,setShowarea] = useContext(MyContext)
    const {title,description,img} = props.place;
    const backgroundImageStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${img})`,
        backgroundSize: "cover",
        backgroundposition : 'right-top',
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "border-box",
        width: "100%",
        borderRadius:"10px",
        margin:"2px",
        height: '100%'
        
    }
    const handleClick = () =>{
        setShowarea(props.place)
    }
    return (
        <Grid item xs={12} md={3} className='grid'>
          <div className='travel-area' style={backgroundImageStyle} onClick={handleClick}>
            
             <h2 style={{ paddingTop: '300px',
             textAlign: "center", 
             color: "white" }}>{title}</h2>

          </div>
        </Grid>
    );
};

export default TravelArea;