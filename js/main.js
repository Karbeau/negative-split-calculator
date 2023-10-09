document.addEventListener("keyup", function(event) {
    if (event.key === "Enter" && document.getElementById('raceDistance').value !== "") {
        document.getElementById("btn").click()
    }
})

function createAllInputs () {
    let raceDistance = document.getElementById('raceDistance').value
    let wholeRD = parseFloat(raceDistance)

    // Check if distance is a number
    if (isNaN(wholeRD)){
        alert("Must input numbers");
        return false
    }

    // Full distance
    let numOfKms = document.createElement("h2")
    numOfKms.innerHTML = document.getElementById('raceDistance').value
    document.getElementById('pace-per-km').appendChild(numOfKms);

    // Half distance
    let newh2 = document.createElement("h2")
    newh2.innerHTML = wholeRD/2
    document.getElementById('pace-per-km').appendChild(newh2);


    // Make 1 additional input for floats
    if (wholeRD % 1 != 0){
        wholeRD = parseInt(wholeRD) + 1
    }

    let container = document.createElement("ul");
    container.id = "masterList"
    document.getElementById("pace-per-km").appendChild(container);


    // Create an input
    for (i = 1; i <= wholeRD; i++){
        let currentKm = "km" + i

        let container = document.createElement("ul");
        container.id = currentKm
        container.style.display = "flex"
        document.getElementById("masterList").appendChild(container);

        // Km label
        let label = document.createElement("li");
        label.className = currentKm
        label.className += " kmLabel"
        label.innerHTML = i
        document.getElementById(currentKm).appendChild(label);

        // Min label
        let minLabel = document.createElement("label");
        minLabel.htmlFor = currentKm
        minLabel.className = currentKm
        minLabel.innerHTML = "minutes:"
        document.getElementById(currentKm).appendChild(minLabel);
  
        // Create input for above label
        let min = document.createElement("input");
        min.type = "text"
        min.className = currentKm
        min.className += " timeInput"
        min.name = currentKm
        document.getElementById(currentKm).appendChild(min);
        
        // Sec label
        let secLabel = document.createElement("label");
        secLabel.type = "text"
        secLabel.className = currentKm
        secLabel.innerHTML = "seconds:"
        document.getElementById(currentKm).appendChild(secLabel);

        // Create input for above label
        let sec = document.createElement("input");
        sec.type = "text"
        sec.className = currentKm
        sec.className += " timeInput"
        sec.name = currentKm
        document.getElementById(currentKm).appendChild(sec);
    }

}


// minutes to seconds per km
// divide total distance in half



