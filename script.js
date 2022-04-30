let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("msg");

/*padrao de vitoria*/
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6], 
    [2, 5, 8], 
    [6, 7, 8], 
    [3, 4, 5], 
    [1, 4, 7], 
    [0, 4, 8], 
    [2, 4, 6]
];
/*desativa os botoes */
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    /*mostra popup*/
    popupRef.classList.remove("hide");
};
/*habilita todos os botoes (novo jogo e reiniciar) */
const enableButtons = () => {
    btnRef.forEach(element => {
        element.innerText = "";
        element.disabled = false;
        /*desabilita popup */
        popupRef.classList.add("hide");
    });
}

/*novo jogo */
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();

});
/*reiniciar*/
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();

});

/*jogador X (joga primeiro)*/
let xTurn = true; /*controla o turno */
let count = 0;

/*executada quando o jogador ganha */
const winFunction = (letter) => {
    disableButtons();
    if(letter == "X"){
        msgRef.innerHTML = "Jogador 'X' ganhou!"
    }
    else{
        msgRef.innerHTML = "Jogador 'O' ganhou!"
    }
};
/*caso de empate */
const drawFunction = () =>{
    disableButtons();
    msgRef.innerHTML = "Empate!";
}

/*teste vitoria */
const winChecker = () =>{
    /*percorre o array de padroes de vitoria */
    for(let i of winningPattern){
        let [el1, el2, el3] = 
        [
            btnRef[i[0]].innerText, 
            btnRef[i[1]].innerText, 
            btnRef[i[2]].innerText
        ];
        console.log(btnRef[i[0]].innerText);//testeee
        /*checa se os elementos estao preenchidos */
        if(el1 != "" && el2 != "" && el3 != ""){
            if(el1 == el2 && el2 == el3){
                winFunction(el1);
            }
        }
    }
};
/*Mostra X ou O */
btnRef.forEach((element) =>{
    element.addEventListener("click", ()=>{
        if(xTurn){
            xTurn = false;
            /*mostra X */
            element.innerText = "X";
            element.disabled = true; //impede que o outro jogador jogue na mesma casa
        }
        else{
            xTurn = true;
            /*mostra O */
            element.innerText = "O";
            element.disabled = true;
        }
        /*incrementa o numero de jogadas */
        count ++;
        if(count == 9){
            /*se chegar a 9 = empate*/
            drawFunction();
        }
        /*checa se houve vitoria */
        winChecker();
    });
});
/*habilita botoes e desabilita popup quando a pagina esta carregada*/
window.onload = enableButtons;