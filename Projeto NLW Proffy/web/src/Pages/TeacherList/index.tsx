import React, { useState, FormEvent } from 'react';

import PageHeader from '../../Components/PageHeader';
import TeacherItem,{Teacher} from '../../Components/TeacherItem';
import Input from '../../Components/Input';
import Select from '../../Components/Select';

import api from '../../Services/api';

import './styles.css';





function TeacherList(){

    const [teachers,setTeachers] = useState([]);

    const [subject,setSubject] = useState('');
    const [week_day,setWeekDay] = useState('');
    const [time,setTime] = useState('');


   async function searchTeachers(e:FormEvent){ //depois que submeter ao formulario , não recarrega a pagina
        e.preventDefault();


      const response = await api.get('classes',{ //tbm pode fazer usando then()
            params:{
                subject,
                week_day,
                time
            }
        })

        setTeachers(response.data);

    }


    return(
        
        <div id="page-teacher-list" className="container">

           <PageHeader title="Estes são os proffys disponiveis.">

                <form id="search-teachers" onSubmit={searchTeachers}>

                    
                    <Select 
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => {setSubject(e.target.value)}}
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



                        <Select 
                            name="week_day"
                            label="Dia Da Semana"
                            value={week_day}
                            onChange={(e) => {setWeekDay(e.target.value)}}
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
                            type="time" 
                            name="time" 
                            label="Hora"
                            value={time}
                            onChange={(e) => {setTime(e.target.value)}}
                            
                        />

                        <button type="submit">

                            Buscar
                            
                        </button>
                    

                    
                    

                   

                </form>
            </PageHeader>

           
           <main>
               
               {teachers.map((teacher:Teacher) => {
                   return <TeacherItem key={teacher.id} teacher={teacher}/>
               })}
               
           </main>


        </div>
    )
}

export default TeacherList;