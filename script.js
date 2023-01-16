var rowVar
var htmlAddtext
var max
var lastTurn
var lastPlayerPlaced

init();

function init() {
	// body...
	console.log('Hii Welcome to The Game This is Created By Darshan');
	// alert('Hii First Choose The Size Of Matrix Like 3x3 , 4x4..Note:- If you Choose 3x3 Then You have to match 3 and if you Type 4 then you have to match 4...');
	// const playerMax = prompt("Enter Size Of The Matrix", 3);
	// if (parseInt(playerMax) != NaN && parseInt(playerMax) < 6 && parseInt(playerMax)>2)
	// 	max = playerMax
	// else
	// 	max = 3
	max = 3
	rowVar = []
	htmlAddtext = ''
	lastTurn = 0
	addRowAndColumn(max);
}


//Aahiya ek Matrix banse 
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

//Aaahiya banelo matrix ne Html ma nakhva mate
function addToHtmlRowAndColumn() {
	// body...
	const table = document.getElementById('tableMain');

	htmlAddtext = htmlAddtext.replace("undefined","");

	table.insertAdjacentHTML(
		'beforeend',
		htmlAddtext
		);
}

//Aahiya Matrix ma value nakhva mate 
function assignData(params) {
	// body...
	if (params.id){

		const el = document.getElementById(`${params.id}`);

	
	if (el.dataset.player.length == 1) {
		alert('This is Filled Try Another Space')
		return
	}

	const currentId = params.id
	const currentCol = currentId[0]
	const currentRow = currentId[3]
	rowVar[currentRow][currentCol] = lastTurn

	let addText
	if (lastTurn == 0 ) {
		addText = `<button class="btn btn-lg btn-warning opacity-25">${lastTurn}</button>`
		lastPlayerPlaced = currentId
	}	
	else
		addText = `<button class="btn btn-lg btn-primary opacity-25">${lastTurn}</button>`

	el.dataset.player = lastTurn
	el.innerHTML = addText

	

	checkNearBy(el)
	changeTurn()
	const filled = isFilled()

	if (filled == false)
		restart() 
	
	}
	else
		restart()

	

}

//Aahiya najik na check thai ane jo condtion sachi pade to winner...
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

//Roe check krva mate
function checkRow(currentRow,maxVal = max) {
	// body...
	return sameThree(rowVar[currentRow],maxVal)
}

//Col check karva mate
function checkCol(colNo,maxVal = max){
	//body...
	const temp = []
	for (var i = 0; i < max; i++) {
		temp.push(rowVar[i][colNo])
	}

	return sameThree(temp,maxVal)
}


function checkDio(argument,maxVal = max) {
	// body...
	// console.log('Dio')
	if ( ((parseInt(argument.row) + parseInt(argument.col) ) % 2 ) == 0 ) {
		const left = leftDioCheck(maxVal)
		if (left == true) 
			return true
		else{
			const right = rightDioCheck(maxVal)

			if (right == true) 
				return true
			else
				return false
		}
	}
	
}

function leftDioCheck(maxVal) {
	// body...
	const temp = []

	for (var i = 0; i < max; i++) {
		for (var j = 0; j < max; j++) {
			if (i == j) {
				temp.push(rowVar[i][j])
			}
		}
	}

	return sameThree(temp,maxVal)
}

function rightDioCheck(maxVal) {
	// body...
	const temp = []

	for (var i = 0; i < max; i++) {
		for (var j = 0; j < max; j++) {
			if ((i+j) == (max-1)) {
				temp.push(rowVar[i][j])
			}
		}
	}

	return sameThree(temp,maxVal)
}

function sameThree(argument,maxCount) {
	// body...
	var elementCounts = argument.reduce((count, item) => (count[item] = count[item] + 1 || 1, count), {});
	if (elementCounts[0] == maxCount || elementCounts[1] == maxCount) 
		return true	
	else
		return false
}

