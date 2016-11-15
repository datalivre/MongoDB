# insira no bd informações sobre três estudantes, como:
# nome, data denascimento, disciplinas cursadas e o curso

# o comando use escolhe quando existe ou cria quando inexiste o banco de 
# dados
use aula2

#lista todos os bancos
show dbs

# cria uma coleção, mas não lhe atribui documentos
# db: objeto base
# alunos: nome da coleção dentro do banco aula2
# insert(): função para adicionar um documento à coleção
db.alunos.insert({})

#lista todos as coleções
show collections

#inserindo documentos:
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
    "uf"   : "MG",
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
    "data" : "não se pergunta isso a uma garota...",
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

# Exibe apenas os alunos do sexo másculino nascidos em MG (a função 
# pretty() identa a saída)
db.alunos.find({"sexo" : "M", "uf" : "MG"}).pretty()

# A função sort pode ser utilizada para ordenar os resultados retornados 
# pela query. Pode ser ordenando de forma crescente (1) e descrescente 
# (-1). A função find() recebe dois parâmentros: o primeiro limita a query 
# a 10 resultados e o segundo determina que apenas o 1º não será ignorado
db.alunos.find({},10,1).sort({"data" : -1}).pretty()

# Atualizando a nota da disciplina Banco de dados não relacionais
db.alunos.update({"nome" : "Robert"}, {$set : {"notas.NSQ" : 10}})
# Exibindo resultado
db.alunos.findOne({"nome" : "Robert"})






