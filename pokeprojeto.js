var axios = require('axios')
var user = require('readline-sync')
var admin = require("firebase-admin");

var serviceAccount = require("./credenciais.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arbyte-73956.firebaseio.com"
});

var pokedex = 'Pokédex'
var db = admin.database().ref(pokedex)

function mostraPokedex(){
    db.on('value', snapshot => {
        console.log(snapshot.val())
      menu()
      })
}

function pokemonsDoMesmoTipo(){
    var id = user.question('Digite o ID ou o nome do seu Pokemon: ')
    axios.get(`https://pokeapi.co/api/v2/type/${id}`)
        .then(resultado => {
            console.log(resultado.data.pokemon)
            menu()
        })
    .catch(erro => {
        console.log('Erro ao consultar Pokemon...')
        menu()
    })
}

function detalhesHabilidades(){
    var id = user.question('Digite o id ou o nome do Pokemon desejado: ')
    axios.get(`https://pokeapi.co/api/v2/ability/${id}`)
        .then(resultado => {
            console.log(resultado.data.effect_entries)
            menu()
        })
    .catch(erro =>{
        console.log('Erro ao consultar Pokemon...')
    })
}

function detalhesTipo(){
    var id = user.question('Digite o id ou o nome do Pokemon: ')
    
    axios.get(`https://pokeapi.co/api/v2/type/${id}`)
        .then(resultado =>{
            console.log(resultado.data.damage_relations)
            menu()
        })
    .catch(erro =>{
        console.log('Erro ao consultar o Pokemon...')
        menu()
    })
}

function cadastraPokemon(){
  var treinador = user.question('Ola treinador! Digite seu Nickname: ')
  var id = user.question('Digite o ID ou o nome do Pokemon que quer adicionar ao seu Pokedex: ')
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(resultado =>{
        db.push({
            treinador: treinador,
            id: id,
            pokemon: resultado.data.name,
            tipo: resultado.data.types,
            habilidades: resultado.data.abilities
        })
        console.log(`\n Hey, o Pokemon ${resultado.data.name} foi adicionado ao seu Pokedex!!!\n`)
      menu()
    })
  .catch(erro =>{
      console.log('Erro ao cadastrar o pokemon')
      menu()
  })
}


function mostraDados(){
    var id = user.question('Digite o ID do pokemon: ')

    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(resultado => {
            console.log(resultado.data)
            menu()
        })
        .catch(erro => {
            console.log('Desculpe, não achamos o seu Pokemon.',)
            menu()
        })
}


function mostraPokemon(){
    
    var id = user.question('Digite o ID ou o nome do Pokemon: ')
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(resultado =>{
        
        console.log(resultado.data.name)
        console.log(resultado.data.types)
        console.log(resultado.data.abilities)
        console.log('\n')
        menu()
    })
}
function PegaPokemon(){
    
var id = user.question('Digite um numero para pegar um Pokemon: ')

axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
.then(resultado =>{
    
    console.log(` Voce digitou o ID : ${id}\n Uhuuuul!!! Treinador, vc acabou de pegar ${resultado.data.name}`)
    console.log('\n')
    menu()

})

.catch(erro=>{
    console.log('nenhum pokemon capturado, mas tudo bem, tente novamente')
    menu()
})
return console.log('boa treinador')

} 

function menu(){
console.clear
console.log('\n ===================== MOSTRE QUE VC É UM TREINADOR ===================== \n')


var interaçoes = user.questionInt(' Digite 1 parar consultar um Pokemon: \n Digite 2 para ver as habilidades e o tipo de um pokemon de sua escolha: \n Digite 3 para adicionar o seu Pokemon ao pokedex: \n Digite 4 para ver os pokedex dos treinadores: \n Digite 5 para mostrar todos os dados do Pokemon: \n Digite 6 para ver detalhes do tipo do seu Pokemon: \n Digite 7 para mostrar Pokemons do mesmo tipo que o seu:  \n Digite 8 para ver em detalhes as habilidades do seu Pokemon: \n Digite 9 para sair do programa ')



if(interaçoes == 1){
    PegaPokemon()
}if(interaçoes == 2){
    mostraPokemon()    
}if(interaçoes == 3){
    cadastraPokemon()
}if(interaçoes == 4){
    mostraPokedex()
}if(interaçoes == 5){
    mostraDados()
}if(interaçoes == 6){
    detalhesTipo()
}if(interaçoes == 7){
    pokemonsDoMesmoTipo()
}if(interaçoes == 8){
    detalhesHabilidades()
}
else if (interaçoes == 9) {
    process.exit()
  }
}
menu()