var admin = require("firebase-admin");
var user = require("readline-sync")
var serviceAccount = require("./credenciais.json");
var question = ''

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arbyte-73956.firebaseio.com"
});

var referencia = 'carros'
var db = admin.database().ref(referencia)

function Menu(){
  question = user.questionInt('Digite 1 para cadastrar um carro\nDigite 2 Para visualizar carros cadastrados\nDigite 3 para filtro de maiores valores\nDigite 4 para filtrar valor menor\nDigite 5 para filtro de valor exato\nDigite 6 para sair do programa\n')
}

Menu()
function CadastraCarro(carro, valor){
  db.push({
    nomecarro: carro,
    valor: valor

  }, Menu)

}
if (question ==1) {

  var carro = user.question('Digite o nome do carro a ser cadastrado: ');
  var valor = user.question('Digite o valor do carro cadastrado acima: ');
  CadastraCarro(carro, valor)
  
}
 else if (question ==2) { 
     db.orderByChild('carro').on("child_added", snapshot => {
     console.log(snapshot.val())
   
    })
  }
   else if (question==3) {

   var maiorValor = user.questionFloat("Digite o numero para filtro dos carros com maior valor: ")
   db.orderByChild('valor').startAt(maiorValor)
   .on('child_added' , (snapshot) => {
     console.log(snapshot.val())
    })
   }
  
    else if (question==4) {
    var menorValor = user.questionFloat("Digite o numero para filtro dos carros com menor valor: ")
    db.orderByChild('valor').endAt(menorValor)
    .on('child_added' , (snapshot) => {
      console.log(snapshot.val())
      })
    }
      else if (question==5) {
      var valorExato = user.questionFloat("Digite o valor exato ")
      db.orderByChild('valor').equalto(valorExato)
      .on('child_added' , (snapshot) => {
        console.log(snapshot.val())
      })
      }
        else if (question==6) {
          process.exit()
        }
          else {
            console.log ('Numero inválido! Digite números de 1 a 6')}