function igualdade(conta){
    var numeros = [ ]
    numeros[0] = ""
    var contNum = 0
    var operacao = []
    var contOp = 0
    var prioridade = []

    //codigo que separa os numeros das operações
    for(i=0;i<conta.length;i++){

        if(i === 0 && (conta.charAt(i) === "-"  ||  conta.charAt(i) === "+")){
            numeros [contNum] = conta.charAt(i)
        }

        else if(conta.charAt(i) === "+" ||
        conta.charAt(i) === "-" ||
        conta.charAt(i) === "x" ||
        conta.charAt(i) === "/"){
            
            if(conta.charAt(i+1) === "-" || conta.charAt(i+1) === "+"){
                contNum = contNum + 1
                numeros[contNum] = ""
                numeros[contNum] = numeros[contNum] + conta.charAt(i+1)
                operacao[contOp] = conta.charAt(i)
                contOp = contOp + 1 
            }else if(conta.charAt(i-1) != "+" &&
            conta.charAt(i-1) != "-" &&
            conta.charAt(i-1) != "x" &&
            conta.charAt(i-1) != "/"){
                operacao[contOp] = conta.charAt(i)
                contOp = contOp + 1
                contNum = contNum + 1
                numeros[contNum] = ""
            }    
        }else{
            numeros[contNum] = numeros[contNum] + conta.charAt(i)
        }
    }

    //codigo que define a prioridade que deve ser feita as operaçoes
    while(contOp>0){

        if(operacao[contOp-1] === "+" || operacao[contOp-1] === "-" ){
            prioridade[contOp-1] = 1
        }else if(operacao[contOp-1] === "x" || operacao[contOp-1] === "/" ){
            prioridade[contOp-1] = 2
        }

        contOp = contOp - 1
    }


    //codigo que faz as operações de multiplicação e divisao
    for(i=0;i<operacao.length;i++){

        if(prioridade[i] === 2){

            if(operacao[i] === "x"){
                numeros[i + 1] = parseFloat(numeros[i]) * parseFloat(numeros[i+1])
                numeros[i] = ""
            }else if(operacao[i] === "/"){
                numeros[i + 1] = parseFloat(numeros[i]) / parseFloat(numeros[i+1])
                numeros[i] = ""
            }
        }
    }

    //Codigo que transforma NaN e Infinity em 0
    for(i=0;i<numeros.length;i++){
        if(isNaN(numeros[i])){
            numeros[i] = "0"
        }
        else if(isFinite(numeros[i])){
            //vazio
        }
        else{
            numeros[i] = "0"
        }
    }

    //codigo que organiza os numeros na ordem para que possa fazer as outras operações
    for(i=0;i<numeros.length;i++){

        if(numeros[i] === ""){

            for(i2=i+1;i2<numeros.length;i2++){

                if(numeros[i2] !== ""){
                    numeros[i] = numeros[i2]
                    numeros[i2] = ""
                    i2 = numeros.length + 1
                }
            }
        }
    }
    

    //codigo que organiza as operações para que não haja problema
    var contador = 0
    for(i=0;i<operacao.length;i++){

        if(operacao[i] === "+" || operacao[i] == "-"){
            operacao[contador] = operacao[i]
            prioridade[contador] = prioridade[i]
            contador = contador + 1
        }
    }

    //codigo que faz as operações de soma e subtraçao
    for(i=0;i<contador;i++){

        if(prioridade[i] === 1){
            
            if(operacao[i] === "+"){
                numeros[i + 1] = parseFloat(numeros[i]) + parseFloat(numeros[i+1])
                numeros[i] = ""
            }else if(operacao[i] === "-"){
                numeros[i + 1] = parseFloat(numeros[i]) - parseFloat(numeros[i+1])
                numeros[i] = ""
            }
        }
    }

    //codigo que joga o resultado final para o variavel "numeros[0]"
    for(i=0;i<numeros.length;i++){

        if(numeros[i] === ""){

            for(i2=i+1;i2<numeros.length;i2++){
                
                if(numeros[i2] !== ""){
                    numeros[i] = numeros[i2]
                    numeros[i2] = ""
                    i2 = numeros.length + 1
                }
            }
        }
    }

    if(numeros[0] !== "0" ){

        numeros[0] = numeros[0].toFixed(5)

        //tirando os 0's das casas decimais
        while(numeros[0].substring(numeros[0].length, numeros[0].length - 1) === "0"){
            numeros[0] = numeros[0].substring(0,numeros[0].length - 1)
        }
    }

    

    //tirando possiveis pontos que ficariam soltos
    if(numeros[0].substring(numeros[0].length, numeros[0].length - 1) === "."){
        numeros[0] = numeros[0].substring(0,numeros[0].length - 1)
    }

    //retorno
    if(numeros[0] === ""){
        return "0"
    }
    else if(isFinite(numeros[0])){
        return numeros[0]
    }
    else{
        return "0"
    }
    
    
}


