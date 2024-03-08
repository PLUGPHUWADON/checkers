const board = document.querySelector(".borad");
let arrsocket = document.querySelectorAll(".socket");
let arrhos = document.querySelectorAll(".hos");

const arrboard = [
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1]
];
let checkfirstgame = 0;
let checkclickhos = 1;
let checkdouble = 0;
let numbersocketdefault = 0;
let numbersocket = 0;
let indexsocket = 0;
let indexhos = 0;
let eatleft = false;
let eatright = false;
let indexeat = 0;

let testp = 1;
arrboard.forEach((j,i) => {
    j.forEach(e => {
        const div = document.createElement("div");
        const hos = document.createElement("div");
        const p = document.createElement("p");
        p.innerHTML = testp
        p.style.color = "#fff"
        div.appendChild(p);
        div.className = "socket";
        if (e == 1) {
            div.classList.add("socket1");
            div.number = testp;
        }
        else if (e == 0) {
            div.classList.add("socket2");
        }

        if (i >= 0 && i <= 1 && e == 1) {
            hos.classList.add("hos");
            hos.className = "hos";
            hos.style.backgroundColor = "yellow"
            hos.id = 1;
            div.appendChild(hos);       
        }
        else if (i >= 6 && i <= 7 && e == 1) {
            hos.classList.add("hos");
            hos.className = "hos";
            hos.id = 2;
            div.appendChild(hos);
        }

        testp++;
        board.appendChild(div);

        // let podiv = div.getBoundingClientRect();
        // let pohos = hos.getBoundingClientRect();
        // if (podiv.top < pohos.bottom &&
        //     podiv.bottom > pohos.top &&
        //     podiv.left < pohos.right &&
        //     podiv.right > pohos.left) {
        //         div.go = false;
        //     }

        arrsocket = document.querySelectorAll(".socket");
        arrhos = document.querySelectorAll(".hos");
    });
});

