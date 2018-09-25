
var size = 18;
var cols, rows;
var border = '0.1px solid white'; // variavle pour générer les bordures

cols = 900/size; // taille colonne
rows = 900/size; // taille ligne

//création de la div principale (conteneur)
function Div() {
	this.div = document.createElement('div');
	this.div.style.cssText = 'width: 900px; height: 900px; background-color:#070707;padding: 0px; position: relative';
	this.div.setAttribute("id", "app");
	document.body.appendChild(this.div);
	return this.div;
}

//fonciton qui renvoi la cellule correspondante, utilisée pour checker les cellules voisines
function index(c, r) {
	//vérifie que le coisi existe, si on est en bordure un voisin ou plus n'existe pas
	// console.log(c, r);
	if (c < 0 || r < 0 || c > cols || r > rows) {
		return -1; // si le voisin n'existe pas, on renvoi -1 pour pouvoir faire une conditon propre
	}		
	return c + r * cols;	
}

function removeWall(current, next) {
	var x = current.r - next.r;
	var y = current.c - next.c;
	if (x === 1) {
		current.walls[3] = false;
		next.walls[1] = false
	} else if(x === -1) {
		current.walls[1] = false;
		next.walls[3] = false
	}

	if (y === 1) {
		current.walls[0] = false;
		next.walls[2] = false
	} else if(y === -1) {
		current.walls[2] = false;
		next.walls[0] = false
	}


}
// fonction récusrive qui récupère un voisin valide et que passe la cellule courante à la cellule prochaine
function showNext(current) {
	setTimeout(function() {
		var next = current.checkVoisin();
		if (next) {
			next.visited = true;
			removeWall(current, next);
			stack.push(current);
			current.show();
			current = next;
			// next.show();
			showNext(next);
		} else if(stack.length > 0) {

			var cell = stack.pop();
			showNext(cell);
		}
	}, 100)
	
}

window.onload = function() {	
	var div = Div(); // initialisaitond de la div principale

	

	

	// ajout de toutes les cellules de la div dans un tableau avec la position
	for(var r = 0; r < rows; r++) {
		for(var c = 0; c < cols; c++) {
			var cell = new Cell(r,c);
			grid.push(cell);
		}
	}

	current = grid[0]; // cellule actuelle, on commence par la cellule tout en haut tout à gauche
	current.visited = true; // cellule actuelle auto visitée
	//fonction récursive qui va cherche le un voisin dispo au hasard et se déplacer dans le voisin
	
	showNext(current);
	//affichage de toutes les cellules (de la grille)
	for(var i = 0; i < grid.length; i++) {
		grid[i].show();
	}

	
	// console.log(current);

	
}


