import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom'

import PageHeader from '../../Components/PageHeader';
import Input from '../../Components/Input';
import Textarea from '../../Components/Textarea';
import Select from '../../Components/Select';

import warningIcon from '../../Assets/images/icons/warning.svg';

import api from '../../Services/api';

import './styles.css';



function TeacherForm(){

    const history = useHistory();

        //armazena //Seta
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');


    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');


    const [scheduleItems, setScheduleItems] = useState([
        {week_day:0,from:'',to:''}

    ]);
     

    function addNewCheduleItem(){
        setScheduleItems([
            ...scheduleItems,

            {week_day:0,from:'',to:''}
            
        ]);

        scheduleItems.push()
    }


    function setScheduleItemValue(position:number, field:string, value:string){
        const updateScheduleItems = scheduleItems.map((scheduleItem,index) =>{

            if(index === position){
                return{...scheduleItem, [field]:value};
            }

            return scheduleItem;
        });

        setScheduleItems(updateScheduleItems)
    }
   

    function handleCreateClass(e: FormEvent){ //chamar essa função quando o user de um submit no formulario
        
        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems

        }).then(() => {

            alert('Cadastro realizado com sucesso!')
            history.push('/') //apos o cadastro o user é enviado para a home page

        }).catch(() => {
            alert('Erro no cadastro!')
        })

        e.preventDefault();

        
    }



    return(

        <div id="page-teacher-form" className="container">

            <PageHeader

            title="Que incrivel que você quer dar aulas."
            description = "o primeiro passo é preencher esse formulário de inscrição"
            />

            <main>

                <form onSubmit={handleCreateClass}>

                    <fieldset>

                        <legend>Seus dados</legend>

                        <Input 
                            name="name" 
                            label="Nome Completo" 
                            value={name} 
                            onChange={(e)=>{setName(e.target.value)}}
                        />

                        <Input 
                            name="avatar" 
                            label="Avatar(URL)"
                            value={avatar} 
                            onChange={(e)=>{setAvatar(e.target.value)}}
                        />

                        <Input 
                            name="whatsapp" 
                            label="WhatsApp"
                            value={whatsapp} 
                            onChange={(e)=>{setWhatsapp(e.target.value)}}
                        />

                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio} 
                            onChange={(e)=>{setBio(e.target.value)}}
                        />

                    

                    </fieldset>



                    <fieldset>

                        <legend>Sobre a aula</legend>

                        <Select 
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e)=>{setSubject(e.target.value)}}
                            options={[
                                {value: 'Artes', label: "Artes"},
                                {value: 'Ciências da computação', label: "Ciências da computação"},
                                {value: 'Ciências econômicas', label: "Ciências econômicas"},
                                {value: 'Engenharia da computação', label: "Engenharia da computação"},
                                {value: 'Engenharia civil', label: "Engenharia civil"},
                                {value: 'Direito', label: "Direito"},
                                {value: 'Arquitetura', label: "Arquitetura"},
                                {value: 'Design de Moda', label: "Design de Moda"},
                                {value: 'Medicina', label: "Medicina"},
                                {value: 'Enfermagem', label: "Enfermagem"},
                                {value: 'Psicologia', label: "Psicologia"},
                            ]}
                        />

                        <Input
                            name="cost" 
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e)=>{setCost(e.target.value)}}
                        />

                    </fieldset>


                    <fieldset>

                        <legend>

                            Horários disponiveis

                            <button type="button" onClick={addNewCheduleItem}>
                                + Novo Horário
                            </button>

                        </legend>


                    {scheduleItems.map((scheduleItem,index) => {
                        
                        return(

                            <div key={scheduleItem.week_day} className="schedule-item">

                            <Select 
                                name="week_day"
                                label="Dia Da Semana"
                                value={scheduleItem.week_day}
                                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                options={[

                                    {value: '0', label: "Domingo"},
                                    {value: '1', label: "Segunda-feira"},
                                    {value: '2', label: "Terça-feira"},
                                    {value: '3', label: "Quarta-feira"},
                                    {value: '4', label: "Quinta-feira"},
                                    {value: '5', label: "Sexta-feira"},
                                    {value: '6', label: "Sabado"},
                                    
                                    
                                ]}
                            />
                            


                            <Input 
                                name="from" 
                                label="Das" 
                                type="time"
                                value={scheduleItem.from}
                                 onChange={e => setScheduleItemValue(index, 'from', e.target.value)} 
                            />


                            <Input 
                                name="to" 
                                label="Até" 
                                type="time"
                                value={scheduleItem.to}
                                 onChange={e => setScheduleItemValue(index, 'to', e.target.value)} 
                            />

                        </div>

                        );
                    })}
                        
                        

                    </fieldset>



                    <footer>

                        <p>
                            <img src={warningIcon} alt="Aviso Importante"/>
                            Importante! <br/>
                            Preencha todos os campos
                        </p>

                        <button type="submit">
                            Salvar Cadastro
                        </button>

                    </footer>
                </form>

            </main>

        </div>
    )
}

export default TeacherForm;