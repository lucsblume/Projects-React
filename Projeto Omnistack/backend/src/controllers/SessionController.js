const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const{ id } = request.body;//buscando id atraves do corpo da requisição


        const ong = await connection('ongs') //buscando uma ong
        .where('id', id)
        .select('name')
        .first();


        if(!ong) { //se essa ong nao existir
            
        return response.status(400).json({
        error: 'No ONG found with this ID'
        });
    }
    return response.json(ong)//retornando os dados da ong
}
}