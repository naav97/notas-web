function edit(idC) {
	console.log(idC);
	var f = document.getElementById(idC);
	if(f.style.display === "none") {
		f.style.display = "block";
	}
	else {
		f.style.display = "none";
	}
}
