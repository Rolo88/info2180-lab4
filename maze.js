
window.onload = function(){
	
var classname = document.querySelectorAll(".boundary");


for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('mouseover', youLose);
}

document.getElementById('end').addEventListener('mouseover', youWin);
document.getElementById('start').addEventListener('click', restart);
document.getElementById('maze').addEventListener('mouseout', antiCheat);


};



function youLose(){
	var classname = document.querySelectorAll(".boundary");
	
	for (var i = 0; i < classname.length; i++) {
    classname[i].classList.add("youlose");
	document.getElementById('status').innerHTML = "you Lose!";
	}
}



function youWin(){
	var q =document.getElementsByClassName('youlose');
	
	if(q.length == 0)
		document.getElementById('status').innerHTML = "you Win!";
}


function restart(){
	var boundaries = document.querySelectorAll(".boundary");
	
	for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].classList.remove("youlose");
	}
	
	document.getElementById('status').innerHTML = "Good Luck!";
}


function antiCheat(){
	youLose()
}

