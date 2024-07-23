const prompt = require('prompt-sync')();
const Corrente = require('./contaCorrente'); 
const Poupanca = require('./contaPoupanca'); 

/** Ao iniciar o programa, é realizado o cadastro do titular, então será exibido o menu
 * inicial ao usuário, onde ele poderá selecionar a conta ele quer acessar, conta corrente ou conta 
 * poupança, e também poderá sair do sistema. Ao selecionar a conta, será exibido
 * um menu da conta, com as opções de consultar saldo, depositar, e voltar ao menu inicial.
 * Quando o saldo de conta corrente for alterado, será aplicado uma taxa de juros sobre o saldo,
 * acrescentando o valor. Este processo é semelhante na conta poupança, onde é aplicado a taxa de
 * rendimento. 
 */

// Estas variáveis armazenarão as instâncias das classes conta poupança e conta corrente
// conforme o usuário utiliza o sistema
let contaCorrente;
let contaPoupanca;

// Variável para o titular
let titular = '';

// Variável que indica o tipo de conta selecionada
let respostaTipoConta = '';

//Variáveis de controle do loop while
let continuaConta = true;
let continuaPrograma = true;

// Função responsável por validar o nome do titular e as opções dos menus
function validaDadosEntrada(tipo, valor){
  /** 
    Caso o valor seja inválido o retorno será true, para repetir o loop no while
    de entrada de dados. Quando o valor for válido, o retorno será false, para
    continuar com o programa.
  */

  // Valida se os valores de entrada são vazios
  if(!valor){
    console.error('Por favor, insira um valor\n');
    return true;
  } 

  // Se a validação anterior estiver correta, este 'if' de nome do titular estará 
  // válido
  if(tipo == 'titular'){
    return false;
  }

  // Validação da resposta do tipo de conta que o usuário escolher para usar
  // no sistema
  if(tipo == 'respostaTipoConta'){
    if((valor != '1') && (valor != '2') && (valor != '3')){
      console.error('Por favor, informe uma resposta válida\n');
      return true;
    }
    return false;
  }

  // Validação de resposta no menu da conta
  if(tipo == 'menuConta'){
    if((valor != '1') && (valor != '2') && (valor != '3') && (valor != '4')){
      console.error('Por favor, informe uma resposta válida\n');
      return true;
    }
    return false;
  }
}

// Está função é responsável por exibir o menu inicial, onde o usuário poderá
// selecionar que tipo de conta ele irá usar, ele também poderá sair do sistema
function menuInicial(){

  // Variável de controle do loop da resposta
  let respostaOpcao = true;

  // Loop para a entrada e validação da resposta 
  while(respostaOpcao){
    console.log('');
    console.log('----- Menu Inicial -----\n')
    console.log('Digite o número correspondente a opção da conta bancária: ');
    console.log('1 - Conta Corrente');
    console.log('2 - Conta Poupança');
    console.log('3 - Sair do programa \n');

    // Entrada da resposta
    respostaTipoConta = prompt('Resposta: ');

    // Chama o método de validação
    respostaOpcao = validaDadosEntrada('respostaTipoConta', respostaTipoConta);

    // Caso a resposta for '3' o loop de continuar programa será parado e o
    // sistema será finalizado
    if(respostaTipoConta == '3'){
      continuaPrograma = false;
    }
  }
}

// Função responsável pelo cadastro do titular
function cadastroTitular(){

  // Variável de controle do loop
  let validaCadastroTitular = true

  //Loop para validação e cadastro do titular
  while(validaCadastroTitular){
    console.log('')

    //Entrada do nome
    titular = prompt('Olá, informe seu nome: ');

    // Chama a função de validação
    validaCadastroTitular = validaDadosEntrada('titular', titular);
  }   
}

// Está função é responsável por exibir o menu da conta (corrente ou poupança),
// onde o usuário poderá selecionar as opções que deseja executar
function menuConta(tipo){

  // Variável de controle do loop 
  let validaOpcao = true;

  // Variável que armazenará a resposta
  let resposta;

  // loop para a entrada da resposta
  while(validaOpcao){

    console.log(`----- Menu ${tipo} -----\n`);
    console.log('Digite o número da opção que deseja executar: ')
    console.log('1 - Consultar saldo');
    console.log('2 - Depositar');
    console.log('3 - Sacar');
    console.log('4 - Voltar ao Menu Inicial \n');
    
    //Entrada da resposta
    resposta = prompt('Resposta: ');

    //Chama a função de validação
    validaOpcao = validaDadosEntrada('menuConta', resposta);
  }

  //Retorna a resposta
  return resposta;
}

