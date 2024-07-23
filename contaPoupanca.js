const Conta = require("./conta");

// Classe Conta Poupança que herda da classe Conta
class ContaPoupanca extends Conta{

  // Construtor Conta Poupança
  constructor(titular){

    // Passa o valor titular por parâmetro ao contrutor Conta
    super(titular)
  }

  // Taxa de rendimento
  taxa = 0.06;

  // Método responsável por aplicar a taxa de rendimento sobre o saldo
  aplicarRendimento(){
    console.log(`O rendimento aplicado é ${(this.taxa)*100}% sobre o valor do saldo final\n`);

    // Cálculo do rendimento
    this.saldo = this.saldo + (this.saldo * this.taxa);

    // Transforma o valor para ter até duas casas após a vírgula
    this.saldo = parseFloat(this.saldo.toFixed(2));

    // Saldo final
    console.log(`Saldo final: R$ ${(this.saldo)}\n`);
  }

  // Método de depósito para encaminhar a aplicação da taxa 
  depositar(valor){

    // Executa este método na classe Conta, e o valor retornado indica se
    // é válido (false) ou inválido (true). 
    let validaValor = super.depositar(valor);

    // Caso seja válido, o método de aplicar rendimento será chamado
    if(!validaValor){
      this.aplicarRendimento();

      // Retorna falso para sair do loop while e continuar com o programa
      return false;
    }

    // Caso o valor seja inválido, o retorno será true
    return true;
  }

  // Método de saque para encaminhar a aplicação da taxa
  sacar(valor){

    // Executa este método na classe Conta 
    let validaValor = super.sacar(valor);

    // Caso seja válido, o método de aplicar rendimento será chamado
    if(!validaValor){
      this.aplicarRendimento();

      // Retorna falso para sair do loop while 
      return false;
    }

    // Caso o valor seja inválido, o retorno será true
    return true;
  }
}

module.exports = ContaPoupanca;