window.addEventListener("click",(event) => {
    //first
    if (checkfirstgame == 0) {
        console.log("first")
        if (checkclickhos == 1) {
            if (event.target.className == "hos") {
                indexhos = Array.from(arrhos).indexOf(event.target);
                if (indexhos >= 0 && indexhos <= 7) {
                    numbersocket = event.target.parentNode.number + 7;
                }
                else {
                    numbersocket = event.target.parentNode.number - 7;
                }
            }
            if (event.target.className == "socket socket1") {
                numbersocketdefault = event.target.number;
                indexsocket = Array.from(arrsocket).indexOf(event.target);
                if (indexhos >= 0 && indexhos <= 7) {
                    if (numbersocketdefault == numbersocket || numbersocketdefault == numbersocket + 2) {
                        arrsocket[indexsocket].appendChild(arrhos[indexhos]);
                        if (indexhos >= 0 && indexhos <= 7) {
                            checkfirstgame = 2;
                        }
                        else {
                            checkfirstgame = 1;
                        }
                    }
                }
                else {
                    if (numbersocketdefault == numbersocket || numbersocketdefault == numbersocket - 2) {
                        arrsocket[indexsocket].appendChild(arrhos[indexhos]);
                        if (indexhos >= 0 && indexhos <= 7) {
                            checkfirstgame = 2;
                        }
                        else {
                            checkfirstgame = 1;
                        }
                    }
                }
            }
        }
        return;
    }

    //player1
    if (checkfirstgame == 1) {
        if (event.target.className == "hos") {
            indexhos = Array.from(arrhos).indexOf(event.target);
            numbersocket = event.target.parentNode.number + 7;
            indexsocket = Array.from(arrsocket).findIndex(e => e.children[0].innerHTML == numbersocket);

            //check eat
            if (indexhos >= 0 && indexhos <= 7) {
                try{
                    if (arrsocket[indexsocket + 2].children.length > 1 && arrsocket[indexsocket + 11].children.length == 1) {
                        if (arrsocket[indexsocket + 2].children[1].id != 1) {
                            if (arrsocket[indexsocket + 11].className == "socket socket1") {
                                eatright = false;
                                eatleft = true;
                                indexeat = arrsocket[indexsocket + 2].children[1];
                            }
                        }
                    }
                    else if (arrsocket[indexsocket].children.length > 1 && arrsocket[indexsocket + 7].children.length == 1) {
                        if (arrsocket[indexsocket].children[1].id != 1) {
                            if (arrsocket[indexsocket + 7].className == "socket socket1") {
                                eatleft = false;
                                eatright = true;
                                indexeat = arrsocket[indexsocket].children[1];
                            }
                        }
                    }
                }
                catch{
                    console.log("err")
                }
            }

            checkclickhos = 2;
        }
        else if (checkclickhos == 2) {
            if (event.target.className == "socket socket1") {
                numbersocketdefault = event.target.number;
                indexsocket = Array.from(arrsocket).indexOf(event.target);
                if (indexhos >= 0 && indexhos <= 7) {
                    if (eatleft == false && eatright == false) {
                        if (numbersocketdefault == numbersocket || numbersocketdefault == numbersocket + 2) {
                            arrsocket[indexsocket].appendChild(arrhos[indexhos]);
                            checkclickhos = 1;
                            checkfirstgame = 2;
                            eatleft = false;
                            eatright = false;
                            
                        }
                    }
                    else if (eatleft == true) {
                        if (numbersocketdefault == numbersocket + 11) {
                            arrsocket[indexsocket].appendChild(arrhos[indexhos]);
                            checkclickhos = 1;
                            checkfirstgame = 2;
                            eatleft = false;
                            eatright = false;
                            indexeat.remove();
                        }
                    }
                    else if (eatright == true) {
                        if (numbersocketdefault == numbersocket + 7) {
                            arrsocket[indexsocket].appendChild(arrhos[indexhos]);
                            checkclickhos = 1;
                            checkfirstgame = 2;
                            eatleft = false;
                            eatright = false;
                            indexeat.remove();
                        }
                    }
                }
            }
        }
    }

    // //player2
    if (checkfirstgame == 2) {
        if (event.target.className == "hos") {
            indexhos = Array.from(arrhos).indexOf(event.target);
            numbersocket = event.target.parentNode.number - 7;
            indexsocket = Array.from(arrsocket).findIndex(e => e.children[0].innerHTML == numbersocket);

            //check eat
            if (indexhos >= 8 && indexhos <= 17) {
                try{
                    if (arrsocket[indexsocket - 2].children.length > 1 && arrsocket[indexsocket - 11].children.length == 1) {
                        if (arrsocket[indexsocket - 2].children[1].id != 2) {
                            if (arrsocket[indexsocket - 11].className == "socket socket1") {
                                eatright = false;
                                eatleft = true;
                                indexeat = arrsocket[indexsocket - 2].children[1];
                            }
                        }
                    }
                    else if (arrsocket[indexsocket].children.length > 1 && arrsocket[indexsocket - 7].children.length == 1) {
                        if (arrsocket[indexsocket].children[1].id != 2) {
                            if (arrsocket[indexsocket - 7].className == "socket socket1") {
                                eatleft = false;
                                eatright = true;
                                indexeat = arrsocket[indexsocket].children[1];
                            }
                        }
                    }
                }
                catch{
                    console.log("err")
                }
            }

            checkclickhos = 2;
        }
        else if (checkclickhos == 2) {
            if (event.target.className == "socket socket1") {
                numbersocketdefault = event.target.number;
                indexsocket = Array.from(arrsocket).indexOf(event.target);
                if (indexhos >= 8 && indexhos <= 17) {
                    if (eatleft == false && eatright == false) {
                        if (numbersocketdefault == numbersocket || numbersocketdefault == numbersocket - 2) {
                            arrsocket[indexsocket].appendChild(arrhos[indexhos]);
                            checkclickhos = 1;
                            checkfirstgame = 1;
                            eatleft = false;
                            eatright = false;
                            
                        }
                    }
                    else if (eatleft == true) {
                        if (numbersocketdefault == numbersocket - 11) {
                            arrsocket[indexsocket].appendChild(arrhos[indexhos]);
                            checkclickhos = 1;
                            checkfirstgame = 1;
                            eatleft = false;
                            eatright = false;
                            indexeat.remove();
                        }
                    }
                    else if (eatright == true) {
                        if (numbersocketdefault == numbersocket - 7) {
                            arrsocket[indexsocket].appendChild(arrhos[indexhos]);
                            checkclickhos = 1;
                            checkfirstgame = 1;
                            eatleft = false;
                            eatright = false;
                            indexeat.remove();
                        }
                    }
                }
            }
        }
    }
});