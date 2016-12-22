#PyMongo
`PyMongo` é um driver contido de ferramentas para trabalhar como MongoDB diretamente de um ambiente de programação Python.
##Instalação
####Linux/OSX
```bash
pip install pymongo
```
####Windows
https://pypi.python.org/pypi/pymongo/
##Importanto
Para utilizar o PyMongo num ambiente de desenvolvimento Python é necessário importá-lo como biblioteca.
Utilizando um shell ou alguma IDE, inicie o ambiente Python, logo digite as senguintes linhas a fim de importar o PyMongo:
```python
from pymongo import MongoClient
#biblioteca para manipulação de objetos do tipo data
from datetime import datetime
```
### Criando uma conexão:
```python
client = MongoClient()
```
> Se nenhum argumento for adicionado na criação de uma nova conexão, o **MongoClient** irá utilizar os argumentos _default_ e rodar diretamente da interface localhost/porta 27017

### Inserindo dados com PyMongo
Vamos nos conectar ao **mongod** utilizando o **MongoClient** e, em seguida, criaremos o banco de dados Streetfighter. Para tal façanha, será necessário utilizar os métodos **insert\_one\(\)** ou **insert\_many\(\)** para adicionar documentos em uma _MongoDB Collection_.
> A operação seguinte criará um banco de dados chamado `Capcom` caso este ainda não exista:

```py
db = client.Capcom
```
### Inserindo um documento
>Esta operação criará uma coleção chamada `Streetfighter` caso esta ainda não exista:

```py
db.Streetfighter.insert_many({
  "magic": 5,
  "name": "ryu",
  "nationality": "japao",
  "body": {
    "blood": "o",
    "height": 1.75,
    "weight": 84
  },
  "intelligence": 5,
  "agility": 4,
  "date": ISODate("1964-07-21T00:00:00Z"),
  "style": "ansatsuken",
  "force": 4
}
{
  "nationality": "estados unidos",
  "intelligence": 6,
  "force": 4,
  "agility": 5,
  "date": ISODate("1965-02-14T00:00:00Z"),
  "magic": 4,
  "style": "ansatsuken",
  "name": "ken",
  "body": {
    "weight": 72,
    "blood": "o",
    "height": 1.75
  }
}
{
  "body": {
    "weight": 180,
    "height": 2.13,
    "blood": ""
  },
  "name": "zangief",
  "intelligence": 3,
  "agility": 2,
  "style": "sambo",
  "nationality": "uniao sovietica",
  "date": ISODate("1956-06-01T00:00:00Z"),
  "magic": 1,
  "force": 8
}

```
Como o documento passado para o metodo insert\_many não contẽm um campo \_id, o MongoClient adicionará o campo no documento e definirá o seu valor automaticamente.

# Consultando \(query\) um dado com PyMongo

O méodo find pode ser utilizado para consultar dados em uma coleção do MongoDB. Queries podem retornar todos os documentos de uma coleção ou apenas o documento que corresponda com um critério específico.

### Consultando todos os documentos em uma coleção

Para retornar todos os documentos de uma coleção, basta invocar o método `find()` sem adicionar qualquer critério.
```py
cursor = db.Streetfighter.find()
for doc in cursor: 
    print(doc)
```
### Query a partir de um critério

```py

{ <field1>: <value1>, <field2>: <value2>, ... }

```
A seguinte operação localiza documentos cujo campo name equivale a ryu".
```py
cursor = db.Streetfighter.find({
    "name": "ryu"
})
for doc in cursor: 
    print(doc) 
```
### Consulta por um campo em um documento incorporado

Para especificar uma condição em um campo dentro de um documento incorporado, usaremos a notação ponto. A notação de ponto requer citações ao redor do nome de campo pontilhado inteiro. A operação a seguir especifica uma condição de igualdade no campo zipcode no documento incorporado de endereço.

```py
cursor = db.Streetfighter.find({
    "body.height": 2.13
})
for doc in cursor:
  print(doc)

```
Como resultado, o comando acima exibira o documento Zangief, já que ele é o único com altura de 2.13. 

## Especificando operadores condicionais:

O MongoDB fornece operadores para especificar condições de consulta, como operadores de comparação. Embora existam algumas exceções, como os operadores condicionais `$or` e `$and`, as condições de consulta usando operadores geralmente têm a seguinte forma:

```py

{ <field1>: { <operator1>: <value1> } }

```

Para uma lista completa de operadores [https:\/\/docs.mongodb.com\/manual\/reference\/operator\/query\/](https://docs.mongodb.com/manual/reference/operator/query/)

### Operador Greater Than \($gt\)

Consuntando documentos cuja matriz "body" contém um documento incorporado com valor de campo maior que 83.

```py
cursor = db.Streetfighter.find({
    "body.weight": {"$gt": 83}
})
for doc in cursor: 
    print(doc) 
```
Como resultado, o comando acima exibirá os documentos de Ryu e Zangief, pois o peso do Ken não corresponde com o critério. 
Substitua o operador $gt por $lt e confira o resultado. 

### Combinando condições

Você pode combinar várias condições de consulta em conjunção lógica \(AND\) e disjunções lógicas \(OR\).

**Logical AND**

Você pode especificar uma conjunção lógica \(AND\) para uma lista de condições de consulta separando as condições com uma vírgula no documento de condições.

```py
cursor = db.Streetfighter.find({
    'force': 4, 'intelligence': 6
})
for doc in cursor: 
    print(doc)
```

**Logical "OR"**

Você pode especificar uma disjunção lógica (OR) para uma lista de condições de consulta usando o operador $or.
```py
cursor = db.Streetfighter.find({
    "$or": [{
        "force": 4}, {"body.blood": "o"
    }]
})
for doc in cursor: 
    print(doc)
```
#Atualizando dados com PyMongo
##Visão geral

Você pode atualizar os documentos de uma coleção usando os métodos `update_one` ou  `update_many`, sendo que, o `update_one` atualiza apenas um documento por vez, já o `update_many` atualiza todos os documentos que batem com o critério pré estabelecido.

##Atualizando um campo específico

Para alterar um campo de valor, MongoDB providencia operadores de atualização. Alguns operadores como o $set criarão o campo caso o campo não exista.

Veja mais sobre operadores de atualização aqui: https://docs.mongodb.com/manual/reference/operator/update/

##Atualizando campos

A operação a seguir, atualiza o primeiro documento com o nome igual a "ken", usando o operador $set para atualizar o campo "name".

```py

result = db.Streetfighter.update_one(

    {"name": "ken"}, 
        { "$set": { "name": " Kenneth Masters" }
    }
)
```
##Atualizando um campo incorporado
Para atualizar um campo em um documento incorporado, use a notação ponto. Ao usar a notação de ponto, coloque o nome do campo pontilhado inteiro entre aspas. O seguinte atualiza o campo de rua no documento de endereço incorporado.

```py
result = db.Streetfighter.update_one(
    {"name": "zangief"}, 
    {"$set": 
        {"body.blood": "a"}
    } 
)

```
