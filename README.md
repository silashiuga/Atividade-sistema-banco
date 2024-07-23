# Atividade-sistema-banco
Está é uma atividade de sistema bancário desenvolvido com JavaScript e Node.js. 
Apenas imita algumas funcionalidades de um sistema de banco.

## Versão do NodeJs
Para executar o programa é necessário instalar o Node.js. A versão que usei para desenvolver o sistema é 20.15.1

## Execução do programa
Com o sistema já baixado no computador, é necessário instalar a depência. Entre no terminal, no caminho onde está o diretório do projeto, digite o seguinte comando:
```bash
npm install
```
Assim, a depência do 'prompt-sync' será instalada. Esta depêndencia permite a entrada de dados pelo terminal, para que o usuário 
interaja com sistema.

Com este processo concluído, digite o seguinte comando para iniciar o programa:
```bash
node index.js
```

## Fluxo do sistema
Ao iniciar o programa, é realizado o cadastro do titular, então será exibido o menu
inicial ao usuário, onde ele poderá selecionar a conta deseja acessar, conta corrente ou conta 
poupança, e também poderá sair do sistema. Ao selecionar a conta, será exibido
um menu da conta, com as opções de consultar saldo, depositar, e voltar ao menu inicial.
Quando o saldo de conta corrente for alterado, será aplicado uma taxa de juros sobre o saldo,
acrescentando o valor. Este processo é semelhante na conta poupança, onde é aplicado a taxa de
rendimento. 

