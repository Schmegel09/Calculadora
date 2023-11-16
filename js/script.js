'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]')
const operadores = document.querySelectorAll('[id*=operador]')

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaopendente = () => operador != undefined;

const calcular = () => {
    if(operacaopendente()){
        const numeroAtual = parseFloat(display.textContent);
        novoNumero = true
        if(operador === '+'){
           atualizarDisplay(numeroAnterior + numeroAtual)
        }else if (operador === '-'){
             atualizarDisplay(numeroAnterior - numeroAtual)
         }else if (operador === '÷'){
             atualizarDisplay(numeroAnterior / numeroAtual)
        }else if (operador === '*'){
            atualizarDisplay(numeroAnterior * numeroAtual)
         }
    }
}


const atualizarDisplay = (texto) => {
    if(novoNumero){
        display.textContent = texto;
        novoNumero = false;
    }else{
        display.textContent += texto;
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach (numero => numero.addEventListener('click',inserirNumero));

const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent);
        console.log (operador);
    }
}
operadores.forEach (operador => operador.addEventListener('click',selecionarOperador));


const ativarigual = () => {
    calcular();
    operador = undefined;
}

document.getElementById('result').addEventListener('click', ativarigual);

const limparDisplay = () => {
    display.textContent = '0';
    novoNumero = true;
    operador = null;
}

document.getElementById('limpadisplay').addEventListener('click',limparDisplay);

const existeValor = () => display.textContent.length >= 0;
const existeDecimal = () => display.textContent.indexOf(',') != -1;
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');
        }
    }
}

document.getElementById('decimal').addEventListener('click',inserirDecimal);