// Função responsável por exibir o saldo da conta
function saldo(contaAtual){
  console.log('');
  console.log('-------------------');
  console.log('Saldo Disponível: \n');
  console.log(`R$ ${contaAtual.saldo}`);
  console.log('-------------------');
  console.log('');
}

// Função para realizar o depósito na conta
function depositarValor(objetoConta){

  // Variável de controle do loop 
  let validaDeposito = true

  // Loop para validar a entrada do valor de depósito
  while(validaDeposito){
    console.log('')

    // Entrada do valor
    valor = prompt('Informe o valor do depósito: ');
    /** 
      Com a instância da conta (corrente ou poupança), é chamado o método do depósito.
      Neste objeto conta, serão realizados: a validação, a conversão e o armazenamento do valor, 
      e também a aplicação da taxa sobre o novo saldo.
    */
    validaDeposito = objetoConta.depositar(valor);
  }

}

// Função para realizar o saque na conta
function sacar(objetoConta){

   // Variável de controle do loop 
  let validaSaque = true

  // Loop para validar a entrada do valor do saque
  while(validaSaque){
    console.log('')

    // Entrada do valor a ser sacado
    valor = prompt('Informe o valor do saque: ');

    /** 
      Com a instância da conta (corrente ou poupança), é chamado o método do saque.
      Neste objeto, serão realizados: a validação, a conversão e a retirada do valor, 
      e assim como no depósito, a taxa será calculada sobre o novo saldo.
    */
    validaSaque = objetoConta.sacar(valor);
  }
}
/** 
  Está função é responsável por direcionar as opções do menu da conta, escolhidas pelo usuário,
  para as respectivas funções. Nesta parte, a função de menu é chamada, e conforme a opção 
  que o usuário selecionar, as funções serão chamadas (depósito, saque, consulta
  saldo), também é possível voltar ao menu inicial.
*/
function interacaoConta(objetoConta, tipo){
  console.log('');
  console.log(`--------- ${tipo} ---------\n`);
  console.log(`Titular: ${objetoConta.titular}\n`);
  console.log(`Quando o saldo for alterado, será aplicado uma taxa de ${(objetoConta.taxa)*100}% sobre o valor do saldo.\n`);

  // resposta do usuário na interação do menu
  let resposta = '';

   // Variável de controle do loop
  continuaConta = true;

  // Loop para manter o acesso do usuário no menu da conta, até que
  // ele queira sair 
  while(continuaConta){

    // Opção escolhida 
    resposta = menuConta(tipo);

    // Chama o método para consultar saldo
    if(resposta == '1'){
     saldo(objetoConta);

     // Chama o método para realizar o depósito
    } else if(resposta == '2'){
      console.log('');
      console.log('----- Depositar ------');
      depositarValor(objetoConta);

       // Chama o método para realizar o saque
    } else if(resposta == '3'){
      console.log('');
      console.log('----- Sacar ------');
      sacar(objetoConta);

      // Volta ao início
    } else {
      continuaConta = false;
    }
  }
}
/** 
  Este método é acionado assim que o tipo de conta for selecionado, para direcionar
  a conta específica. Caso o objeto da conta não foi criado, será realizado uma nova
  instância. Essa instância é passada por paramêtro na execução do método 'interação conta'
*/
function encaminharConta(){

  // Variável usada para como 'título', para definir o tipo de conta
  let tituloConta;

  // Conta corrente
  if(respostaTipoConta == '1') {
    tituloConta = 'Conta Corrente';

    // Criação da instância do objeto conta corrente
    if(!contaCorrente){
      contaCorrente = new Corrente(titular);
    }
    // Chama o método 'interação conta' para o usuário acessar a conta corrente,
    // passando por parâmtero o respectivo objeto e seu título
    interacaoConta(contaCorrente, tituloConta);
    
    // Conta poupança
  } else {
    tituloConta = 'Conta Poupança';

    // Criação da instância do objeto conta poupança
    if(!contaPoupanca){
      contaPoupanca = new Poupanca(titular);
    }
    // Chama do método 'interação conta' para o usuário acessar a conta poupança,
    // passando por parâmtero o respectivo objeto e seu título
    interacaoConta(contaPoupanca, tituloConta);
  }
}

// Fluxo principal do sistema
// Início
console.log('')
console.log('Bem vindo ao Banco')
cadastroTitular();
while(continuaPrograma){
  menuInicial();
  if(continuaPrograma){
    encaminharConta();
  }
}
console.log('');
console.log('Programa Finalizado.')
//Fim


