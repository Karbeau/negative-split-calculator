document.addEventListener("keyup", function(event) {
    if (event.key === "Enter" && document.getElementById('raceDistance').value !== "") {
        document.getElementById("btn").click()
    }
})


function createAllInputs () {
    let raceDistance = document.getElementById('raceDistance').value
    let numRaceDistance = parseFloat(raceDistance)

    // Check if distance is a number
    if (isNaN(numRaceDistance)){
        alert("Must input numbers");
        return false
    }

    // Full distance
    let numOfKms = document.createElement("h2")
    numOfKms.innerHTML = document.getElementById('raceDistance').value
    document.getElementById('pace-per-km').appendChild(numOfKms);

    // Half distance
    let newh2 = document.createElement("h2")
    newh2.innerHTML = numRaceDistance/2
    document.getElementById('pace-per-km').appendChild(newh2);


    // Make 1 additional input for floats
    if (numRaceDistance % 1 != 0){
        numRaceDistance = parseInt(numRaceDistance) + 1
    }

    let container = document.createElement("ul");
    container.id = "masterList"
    document.getElementById("pace-per-km").appendChild(container);

    // Create an input
    for (i = 1; i <= numRaceDistance; i++){
        let currentKm = "km" + i

        let container = document.createElement("ul");
        container.id = currentKm
        container.style.display = "flex"
        document.getElementById("masterList").appendChild(container);

        // Km label
        let kmLabel = document.createElement("li");
        kmLabel.className = currentKm
        kmLabel.className += " kmLabel"
        kmLabel.innerHTML = i
        document.getElementById(currentKm).appendChild(kmLabel);

        // Min kmLabel
        let minLabel = document.createElement("label");
        minLabel.htmlFor = currentKm
        minLabel.className = currentKm
        minLabel.innerHTML = "minutes:"
        document.getElementById(currentKm).appendChild(minLabel);
  
        // Create input for above label
        let minInput = document.createElement("input");
        minInput.type = "number"
        minInput.min = 0
        minInput.className = currentKm
        minInput.className += " timeInput"
        minInput.className += " minutes"
        minInput.name = currentKm
        document.getElementById(currentKm).appendChild(minInput);
        
        // Sec label
        let secLabel = document.createElement("label");
        secLabel.htmlFor = currentKm
        secLabel.className = currentKm
        secLabel.innerHTML = "seconds:"
        document.getElementById(currentKm).appendChild(secLabel);

        // Create input for above label
        let secInput = document.createElement("input");
        secInput.type = "number"
        secInput.min = 0
        secInput.className = currentKm
        secInput.className += " timeInput"
        secInput.className += " seconds"
        secInput.name = currentKm
        document.getElementById(currentKm).appendChild(secInput);
    }

    let convertToSecButton = document.createElement("button");
        convertToSecButton.id = "convert-to-seconds"
        convertToSecButton.innerHTML = "LETS GO"
        convertToSecButton.addEventListener("click", onLETSGO)
        document.body.appendChild(convertToSecButton);

}

function onLETSGO () {
    let arrayOfTimes = []
    const minCollection = document.getElementsByClassName("minutes")
    const secCollection = document.getElementsByClassName("seconds")

    for (let i = 0; i < minCollection.length; i++) {
        let minNum = parseFloat(minCollection[i].value)
        let secNum = parseFloat(secCollection[i].value)

        if (isNaN(minNum)){
            minNum = 0;
        }

        if (isNaN(secNum)){
            secNum = 0;
        }

        arrayOfTimes.push((minNum * 60) + secNum)
        console.log(typeof minNum)
        console.log(typeof secNum)
    }
    console.log(arrayOfTimes)
}

// minutes to seconds per km



