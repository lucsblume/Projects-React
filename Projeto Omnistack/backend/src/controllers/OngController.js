const crypto = require('crypto');
const connection = require('../database/connection');



module.exports = {  //exportando objeto
    async index (request,response) { //nova rota

        const ongs = await connection ('ongs').select('*'); //acessando todos os registros da tabela ongs
    
        return response.json(ongs);
    
    },

    async create(request,response){
    const {name , email , whatsapp , city , uf}  = request.body; //fazendo a desestruturação e alocando as infos em cada variavel necessarias acessando o corpo da requisição
    
    const id = crypto.randomBytes(4).toString('HEX'); //gerando 4 bytes de caracteres decimais aleatorios

   await connection('ongs').insert({ //inserindo dados na tabela 'ongs'
        id,
        name,
        email,
        whatsapp,
        city,
        uf,


    });

    return response.json({ id }); //acessa as respostas e Retorna aos usuarios
    }
};