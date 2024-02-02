/* Maneira mais rudmentar de declarar, sendo declarado um por um, separadamente.
let titulo = document.querySelector('h1');
 titulo.innerHTML = 'Jogo do número secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
*/

let listaDeNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();//onde o número será gerado aleatoriamente, ou pode colocar um número desejado para a resposta
let tentativas = 1;

function exibirTextoNaTela(tag, texto){ //comando para poder selecionar itens do HTML para alteração
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.1});
}

function exibirMensagemInicial(){
exibirTextoNaTela('h1', 'Jogo do número secreto'); //para alterar o texto da tela no (h1) sem mudar o HTML
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');//para alterar o texto da tela no (p) sem mudar o HTML
}
exibirMensagemInicial(); //Retorna a mensagem

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    //Contagem de tentativas de acertar o número
    if (chute == numeroSecreto){ //Caso você acerte o número secreto
        exibirTextoNaTela('h1' , 'Acertou!');
        let palavraTentativas =tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}.`;
        exibirTextoNaTela('p' , mensagemTentativas); 
        document.getElementById ('reiniciar').removeAttribute('disabled');//Para ativar o atributo Novo Jogo, disabilitanto o disable do HTML(o código está removendo o atributo disabled do HTML)
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor.');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        //tentativas = tentativas + 1; outro metodo caso n queria usar o [nome da variavel] ++
        tentativas ++;
        limparCampo();
    }
}

//para gerar o número aleatório entre 1 a 10, a lista e para verificar se o número já saiu e para evitar que saia de novo
function gerarNumeroAleatorio(){ 
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;
    
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumeroSorteados = [];
    }
    if(listaDeNumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumeroSorteados.push(numeroEscolhido);

        return numeroEscolhido;
    }
}

//para limpar o campo de respostas caso erre o número
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

//para limpar e reiniciar o jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true );
}