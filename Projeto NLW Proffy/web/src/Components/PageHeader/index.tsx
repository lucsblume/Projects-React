import React from 'react';

import { Link } from 'react-router-dom';

import logoImg from '../../Assets/images/logo.svg'
import backIcon from '../../Assets/images/icons/back.svg'

import './styles.css'

//Permitindo que o pageHeader possa receber uma propriedade(Typescript)
interface PageHeaderProps{
    title:string;
    description?:string;

}

//passando uma constante typescript pra que ele reconheça a interface criado para poder adicionar propriedades ao xml
const PageHeader: React.FC<PageHeaderProps> = (props) => {

    return(

        <header className="page-header">
                
        <div className="top-bar-container">

            <Link to="/">

                <img src={backIcon} alt="Voltar"/>

            </Link>

            <img src={logoImg} alt="Proffy"/>

        </div>

        <div className="header-content">

            <strong>{props.title}</strong>
            {props.description && <p>{props.description}</p>}

            {props.children}

        </div>

        

    </header>

    );
}

export default PageHeader