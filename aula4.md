## Criando e Excluindo Índices
**Procurando pela palavra `feliz` e exibindo estatísticas da pesquisa**
```js
db.Vocabulary.find({text: "feliz"}).explain({"executionStats":1})
```

Exibindo tempo total que a busca tomou e quantidade de objetos consultados
```js
// resultado:
"executionTimeMillis": 172,
"totalDocsExamined": 291214,
```
**Criando um índice para nosso banco de dados**
```js
db.Vocabulary.createIndex({"text": 1}, {expireAfterSeconds: 3600})
// verifica se o indice foi criando
db.Vocabulary.getIndexes()
```
```js
// resultado
  {
    "v": 1,
    "key": {
      "text": 1
    },
    "name": "text_1",
    "ns": "nosqlclass.Vocabulary",
    "expireAfterSeconds": 3600
  }
```
Refazendo a pesquisa a fim de deduzir se o novo índice a tornou mais veloz:
```js
db.Vocabulary.find({text: "feliz"}).explain({"executionStats":1})
```
Resultado
```js
"executionTimeMillis": 18,
```
**Removendo o índice previamente criado**
```js
db.Vocabulary.dropIndex('text_1')
```
