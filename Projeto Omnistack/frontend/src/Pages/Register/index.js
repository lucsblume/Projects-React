import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';


import api from '../../Services/api'
import './styles.css'

import logoImg from '../../Assets/logo.svg';

export default function Register(){

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [city,setCity] = useState('');
    const [uf,setUf] = useState('');


    const history = useHistory();


    async function handleRegister(e){ //responsavel por fazer o cadastro do usuarios
        e.preventDefault(); //impede que a pagina seja recarregada ao executar tal ação

        const data ={
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try{

            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);//utilizando acrase `` para colocar variaveis dentro do texto
            
            history.push('/')//enviando apos o cadastro para o login
            
        }catch(err){
            alert('Erro no cadastro, tente novamente');
        }
    } 

    return (
        <div className="register-container">
           
           <div className = "content">

                <section>
                    
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na platadorma e ajude pessoas a encontrarem os casos da sua ONG</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={24} color="#E02041"/> 
                        Voltar ao logon
                    </Link>

                </section>


                <form onSubmit={handleRegister}>


                    <input placeholder= "Nome da ONG"
                           value={name}
                           onChange={e =>setName(e.target.value)} 
                           

                    /> 

                    {/*e.target.value = valor do input */}


                    <input type="email" placeholder="E-mail"
                            value={email}
                            onChange={e =>setEmail(e.target.value)}
                    
                    />



                    <input placeholder="WhatsApp"
                    
                            value={whatsapp}
                            onChange={e =>setWhatsapp(e.target.value)}
                    
                    />


                    <div className="input-group">
                        

                        <input placeholder="Cidade"
                            value={city}
                            onChange={e =>setCity(e.target.value)}
                        
                        />



                        <input placeholder="UF" style = {{width: 80}}
                             value={uf}
                            onChange={e =>setUf(e.target.value)}
                        
                        
                        />

                    </div>

                    <button className="button" type = "submit"> CADASTRAR</button>

                </form>


            </div>

        </div>
    );
}