function changeTurn() {
	// body...
	// console.log(lastTurn)
	if (lastTurn == 0 ){
		lastTurn = 1
		var x = document.getElementById("flexCheckDefault").checked;
		if (x == true) {
			autoPlaced()
		}
	} 	
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

function autoPlaced() {
	// body...
	const emptyPlaces = []
	const playerPlaces = []
	const possiblePlaces = []
	const lastPlayerCol = parseInt(lastPlayerPlaced[0])
	const lastPlayerRow = parseInt(lastPlayerPlaced[3])

	//This is For Check Empty Places And Player Places
	for (var i = 0; i < max; i++) {
		for (var j = 0; j < max; j++) {
			if (rowVar[j][i] == null) 
				emptyPlaces.push( {
					id : i + 'of' + j
				})

			if (rowVar[j][i] == 0)
				playerPlaces.push({
					id : i + 'of' + j
				})

		}
	}


	//Aa ena mate ke Jya Player e chhelle muiku hoi ane eni aaju baju khali jagya hoi e...
	for (var i =(lastPlayerRow-1); i <= (lastPlayerRow+1) ; i++) {
		for(var j = (lastPlayerCol-1); j<= (lastPlayerCol+1); j++){
			if (j >= 0 && j < max && i >= 0 && i < max) {
				possiblePlaces.push({
					id : j + 'of' + i
				})
			}
		}
	}

	const coputerWinCondtions = []

	//This is Wiinig Coputer In Row(Etle ke jo ek row ma 2 '1' hoi ane computer jittu hoi to ena mate)
	rowVar.forEach((e,index)=>{
		if (sameThreeForComputer(e,max-1) ) {
			e.forEach((element,i)=>{
				if (element == null && (emptyPlaces.includes({id : i + 'of' + index})!= true)) {
					coputerWinCondtions.push({id:i + 'of' + index})
				}
			})
		}
	})

	//This is Wiinig Coputer In Col(Etle ke jo ek Col ma 2 '1' hoi ane computer jittu hoi to ena mate)
	const colVar = []

	for (var i = 0; i < max; i++) {
		const temp = []
		for (var j = 0; j < max; j++) {
			temp.push(rowVar[j][i])
		}
		colVar.push(temp)
	}

	colVar.forEach((e,index)=>{
		if (sameThreeForComputer(e,max-1) ) {
			e.forEach((element,i)=>{
				if (element == null && (emptyPlaces.includes({id : index + 'of' + i})!= true)) {
					coputerWinCondtions.push({id:index + 'of' + i})
				}
			})
		}
	})


	if (coputerWinCondtions.length > 0) {
		assignData(coputerWinCondtions[Math.floor(Math.random() * coputerWinCondtions.length)])
	}
	else{
		let result = []; 

		emptyPlaces.forEach((value)=>{
			possiblePlaces.forEach((val)=>{
				if ((value.id == val.id) && (result.includes(value.id) != true)) {
					data = {
						id: value.id,
						inRow: null,
						inCol: null,
						inDio: null
					}
					result.push(data)
				}
			})
		});

		result.forEach((e)=>{
			e.inRow = checkRow(e.id[3],max-1)
			e.inCol = checkCol(e.id[0],max-1)
			e.inDio = checkDio({row: e.id[3],col: e.id[0]},max-1)
		})

		const final = []

		result.forEach((e)=>{
			if ( ( e.inRow == true || e.inCol == true || e.inDio == true) && (final.includes(e.id) != true) ) {
				final.push({id:e.id})
			}
		})

		if (final.length > 0)
			assignData(final[Math.floor(Math.random() * final.length)])
		else
			assignData(emptyPlaces[Math.floor(Math.random() * emptyPlaces.length)])
	}

	
}	

function playByComputer(argument) {
	// body...
	var x = document.getElementById("flexCheckDefault").checked;
	if (x == true && lastTurn == 1) {
		autoPlaced()
	}
}


function sameThreeForComputer(argument,maxCount) {
	// body...
	var elementCounts = argument.reduce((count, item) => (count[item] = count[item] + 1 || 1, count), {});
	if (elementCounts[1] == maxCount)
		return true
	else
		return false
}
