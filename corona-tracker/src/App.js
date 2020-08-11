import React from 'react';

import {Cards,Chart,CountryPicker} from './components'; //arquivo index.js criado para passar todos os caminhos de pastas dentro de um unico import
import styles from './App.module.css';

import {fetchData} from './api';

import LogoCorona from './Assets/LogoTitle.png'

class App extends React.Component{
    
    state ={
        data:{},
        country:'',
    }

    async componentDidMount(){ // É invocado imediatamente após um componente ser montado (inserido na árvore). Inicializações que exijam nós do DOM devem vir aqui
        const fetchedData = await fetchData();

        this.setState({data: fetchedData});
    }


    handleCountryChange = async (country) => {

        const fetchedData = await fetchData(country);

        this.setState({data:fetchedData, country: country});
       


    }

    render(){

        const {data, country} = this.state;
        
        return(

            <div className={styles.container}> 

            <img className={styles.image} src={LogoCorona} alt="COVID-19"/>

                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>

            </div>
        )
    }
}

export default App;