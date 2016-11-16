#Introdução ao MongoDB
Vamos inserir em um banco de dados informações sobre quatro estudantes do curso de Ciências de Dados e Big Data da PUC-MINAS, como: seu nome, sua data denascimento, as disciplinas cursadas e o curso.

##Criando o banco de dados
O comando `use` escolhe (quando o banco existe) ou cria (quando inexiste) um banco de dados.
Digite o seguinte comando no shell para criarmos o nosso DB:

```javascript
// cria o db aula2
use aula2
```
Após a criação do banco de dados seria uma boa ideia verificar se ele realmente existe ou se tudo ocorreu como esperado. Para isso tempos o comando `show dbs`:

```javascript
show dbs
```
##Criando uma coleção
A sintaxe básica para se adiconar uma coleção é vazia ao banco de dados previamente criado se dá por `db.collection.insert()`, onde `db` é nosso objeto base, `collection` é o nome da coleção e o `insert()` é a função que adiciona um documento a coleção.   
Esclarecido algumas dúvidas, vamos criar uma coleção, mas ainda não iremos atribuir documentos a ela.
```javascript
db.alunos.insert({})
```
Use o comando `show collections` para listar a coleção previamente criada 
```javascript
show collections
```
##Inserindo documentos na coleção
Agora sim, vamos inserir documentos nesta coleção! Estes documentos representaram as caracteristicas de cada um dos quatro alunos, como:
* Nome,
* Sexo,
* Data de nascimento - não condiz com a verdadeira =)
* e demais caracteristicas.

Perceba no código abaixo que a chave `notas` é um subdocumento válido no campo do documento principal. Na documentação do MongoDB isso é chamado de **Embedded Document** e pode ser traduzido como Documento Aninhado ou Documento Embutido.
```javascript
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
```
##Fazendo buscas no documento
Após inserirmos os documentos à nossa coleção, vamos brincar um pouco com as funcionalidades do MongoDB. Do nosso banco de dados, vamos tentar exibir apenas os alunos (sexo masculino) que residem em Minas Gerais, para isso, digite no shell o seguinte código: 

```javascript
// pretty() identa a saída)
db.alunos.find({"sexo" : "M", "uf" : "MG"}).pretty()
```
Em seguida, vamos usar `sort()` para procurar e localizar o aluno com menor data de nascimento. 
> A função `sort()` pode ser utilizada para ordenar os resultados retornados pela query. O resultado pode ser ordenado de forma crescente (1) ou decrescente (-1). 
> Já a função find() recebe dois parâmetros: o primeiro limitará a nossa query a 10 resultados e o segundo determinará que apenas o 1º não será ignorado.

```javascript
db.alunos.find({},10,1).sort({"data" : 1}).pretty()
```
##Alterando valores de um documento
Vamos tentar uma coisa mais interessante agora, que tal atualizarmos a nota da disciplina Banco de Dados não Relacionais (NSQ)?

```javascript
db.alunos.update({"nome" : "Robert"}, {$set : {"notas.NSQ" : 5}})
// Exibindo resultado
db.alunos.findOne({"nome" : "Robert"})
```
##Removendo documento da coleção
E se por acaso algum aluno desistisse do curso, como iriamos deletar o documento que o representa do DB? Para isso, vamos usar a função `remove` e, como você já deve imaginar, remover um dos alunos da coleção.

```javascript
// Remove um dos estudantes
db.alunos.remove({"nome" : "Robert"})
// Exibe o resultado
db.alunos.find({}).pretty()
```
##Removendo uma todos os documentos de uma coleção
Por fim, vamos remover todos os documentos restantes da coleção alunos. Note que, é sempre necessário cautela para executar este tipo de remoção, dada a natureza definitiva da função `remove()`.  

```javascript
db.alunos.remove({})
```
