var rowVar
var htmlAddtext
var max = 5
var lastTurn

init();

function init() {
	// body...
	console.log('Hii Welcome to The Game This is Create By Darshan');
	alert('Hii First Choose The Size Of Matrix Like 3x3 , 4x4..Note:- If you Choose 3x3 Then You have to match 3 and if you Type 4 then you have to match 4...');
	const playerMax = prompt("Enter Size Of The Matrix", 3);
	if (parseInt(playerMax) != NaN && parseInt(playerMax) < 6 && parseInt(playerMax)>2)
		max = playerMax
	else
		max = 3
	rowVar = []
	htmlAddtext = ''
	addRowAndColumn(max);
	changeTurn()
}

function addRowAndColumn(count) {
	// body...
	let row = []
	let htmlRow = ''
	for (var i = 0; i < count; i++) {

		let column = []
		htmlRow += '<tr scope="row">'

		for (var j = 0; j < count; j++) {
			column.push(null)
			htmlRow += `<td scope="col" data-player id=${j}of${i}  onclick="assignData(this)"><button class="btn btn-lg btn-secondary opacity-25">0</button></td>`
		}

		htmlRow += '</tr>'

		row.push(column)
	}

	rowVar = row
	htmlAddtext += htmlRow
	addToHtmlRowAndColumn()
}

function addToHtmlRowAndColumn() {
	// body...
	const table = document.getElementById('tableMain');

	htmlAddtext = htmlAddtext.replace("undefined","");

	table.insertAdjacentHTML(
		'beforeend',
		htmlAddtext
	);
}

function assignData(params) {
	// body...
	const el = document.getElementById(`${params.id}`);

	
	if (el.dataset.player.length == 1) {
		alert('This is Filled Try Another Space')
		return
	}

	let addText
	if (lastTurn == 0 ) 	
		addText = `<button class="btn btn-lg btn-warning opacity-25">${lastTurn}</button>`
	else
		addText = `<button class="btn btn-lg btn-primary opacity-25">${lastTurn}</button>`

	el.dataset.player = lastTurn
	el.innerHTML = addText

	const currentId = params.id
	const currentCol = currentId[0]
	const currentRow = currentId[3]
	rowVar[currentRow][currentCol] = lastTurn

	checkNearBy(params)
	const filled = isFilled()

	if (filled == false)
		restart() 
	changeTurn()
}

function checkNearBy(params) {
	// body...
	const currentId = params.id
	const currentCol = currentId[0]
	const currentRow = currentId[3]


	const value = params.dataset.player
	
	const inRow = checkRow(currentRow)
	if (inRow == true) 
		winner()
	else{
		const inCol = checkCol(currentCol)

		if (inCol) 
			winner()
		else {
			const data = {
				'row': currentRow,
				'col': currentCol
			}
			const inDio = checkDio(data)
			if (inDio == true) 
				winner()
		}
	}

	
}

function checkRow(currentRow) {
	// body...
	return sameThree(rowVar[currentRow])
}

function checkCol(colNo){
	//body...
	const temp = []
	for (var i = 0; i < max; i++) {
		temp.push(rowVar[i][colNo])
	}

	return sameThree(temp)
}

function checkDio(argument) {
	// body...
	console.log('Dio')
	if ( ((parseInt(argument.row) + parseInt(argument.col) ) % 2 ) == 0 ) {
		const left = leftDioCheck()
		if (left == true) 
			return true
		else{
			const right = rightDioCheck()

			if (right == true) 
				return true
			else
				return false
		}
	}
	
}

function leftDioCheck(argument) {
	// body...
	const temp = []

	for (var i = 0; i < max; i++) {
		for (var j = 0; j < max; j++) {
			if (i == j) {
				temp.push(rowVar[i][j])
			}
		}
	}

	return sameThree(temp)
}

function rightDioCheck(argument) {
	// body...
	const temp = []

	for (var i = 0; i < max; i++) {
		for (var j = 0; j < max; j++) {
			if ((i+j) == (max-1)) {
				temp.push(rowVar[i][j])
			}
		}
	}

	return sameThree(temp)

}

function sameThree(argument) {
	// body...
	var elementCounts = argument.reduce((count, item) => (count[item] = count[item] + 1 || 1, count), {});
	if (elementCounts[0] == 3 || elementCounts[1] == 3) 
		return true	
	else
		return false
}

function changeTurn() {
	// body...
	if (lastTurn == 0 ) 
		lastTurn = 1
	else
		lastTurn = 0

	document.getElementById('turn').innerHTML = `Player ${lastTurn}'s Turn`
}

function winner(argument) {
	// body...
	alert(`Winner Is Player ${lastTurn}`)
	restart()
}

function restart() {
	// body...
	for (var i = 0; i < max; i++) {

		for(var j = 0; j< max; j++){
			document.getElementById(`${i}of${j}`).remove() 
		}
	}

	init()
}


function isFilled(argument) {
	// body...

	const temp = []

	for (var i = 0; i < max; i++) {
		for (var j = 0; j < max; j++) {
			temp.push(rowVar[i][j])
		}
	}

	return temp.includes(null)
}