const calculadora = document.querySelector(".calculadora")
const teclas = calculadora.querySelector(".calculadoraTeclas")
const tela = calculadora.querySelector(".calculadoraTela")
var igualPressionado = false
var operacaoPressionado = false
var decimalPressionado = false
var numDecimal =  false
var ultimaTecla

//codigo que analisa se houve uma teclada selecionada
teclas.addEventListener("click", c => {
    if (c.target.matches("button")) {
        var tecla = c.target
        var acao = tecla.dataset.acao
        var teclaContent = tecla.textContent
        var telaNumero = tela.textContent

        if (!acao) {
            if(igualPressionado === false){
                if(telaNumero === "0"){
                    telaNumero = teclaContent
                }
                else{
                    telaNumero = telaNumero + teclaContent
                }
            }
            else{
                igualPressionado = false
                telaNumero = teclaContent
            }
            operacaoPressionado = false
            decimalPressionado = false
        }
        if(decimalPressionado === false){
            if(acao === "adicao" ||
                    acao === "subtracao"
            ){
                telaNumero = telaNumero + teclaContent
                igualPressionado = false
                operacaoPressionado = false
                decimalPressionado = false
                numDecimal = false
            }
            else if( (acao === "multiplicacao" ||
                    acao === "divisao") &&
                    operacaoPressionado == false){
                telaNumero = telaNumero + teclaContent
                operacaoPressionado = true
                igualPressionado = false
                decimalPressionado = false
                numDecimal = false
            }
            else if(acao === "igualdade"){
                telaNumero = igualdade(telaNumero)
                igualPressionado = true
                operacaoPressionado = false
                decimalPressionado = false
                numDecimal = false
            }
            else if(acao === "teclaDecimal" && numDecimal === false){
                if(telaNumero.substring(telaNumero.length, telaNumero.length - 1) === "0" ||
                telaNumero.substring(telaNumero.length, telaNumero.length - 1) === "1" ||
                telaNumero.substring(telaNumero.length, telaNumero.length - 1) === "2" ||
                telaNumero.substring(telaNumero.length, telaNumero.length - 1) === "3" ||
                telaNumero.substring(telaNumero.length, telaNumero.length - 1) === "4" ||
                telaNumero.substring(telaNumero.length, telaNumero.length - 1) === "5" ||
                telaNumero.substring(telaNumero.length, telaNumero.length - 1) === "6" ||
                telaNumero.substring(telaNumero.length, telaNumero.length - 1) === "7" ||
                telaNumero.substring(telaNumero.length, telaNumero.length - 1) === "8" ||
                telaNumero.substring(telaNumero.length, telaNumero.length - 1) === "9"){
                    telaNumero = telaNumero + "."
                }
                else{
                    telaNumero = telaNumero + "0."
                }
                numDecimal = true
                decimalPressionado = true
                igualPressionado = false
                operacaoPressionado = false
            }
        }

        if(acao === "teclaLimpar"){
            telaNumero = 0
            igualPressionado = false
            operacaoPressionado = false
            decimalPressionado = false
            numDecimal = false
        }
        if(acao === "teclaApagar"){
            igualPressionado = false
            operacaoPressionado = false
            decimalPressionado = false
            ultimaTecla = telaNumero.substring(telaNumero.length, telaNumero.length - 1)
            if(ultimaTecla === "x" ||
            ultimaTecla === "/"){
                operacaoPressionado = false
            }
            else if(ultimaTecla === "." ){
                decimalPressionado = false
                numDecimal = false
            }
            telaNumero = telaNumero.substring(0, telaNumero.length - 1)
            ultimaTecla = telaNumero.substring(telaNumero.length, telaNumero.length - 1)
            if(telaNumero === ""){
                telaNumero = "0"
            }
            else if(ultimaTecla === "x" ||
            ultimaTecla === "/"){
                operacaoPressionado = true
            }
            else if(ultimaTecla === "." ){
                decimalPressionado = true
                numDecimal = true
            }
            
        }
        tela.textContent = telaNumero
    }
})