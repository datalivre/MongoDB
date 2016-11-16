// Cria o db aula2
use aula2

// Lista os bancos criados
show dbs

// Cria uma coleção
db.alunos.insert({})

// Lista as coleções criadas
show collections

// Inserindo no banco informações sobre 4 alunos:
db.alunos.insert({
    "nome" : "Gilmar",
    "sexo" : "M",
    "data" : new Date(1925, 2, 13),
    "uf"   : "MG",
    "instituicao" : "PUC-MINAS",
    "curso": "Ciencias de Dados e Big Data",
    "notas" : {
        "IBD" : 9,
        "NSQ" : 10,
        "ILE" : 8,
        "AQD" : 7,
    },
});

db.alunos.insert({
    "nome" : "Pedro",
    "sexo" : "M",
    "data" : new Date(1992, 2, 13),
    "uf"   : "ES",
    "instituicao" : "PUC-MINAS",
    "curso": "Ciencias de Dados e Big Data",
    "notas" : {
        "IBD" : 9,
        "NSQ" : 10,
        "ILE" : 7,
        "AQD" : 8,
    },
});

db.alunos.insert({
    "nome" : "Amanda",
    "sexo" : "F",
    "data" : new Date(1994, 6, 15),
    "uf"   : "MG",
    "instituicao" : "PUC-MINAS",
    "curso": "Ciencias de Dados e Big Data",
    "notas" : {
        "IBD" : 9,
        "NSQ" : 8,
        "ILE" : 7,
        "AQD" : 10,
    },
});

db.alunos.insert({
    "nome" : "Robert",
    "sexo" : "M",
    "data" : new Date(1902, 1, 29),
    "uf"   : "MG",
    "instituicao" : "PUC-MINAS",
    "curso": "Ciencias de Dados e Big Data",
    "notas" : {
        "IBD" : 9,
        "NSQ" : 10,
        "ILE" : 8,
        "AQD" : 7,
    },
});

// Exibindo apenas os alunos (sexo masculino) que residem em Minas Gerais
// pretty() identa a saída)
db.alunos.find({"sexo" : "M", "uf" : "MG"}).pretty()

// Procura no banco a pessoa com menor data de nascimento
db.alunos.find({},10,1).sort({"data" : 1}).pretty()

// Atualiza nota da disciplina NSQ para 5
db.alunos.update(
    {"nome" : "Robert"}, 
    {$set : {"notas.NSQ" : 5}}
);

// Exibe o resultado
db.alunos.findOne({"nome" : "Robert"})

// Remove um dos estudantes
db.alunos.remove({"nome" : "Robert"})

// Exibe o resultado
db.alunos.find({}).pretty()

// Remove todos os documentos de uma coleção
db.alunos.remove({})
