var grid = document.getElementById("pixel-canvas");


document.getElementById("gridButton").addEventListener("click", function makeGrid(event) {
    event.preventDefault();
    grid.innerHTML = "";
  // Select size input and set to width and height variables
    var width = document.getElementById("input-width").value;
    var height = document.getElementById("input-height").value;
  //Use height and width inputs to build a new grid
    for (let h = 0; h < height; h++) {
        var rows = document.createElement("tr");
            for (let w = 0; w < width; w++) {
                var cells = document.createElement("td");
                rows.appendChild(cells).addEventListener("click", function() {
                var color = document.getElementById("colorPicker").value;
                this.style.backgroundColor = color;
                });
            }
            grid.appendChild(rows);
    }
});
