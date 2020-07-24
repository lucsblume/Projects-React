import React, {useState,useEffect} from 'react'; //useEffect: serve para disparar alguma função em um determinado momento do componente
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../Services/api';

import './styles.css';

import logoImg from '../../Assets/logo.svg';

export default function Profile(){

    const [incidents, setIncidents] = useState([]); //começa vazio

    const history = useHistory();
    const ongId = localStorage.getItem('ongId'); //salvos no local storage
    const ongName = localStorage.getItem('ongName');  //salvos no local storage

    useEffect(() => { //quando abrir a pagina de perfil , ira ter casos cadastrados da ong logada
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]); //dependencia



    async function handleDeleteIncident(id){
        try{

            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });


            setIncidents(incidents.filter(incident => incident.id !== id)); //ao apagar , some instantaneamente da tela; mantem os incidents que são diferetens daquele apagados
        
        }catch(err){
            alert('Erro ao deletar caso, tende novamente.');
        }
    }




    function handleLogout(){
        localStorage.clear(); //limpando o local storage
        
        history.push('/') //enviando para a rota raiz(logon)
    }



    return(
        <div className="profile-container">
            
            <header>
                
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vindo, {ongName} </span>

                <Link className= "button" to = "/incidents/new">Cadastrar Novo Caso</Link>

                <button onClick= {handleLogout} type="button">
                    <FiPower size={24} color='#E02041'/>
                </button>

            </header>


            <h1>Casos Cadastrados</h1>

            <ul>
                  {/*codigo em JS, percorrendo cada um dos incidentes e retornando um conteudo JSX*/ }

               {incidents.map(incident => (
                    <li key ={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>Descrição:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency' , currency: 'BRL'}).format(incident.value)}</p> 
                    {/*INTL: internacionalização de valores de dados*/ }
                    {/*passando o idioma utilizado, passando o formato do numero(no caso é moeda), passando qual a moeda*/ }

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="1C1C1C"/>
                    </button>
                </li>
               ))}           

            </ul>

           

        </div>
    );
}