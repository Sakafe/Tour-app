import React, { useContext } from 'react';
import './Home.css'
import Header from '../Components/Header/Header'
import { MyContext } from '../App';
import Toursite from './Toursite';

const Home = () => {
    const[showarea] = useContext(MyContext)
    return (
        <div className='home-container'style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${showarea.img})`,
            
            height:"100vh",
            backgroundSize:"cover",
            backgroundPosition:"center",
            width:"100vw"
         }}>
            <Header color="white"/>
            <Toursite/>
        </div>
    );
};

export default Home;