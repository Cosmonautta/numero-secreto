/*let titulo = document.querySelector('h1');
let paragrafo = document.querySelector('p');

titulo.innerHTML = 'Jogo do Numero Secreto';
paragrafo.innerHTML = 'Esscolha um numero entre 1 e 10.';*/
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela (tag, texto){ //ler com atencao essa parte do codigo que substitui a parte comentada acima
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2}); // Nessa linha adicionamos a voz (linha 7 do HTML)
}
function mensagemInicial (){
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 10');
}
mensagemInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Muito bem! Voçê acertou o numero secreto após ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O numero secreto é menor!')
        } else{
            exibirTextoNaTela('p', 'O numero secreto é maior!')
            
        }
        tentativas++
        limparCampo()
    }
    
}

function gerarNumeroAleatorio() {
        let numeroEscolhido = parseInt(Math.random() * numeroLimite +1); //esse codigo serve para gerar um numero aleatorio de 2 digitos
        let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
        if(quantidadeDeElementosNaLista == numeroLimite){//aqui estamos dizendo que quando todos os numeros ja tiverem sido escolhidos a lista limpa
            listaDeNumerosSorteados = [];
        }
        if (listaDeNumerosSorteados.includes(numeroEscolhido)){//se o numero escolhido ja tiver sido sorteado esse comando gera um novo numero
            return gerarNumeroAleatorio();
        } else{
            listaDeNumerosSorteados.push(numeroEscolhido)
            return numeroEscolhido;
        }
    }
function limparCampo (){
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}