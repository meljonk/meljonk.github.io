const grid = document.getElementById("pixel-canvas");


document.getElementById("gridButton").addEventListener("click", function makeGrid(event) {
    event.preventDefault();
    grid.innerHTML = "";
  // Select size input and set width and height variables
    const width = document.getElementById("input-width").value;
    const height = document.getElementById("input-height").value;
  //Use height and width inputs to build a new grid
    for (let h = 0; h < height; h++) {
        const rows = document.createElement("tr");
            let w = 0;
            while (w < width) {
                const cells = document.createElement("td");
                //add event listener on dynamically created cells to select and assign colors
                rows.appendChild(cells).addEventListener("click", function() {
                const color = document.getElementById("colorPicker").value;
                this.style.backgroundColor = color;
                });
                w++;
            }
            grid.appendChild(rows);
    }
});
