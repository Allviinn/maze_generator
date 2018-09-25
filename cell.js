var grid = [];
var current; // cellule actuelle

var stack = [];

//fonction / objet qui représente une cellule
function Cell(r, c) {
	this.walls = [true, true, true, true]; // tableua qui défini si les "murs" de la cellules sont affichés ou pas
	
	this.c = c; // position de la cellule dans la colonne
	this.r = r; // position de la cellule dans la ligne

	this.visited = false; // vérifie si la cellule actuelle a dèjà été visitée 

	this.checkVoisin = function() {
		var voisins = [];
		var top    = grid[index(this.c, this.r -1 )]; // on récupère la cellules voisine haut
		var right  = grid[index(this.c + 1, this.r )]; // on récupère la cellules voisine droite
		var bottom = grid[index(this.c, this.r + 1 )]; // on récupère la cellules voisine bas
		var left   = grid[index(this.c -1, this.r )]; // on récupère la cellules voisine gaucge

	
		// si la cellule voisine haut existe et qu'elle n'a pas été visitée on l'insère dans le tableau des voisins
		if (top && !top.visited) {
			voisins.push(top);
		}
		// si la cellule voisine droite existe et qu'elle n'a pas été visitée on l'insère dans le tableau des voisins
		if (right && !right.visited) {
			voisins.push(right);
		}
		// si la cellule voisine bas existe et qu'elle n'a pas été visitée on l'insère dans le tableau des voisins
		if (bottom && !bottom.visited) {
			voisins.push(bottom);
		}
		// si la cellule voisine gauche existe et qu'elle n'a pas été visitée on l'insère dans le tableau des voisins
		if (left && !left.visited) {
			voisins.push(left);
		}

		//si on a des voisins valide
		if (voisins.length > 0) {
			var random = Math.floor(Math.random() * voisins.length);
			return voisins[random];
		} else {
			return undefined;
		}
	}

	this.survol = function() {
		var x = this.r*size;
		var y = this.c*size;
		 noStroke();
		    fill(0, 0, 255, 100);
		    rect(x, y, size, size);
	}

	// fonction qui crée la cellule (création d'une div avec les bonnes tailles et les marges supérieur et gauche pour la positionner)
	this.show = function() {
		
		var x = this.r*size;
		var y = this.c*size;
		this.child_div = document.createElement('div');
		this.child_div.style.cssText = 'position: absolute;margin-left:'+x+'px;margin-top:'+y+'px; width:'+size+'px; height:'+size+'px';
		if (this.walls[0]) {
			this.child_div.style.borderTop = border;
		}
		if (this.walls[1]) {
			this.child_div.style.borderRight = border;
		}
		if (this.walls[2]) {
			this.child_div.style.borderBottom = border;
		}
		if (this.walls[3]) {
			this.child_div.style.borderLeft = border;
		}			
		this.child_div.style.backgroundColor = '#aaa';
		if (this.visited) {
			this.child_div.style.backgroundColor = '#4c0063'; // si la cellule actuelle a déjà été visité ou lui met une couleur différente
		}
		div.appendChild(this.child_div);
	}
}