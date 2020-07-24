const connection = require('../database/connection');

module.exports = { //exportando objeto
    
    async index(request,response){

        const { page = 1 } = request.query;//buscando parametro page dentro do request 

        const [count] = await connection('incidents').count(); //query a parte, retorna a quantidade de casos totais
        

        const incidents = await connection('incidents') //acessando todos os registros da tabela Casos
        .join('ongs', 'ongs.id', '=' , 'incidents.ong_id')//relacionando dados de tabelas
        .limit(5) //limitando a busca de dados
        .offset((page - 1) * 5) //apenas lista 5 casos por vez
        .select(['incidents.*',
         'ongs.name',
         'ongs.email',
         'ongs.whatsapp',
         'ongs.city', 
         'ongs.uf']);

        response.header('X-Total-Count',count['count(*)']) //acessando todos os casos atraves do cabeçalho e se comunicando com o frontend

        return response.json(incidents);
    },

   

    async create(request,response){ //criando um incidents
        const { title , description , value} = request.body; // //fazendo a desestruturação e alocando as infos em cada variavel necessariaZ acessando o corpo da requisição
        const ong_id = request.headers.authorization; //pegando o id da ong

        const [id] = await connection('incidents').insert({//pegando o id | inserindo dados na tabela de 'Casos'
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id }); //retornando o id da ong
         
       // request.headers; //cabeçalho da requisição, guarda informações do contexto da requisição
    },
    
    async delete(request,response){
        const { id } = request.params;  //pegando o id do parametro de rota
        const ong_id = request.headers.authorization;  //pegando o id da Ong Logada

        const incident = await connection('incidents')  //buscando incident dentro da tabela incidents
            .where('id',id)     //buscando incident especifico
            .select('ong_id')  //selecionando apenas a coluna 'ong_id'
            .first();         //retorna apenas 1 resultado

            if(incident.ong_id != ong_id){ // se o id do incident da ong for diferente do ong id esta logado
                return response.status(401).json({ //erro de autorização padrao
                    error: 'Operation Not Permitted.'
                });
            }

            await connection('incidents').where('id',id).delete(); ///deleta o registro de dentro da tabela de dados

            return response.status(204).send(); //retorna uma resposta para o front-end que não tem conteudo
    }

};