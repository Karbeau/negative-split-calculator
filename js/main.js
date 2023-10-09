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
        min.type = "number"
        min.className = currentKm
        min.className += " timeInput"
        min.className += " minutes"
        min.name = currentKm
        document.getElementById(currentKm).appendChild(min);
        
        // Sec label
        let secLabel = document.createElement("label");
        secLabel.htmlFor = currentKm
        secLabel.className = currentKm
        secLabel.innerHTML = "seconds:"
        document.getElementById(currentKm).appendChild(secLabel);

        // Create input for above label
        let sec = document.createElement("input");
        sec.type = "number"
        sec.className = currentKm
        sec.className += " timeInput"
        sec.className += " seconds"
        sec.name = currentKm
        document.getElementById(currentKm).appendChild(sec);
    }

    let convertToSec = document.createElement("button");
        convertToSec.id = "convert-to-seconds"
        convertToSec.innerHTML = "LETS GO"
        convertToSec.addEventListener("click", onLETSGO)
        document.body.appendChild(convertToSec);

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



