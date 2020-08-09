import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'


import './styles.css'

import logoImg from '../../Assets/images/logo.svg';
import landingImg from '../../Assets/images/landing.svg';

import studyIcon from '../../Assets/images/icons/study.svg';
import giveClassesIcon from '../../Assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../Assets/images/icons/purple-heart.svg';

import api from '../../Services/api';


function  Landing(){
         
          //ARMAZENA        //SETA
    const [totalConnections, setTotalConnections] = useState(0); //setando uma conexão co api para saber quantos usuarios se conectaram

    useEffect(() => { //fazendo uma unica chamada da api, para realizar uma unica vez, assim que o usuario se conectar(usuario por vez)
        api.get('connections').then(response =>{ //then -> guardando uma resposta

            const { total } = response.data;

            setTotalConnections(total)
        })
    }, []);

    return(

        <div id="page-landing">

            <div id="page-landing-content" className="container">

                <div className="logo-container">

                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>

                </div>

                <img 
                    src={landingImg} 
                    alt="Plataforma De Estudos" 
                    className="hero-image"
                />

                <div className="buttons-container">

                    <Link to="/study" className="study">

                        <img src={studyIcon} alt="Estudar"/>
                        Estudar

                    </Link>

                    <Link to="/give-classes" className="give-classes">

                        <img src={giveClassesIcon} alt="Estudar"/>
                        Dar Aulas

                    </Link>

                </div>

                <span className="total-connections">

                    total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração Roxo"/>
                    

                </span>

            </div>

        </div>
    )
}

export default Landing;