const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
     const ong_id =  request.headers.authorization;   //acessando os dados da ong logada
      
     const incidents = await connection('incidents')  //buscando todos os incidents dessa ong que ela criou
     .where ('ong_id', ong_id)
     .select('*'); //buscando todo os campos desses incindents

     return response.json(incidents);
    }
}