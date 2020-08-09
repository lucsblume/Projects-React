import {Request, Response} from 'express';


import db from '../database/connection';

import convertHourToMinutes from '../utils/convertHourToMinutes';


interface ScheduleItem{ //definindo o formato de um objeto

    week_day:number;
    from: string;
    to:string;

}

export default class ClassesController{

    async index (request: Request, response: Response){

        const filters = request.query;


        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;


        if(!filters.week_day || !filters.subject || !filters.time){

            return response.status(400).json({
                error: 'Missing filters to search classes'

            });
        }


        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')

        .whereExists(function(){ //verificando os horarios de atendimentos de aulas
            this.select("class_schedule.*")
                .from('class_schedule')
                .whereRaw('`class_schedule`. `class_id` = `classes`. `id`')
                .whereRaw('`class_schedule`. `week_day` = ??', [Number(week_day)]) //attende somente nos dias listados para o professor
                .whereRaw('`class_schedule`. `from` <= ??', [timeInMinutes]) //verificando os horarios para trabalhar antes ou igual ao horario do professor deifinido
                .whereRaw('`class_schedule`. `to` > ??', [timeInMinutes]) //verificando os horarios de parada de trabalho
                
        })

         .where('classes.subject', '=', subject)
         .join('users', 'classes.user_id', '=' , 'users.id')
         .select(['classes.*', 'users.*']);

        

        return response.json(classes);

    }    
    async create (request: Request, response: Response){

        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule

        } = request.body;


        const trx = await db.transaction(); //faz todas as operações de banco ao msm tempo, caso tenha algum erro desfaz todas as operações daquel contexto

        try{ //tratativa de erro

            const insertedUsersIds = await trx('users').insert({ //tabela em que vai acontecer a inserção de dados do ususario

                name,
                avatar,
                whatsapp,
                bio,
            });
        
            const user_id = insertedUsersIds[0]; //pegando os id's dos usuarios
        
        
        const insertedClassesIds = await trx('classes').insert({ //tabela em que vai acontecer a inserção de dados da classe
                subject,
                cost,
                user_id,
            })
        
        
            const class_id = insertedClassesIds[0]; //pegando os id's das classes
        
        
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) =>{ //convertendo os valores dos itens (horarios) em minutos
                
        
                return{
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
        
                };
            })
        
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit();//inserindo tudo ao msm dando no bd
        
        
        
        
        
            return response.status(201).send();


        }catch(err){

            console.log(err);
            
            await trx.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })

        }
    }
}