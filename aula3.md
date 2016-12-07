##MapReduce X Aggregate
Vamos utilizar o modelo de programação introduzido pelo Google, MapReduce, para contar as ocorrências dos termos: ar, er, ir, or, ur na coleção Vocabulary assim como cada letra do alfabeto. O framework Aggregate será utilizado para contar o total de itens cujo campo total seja maior que 1 mil.

**A) Utilizando as funções de mapReduce do mongo, conte o número de palavras que terminam em ar, er, ir, or, ur.**

```javascript
db.Vocabulary.mapReduce(
// map
    function(){
    emit(this.text.substring(this.text.length - 2, this.text.length), 1);
},
// reduce
    function(key, values){
    return Array.sum(values);
},
    {
    // critério
    query:{text:  /((ar)|(er)|(ir)|(or)|(ur))$/},
    out:'saida'
    }
)

db.saida.find({})
```

**B) Utilizando as funções de mapReduce do mongo para contar o total de cada caractere existente na Collections Vocabularyy. Por exemplo: aula -> a:2, u:1, l:1**

```javascript
db.Vocabulary.mapReduce(
// map
	function(){
		if(this.text != undefined){
		    for (var i = 0, len = this.text.length; i < len; i++) {
		      emit(this.text[i], 1);
		    }
		}
	}, 
// reduce
  function(key, value){
		return Array.sum(value);
	},
{
//critério
	query: {},
	out: "saida"
})

db.saida.find({"_id": {"$in": ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p", "q", "r",
                               "s","t","u","v","w","x","y","z"]}})
                                     
```

**C) Utilizando a função de agregação para contar quantos itens cujo o campo total seja maior do que 1000, agrupando-os por tipo, (campo type) e exibindo o resultado em ordem crescente.**
```javascript
db.Vocabulary.aggregate(
	[
		{"$match": {"total": {"$gt": 1000}}},
		{"$group": {"_id": "$type"}},
		{"$sort": {"_id": 1}}
	]
)

```
