console.log('JS OK');

//! Griglia Dinamica
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

//todo ----------------------------------------------------------------------------- \\

//? --------------------- FUNZIONI --------------------- \\
// Funzione per creare una cella
const makeCell = (number) => {
    // Creo la cella
    let cell = document.createElement('div');

    // Aggiungo la classe cell
    cell.className = 'cell';

    // Aggiungo il numero di righe e colonne in base alla selezione dell'utente
    if (rangeSelect.value == 10) {
        cell.classList.add('big');
    } else if (rangeSelect.value == 9) {
        cell.classList.add('medium');
    } else if (rangeSelect.value == 7) {
        cell.classList.add('small');
    }

    //Aggiungo un parametro numero da stampare nella cella
    cell.innerText = number;

    // Specifico cosa restituire
    return cell;
}

//*  Recupero gli elementi dal DOM
const rangeSelect = document.getElementById('range-select');
const confirmButton = document.getElementById('confirm-button');
const gridElement = document.querySelector('section .grid');

//* L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
confirmButton.addEventListener('click', function () {

    //! Blocco il comportamento di default
    rangeSelect.addEventListener('submit', function (e) {
        e.preventDefault();
    })

    // Informazioni note
    let rows = rangeSelect.value;
    let cols = rangeSelect.value;
    const totalCells = rows * cols;

    // Ripulisco la pagina per poter stampare
    gridElement.innerHTML = '';

    //! Validazione
    if (rangeSelect.value == 0) {
        rangeSelect.classList.add('is-invalid');
        return;
    } else {
        rangeSelect.classList.remove('is-invalid');
        rangeSelect.classList.add('is-valid');

        //* Genero una griglia di gioco con 10 righe e 10 colonne
        for (let i = 1; i <= totalCells; i++) {

            // Passo la funzione 'crea cella' in una variabile per utilizzarla nel ciclo
            // inserendo come argomento la i per stampare il numero durante il loop
            const cell = makeCell(i);

            // Stampo la cella in pagina
            gridElement.appendChild(cell);

            // Al click sulla cella, stampiamo il numero della cella cliccata in console, 
            // poi coloriamo la cella d'azzurro!
            cell.addEventListener('click', function () {

                // Stampo numero in console
                console.log(i);

                // Switch colore
                cell.classList.add('clicked');

            })
        }
    }
})


