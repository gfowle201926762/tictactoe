

const cellelements = document.querySelectorAll('[data-cell]')

const x_class = 'x'
const o_class = 'o'
const won_class = 'won'
const playing_class = 'playing'

const board = document.getElementById('board')
const restart_button = document.getElementById('restart')
const winning_text = document.getElementById('winning_text')
const x_info = document.getElementById('x_info')
const o_info = document.getElementById('o_info')
const draw_info = document.getElementById('draw_info')

const winning_combinations = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
]

var x_wins = 0
var o_wins = 0
var draws = 0

cellelements.forEach(cell => {
    cell.classList.add(won_class)
})
restart_button.innerHTML = "Play!"

restart_button.addEventListener('click', startgame)

var x_turn
function startgame(){
    x_turn = true

    board.classList.remove(o_class)
    board.classList.add(x_class)
    
    restart_button.classList.add(playing_class)
    restart_button.innerHTML = "Restart"

    winning_text.innerHTML = null

    cellelements.forEach(cell => {
        cell.classList.remove(won_class)
        cell.classList.remove(x_class)
        cell.classList.remove(o_class)
        cell.addEventListener('click', handleClick, {once: true})
    })
}






function handleClick(name_doesnt_matter){
    //draw mark
    const cell = name_doesnt_matter.target
    const current_class = x_turn ? x_class : o_class
    placemark(cell, current_class)

    //check win
    var please = checkwin(current_class)
    if (please == true){
        console.log("displaying win")
        displayend()
        endgame('win', x_turn)
    }

    //check draw
    var draw = checkdraw()
    if (draw == true){
        console.log("displaying draw")
        displayend()
        endgame('draw', x_turn)
    }
    
    //switch turns
    if(x_turn == true){
        x_turn = false
    }
    else if(x_turn == false){
        x_turn = true
    }
    changeturn(x_turn, board)

}


function endgame(type, player){
    if (type == 'draw'){
        winning_text.innerHTML = 'Draw!'
        draws ++
    }
    else if (type == 'win'){
        if (player == true){
            winning_text.innerHTML = 'X wins!'
            x_wins ++
        }
        else if (player == false){
            winning_text.innerHTML = 'O wins!'
            o_wins ++
        }
    }
    x_info.innerHTML = `X wins: ${x_wins}`
    o_info.innerHTML = `O wins: ${o_wins}`
    draw_info.innerHTML = `draws: ${draws}`
}


function placemark(cell, current_class){
    cell.classList.add(current_class)
}

function changeturn(x_turn, board){
    if (x_turn == true){
        board.classList.remove(o_class)
        board.classList.add(x_class)
    }
    else if (x_turn == false){
        board.classList.remove(x_class)
        board.classList.add(o_class)
    }
}

function checkwin(current_class){
    var victory
    var current_elements = []
    var x = 0
    cellelements.forEach(cell => {
        if (cell.classList.contains(current_class)){
            current_elements.push(x)
        }
        x ++
    })

    winning_combinations.forEach(combination => {
        if (current_elements.includes(combination[0]) && current_elements.includes(combination[1]) && current_elements.includes(combination[2])) {
            console.log("THEY WON!")
            victory = true
        }
    })
    return victory
}

function checkdraw(){
    var current_elements = []
    cellelements.forEach(cell => {
        if (cell.classList.contains(x_class) || cell.classList.contains(o_class)){
            current_elements.push(cell)
        }
    })
    var draw
    if (current_elements.length == 9){
        draw = true
    }
    return draw
}

function displayend(){
    board.classList.remove(o_class)
    board.classList.remove(x_class)
    restart_button.classList.remove(playing_class)
    restart_button.innerHTML = "Play again!"
    cellelements.forEach(cell => {
        cell.classList.add(won_class)
        cell.removeEventListener('click', handleClick)
    })
}

