//! Griglia Dinamica

//! ---------------------- PARTE 1 ---------------------- \\
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

//todo MILESTONE 1
// Prepariamo l'HTML ed il CSS.

//todo MILESTONE 2
// Rimuoviamo le celle che abbiamo inserito nell'HTML in modo da generarle tramite JS. Al click del bottone play, vengono generate 100 celle in 10 righe da 10 celle ciascuna.

//todo #MILESTONE 3
// In ogni cella, deve comparire il numero corrispondente, in ordine da 1 a 100;

//todo #MILESTONE 4
// Al click sulla cella, stampiamo il numero della cella cliccata in console, poi coloriamo la cella d'azzurro!

//todo BONUS
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

//todo Note:
// - questo bonus richiederà un evento diverso dal 'click'
// - questo bonus richiederà una riflessione extra per quel che riguarda il calcolo della larghezza delle celle;)

//! ---------------------- PARTE 2 ---------------------- \\
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: 
// - se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// - in alternativa la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti(ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

//todo #MILESTONE 1
// Prepariamo "qualcosa" per tenere il punteggio dell'utente.
// Quando l'utente clicca su una cella, incrementiamo il punteggio.
// Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.

//todo #MILESTONE 2
// Facciamo in modo di generare 16 numeri casuali(tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
// Generiamoli e stampiamo in console per essere certi che siano corretti

//todo # MILESTONE 3
// Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe.
// Se si, la cella diventa rossa(raccogliamo il punteggio e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.

//todo # MILESTONE 4
// Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina.
// Raccogliamo quindi il messaggio e scriviamo un messaggio appropriato.
// (Ma come stabiliamo quale sia il punteggio massimo ?)

//todo # MILESTONE 5
// Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.

//todo SUPER BONUS
// Quando l'utente clicca una bomba, scopriamo tutte le caselle del tabellone, colorando di rosso tutte le bombe

//todo ------------------------------------------------------------------------------- \\

//*  Recupero gli elementi dal DOM
const rangeSelect = document.getElementById('range-select');
const confirmButton = document.getElementById('confirm-button');
const gridElement = document.querySelector('section .grid');
const gamePoints = document.getElementById('game-points');

//? ---------------------------------------------------------------------------------- \\ 
//? FUNZIONI 
//? ---------------------------------------------------------------------------------- \\ 

// Funzione per creare una cella
const makeCell = (content) => {
    // Creo la cella
    const cell = document.createElement('div');

    // Aggiungo la classe cell
    cell.classList.add('cell');

    // Aggiungo il numero di righe e colonne in base alla selezione dell'utente
    if (rangeSelect.value == 0) {
        return;
    }
    else if (rangeSelect.value == 10) {
        cell.classList.add('big');
    } else if (rangeSelect.value == 9) {
        cell.classList.add('medium');
    } else if (rangeSelect.value == 7) {
        cell.classList.add('small');
    }

    //Aggiungo qualcosa da stampare nella cella
    cell.innerText = content;

    // Stampo la cella in pagina
    gridElement.appendChild(cell);

    // Specifico cosa restituire
    return cell;
}

// Funzione per creare le diverse bombe
const makeBombs = (allBombs, maxCells) => {
    const arrayBombs = [];
    while (arrayBombs.length < allBombs) {
        const randomNumber = Math.floor(Math.random() * maxCells) + 1;
        if (!arrayBombs.includes(randomNumber)) {
            arrayBombs.push(randomNumber)
        }
    }
    return arrayBombs;
}

//? ---------------------------------------------------------------------------------- \\ 
//? VARIABILI
//? ---------------------------------------------------------------------------------- \\ 

// Variabile somma per conteggiare il punteggio
let rows;
let cols;
let totalCells;

// Numero massimo di bombe
let allBombs = 16;

// Punteggio massimo = celle totali - bombe totali
const maxPoints = totalCells - allBombs;

//todo ------------------------------------------------------------------------------- \\
//todo EVENTI DINAMICI
//todo ------------------------------------------------------------------------------- \\

// L'utente clicca sul bottone che genererà una griglia di gioco quadrata.
confirmButton.addEventListener('click', function () {

    //! Blocco il comportamento di default
    rangeSelect.addEventListener('submit', function (e) {
        e.preventDefault();
    })

    //Cambio il testo nel button
    confirmButton.innerHTML = 'Riprova';

    // Ripulisco la pagina per poter stampare
    gridElement.innerHTML = '';

    // Porto a 0 la somma e stampo il risultato
    let pointSum = 0;
    gamePoints.innerText = pointSum;

    // Informazioni note
    rows = rangeSelect.value;
    cols = rangeSelect.value;
    totalCells = rows * cols;

    // Genero una griglia di gioco con 10 righe e 10 colonne
    for (let i = 1; i <= totalCells; i++) {

        // Passo la funzione 'crea cella' in una variabile per utilizzarla nel ciclo
        // inserendo come argomento la i per stampare il numero durante il loop
        const cell = makeCell(i);

        // Al click sulla cella, stampiamo il numero della cella cliccata in console, 
        // poi coloriamo la cella d'azzurro!
        cell.addEventListener('click', function () {

            // Switch colore
            cell.classList.add('clicked');

            if (cell.classList.contains('clicked')) {
                cell.classList.add('disabled');
                cell.disabled = true;
            }

            // Stampo numero in console
            console.log(parseInt(cell.innerText));

            // Controllo se ho cliccato una bomba
            const isExploded = bombs.includes(parseInt(cell.innerText));

            if (isExploded) {
                cell.classList.add('red');
                console.log('Hai perso, il tuo punteggio è:', pointSum);
            }
            else {
                // Conto i punti, li sommo e stampo in pagina il risultato 
                gamePoints.innerText = ++pointSum;
                console.log('Somma: ', pointSum);
            }
        })
    }

    // Creo le bombe
    const bombs = makeBombs(allBombs, totalCells);
    console.log(bombs);

})


