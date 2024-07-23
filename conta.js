class Conta {
  // Variável que armazena o saldo
  saldo = 0.00;

  // Regex para validação de números
  regexFormatoNumeros = /^-?(\d+([.,]\d+)?|\d{1,3}([.,]\d{3})*([.,]\d+)?)$/;

  // Variável para armazenar o valor de entrada convertido em número
  valorConvertido = 0;

  // Variável para indicar se o valor de entrada está valido ou não
  validaValor = false;

  // Construtor, onde será atribuído o titular
  constructor(titular){
    this.titular = titular;
  }

  // Este método é responsável por validar e tratar o valor de entrada (depósito ou saque).
  // Caso seja válido, o valor é convertido para número 
  validarEntrada(valor, tipo){
    
    // Elimina os espaços
    valor = valor.trim();

    // Verifica se o valor é string e se não está vazio
    if(valor && typeof(valor) == 'string'){
      
      const pontos = valor.match(/\./g);
      const virgulas = valor.match(/,/g);

      if(pontos && virgulas){
        console.error('Entrada inválida. Por favor, use ponto ou vírgula apenas para indicar a unidade de centavos\n');
        return true;
      }
      if(pontos && pontos.length > 1){
        console.error('Entrada inválida. Por favor, use ponto apenas para indicar a unidade de centavos\n');
        return true;
      }
      if(virgulas && virgulas.length > 1){
        console.error('Entrada inválida. Por favor, use vírgula apenas para indicar a unidade de centavos\n');
        return true;
      }
      // Caso o valor tenha vírgula será transformado para ponto
      if(valor.includes(',')){
        valor = valor.replace(',', '.');
      }

      // Verifica se o valor é numérico
      if(this.regexFormatoNumeros.test(valor)){

        // Verifica a ocorrência de pontos no valor
        const pontos = valor.match(/\./g);

        // Caso haja mais de um ponto, só será deixado o último
        // que são os centavos
        if(pontos && pontos.length > 1){
          console.log('veio')
          valor = valor.replace(/\.(?=.*\.)/g, '');
          console.log(valor)
        }
        
        // Valida caso seja negativo
        if(valor <= 0){
          console.error('Insira valores maiores que R$ 0\n');
          return true;
        }
        // Converte o valor para número e atribui para a variável 
        this.valorConvertido = parseFloat((+valor).toFixed(2));

        // Se a operação for saque, será verificado se o valor 
        // é maior do que o saldo disponível
        if(tipo == 'saque'){
          if(this.valorConvertido > this.saldo){
            console.error(`O processo não pode ser efetuado, pois o valor de saque é maior que o saldo de R$ ${this.saldo}\n`);
            return true;
          }
        }

        // Valor válido
        return false;

      } else {
        // Caso a entrada não seja números
        console.error('Insira valores númericos\n');
        return true;
      }
    } else {
      // Caso a entrada seja vazia
      console.error('Por favor, insira um valor\n');
      return true;
    }
  }

  // Método responsável por efetuar o depósito no objeto conta (corrente ou poupança)
  depositar(valor){

    // Validação do valor de depósito
    let validaValor = this.validarEntrada(valor);

    // Caso o depósito seja válido, o valor será atribuído para o saldo 
    if(!validaValor){
      this.saldo += this.valorConvertido;
      console.log('');
      console.log(`O valor a ser depositado é R$ ${this.valorConvertido}\n`); 
      return false
    }
    return true;
  }

  // Método responsável por efetuar o saque no objeto conta (corrente ou poupança)
  sacar(valor){

    // Validação do valor de depósito
    let validaValor = this.validarEntrada(valor, 'saque');

    // Caso o saque seja válido, o valor será descontado do saldo 
    if(!validaValor){
      this.saldo -= this.valorConvertido;
      console.log('');
      console.log(`O valor a ser sacado é R$ ${this.valorConvertido}\n`);
      return false
    }
    return true;
  }

}

module.exports = Conta;