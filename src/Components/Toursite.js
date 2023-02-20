import React, { useContext } from 'react';
import { Button, Grid} from "@mui/material";
import { MyContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { travelPlaces } from '../TravelInfo';
import TravelArea from './TravelArea/TravelArea';

const Toursite = () => {
    const [showarea,setShowarea] = useContext(MyContext);
    const navigate = useNavigate();
    const handleBooking = () =>{
       navigate.push('/booking');
    }
    return (
        <Grid container item xs={12} justify="space-between" >
         <Grid item md= {6} style={{color:"white",padding:'10px'}}>
          <h1>{showarea.title}</h1>
          <h5>{showarea.description}</h5>
          <Link to='/booking' style={{textDecoration:'none'}}>
          <Button style={{background:"orange",color:"black"}} onClick={handleBooking}>Booking</Button>
          </Link>
         </Grid>
         <Grid container justify="center" spacing={1} item md= {6}>
           {
            travelPlaces.map(place =>{
                return <TravelArea key={place.id} place={place}></TravelArea>
            })
           }
         </Grid>
        </Grid>
    );
};

export default Toursite;