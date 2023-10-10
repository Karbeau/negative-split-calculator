// Event listener for main submit button enter key
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
    numOfKms.id = "race-distance"
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
        if(i > raceDistance){ // If distance isn't a whole num, label with decimal (21.1 -> 0.1)
            let diff = i - raceDistance
            kmLabel.innerHTML = (1 - diff).toFixed(2)
        } else {kmLabel.innerHTML = currentKm}

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

// Triggere after inputting km times
function onLETSGO () {
    let arrayOfTimes = []
    // Store inputted minute and seconds in arrays
    const minCollection = document.getElementsByClassName("minutes")
    const secCollection = document.getElementsByClassName("seconds")

    for (let i = 0; i < minCollection.length; i++) {
        let minNum = parseFloat(minCollection[i].value)
        let secNum = parseFloat(secCollection[i].value)

        // If inputs are empty, default to 0
        if (isNaN(minNum)){
            minNum = 0;
        }

        if (isNaN(secNum)){
            secNum = 0;
        }

        // store added min+sec into array of times
        arrayOfTimes.push((minNum * 60) + secNum)
    }

    // Check if distance is a whole number 
    let raceDistance = document.getElementById("race-distance").innerHTML
    let lastDecimalAmmount = 0
    if (raceDistance % 1 !== 0){
        // Delete last item from times array
        lastDecimalAmmount += arrayOfTimes.pop() // Store time of final decimal distance
    }

    console.log('last Decimal Ammount: ' + lastDecimalAmmount)
    console.log('arrayOfTimes: ' + arrayOfTimes)

    let middle = arrayOfTimes.length / 2

    console.log('arrayOfTimes.length / 2: ' + arrayOfTimes.length / 2)
    console.log('middle: ' + middle)

    let firstHalf = arrayOfTimes.slice(0, Math.floor(arrayOfTimes.length / 2)) // Array of minutes of first half
    let secondHalf = arrayOfTimes.slice(Math.ceil(arrayOfTimes.length / 2)) // Array of minutes of second half
    
    // Odd number of indexes divide middle time in half
    let oddMiddleStorageBox = [] // Store odd time
    if (arrayOfTimes.length %2 !== 0 && raceDistance % 1 === 0){
        oddMiddleStorageBox = arrayOfTimes[Math.floor((arrayOfTimes.length) / 2)]
        firstHalf.push(oddMiddleStorageBox / 2) // Add half of middle distance in first
        secondHalf.push(oddMiddleStorageBox / 2) // and second half of distance
    }

    console.log('oddMiddleStorageBox: ' + oddMiddleStorageBox)
    console.log('firstHalf: ' + firstHalf)
    console.log('secondHalf: ' + secondHalf)
    
    // Sum first half values
    let fSum = 0;
    firstHalf.forEach( num => {
        fSum += num;
        fSum += (lastDecimalAmmount / 2) // add half of any decimal ammount
    })
    console.log(oddMiddleStorageBox / 2 )
    console.log('sum first half: ' + fSum)

    // Sum second half values
    // If odd, this excludes the middle value
    let sSum = 0;
    secondHalf.forEach( num => {
        sSum += num;
        sSum += (lastDecimalAmmount / 2) // add half of any decimal ammount 
    })
    console.log('sum second half: ' + sSum)


    // Convert seconds to hr/min/sec
    function secTommss2(sec){
        return new Date(sec*1000).toUTCString().split(" ")[4]
    }

    let firstHalfMinToHrs = secTommss2(fSum)
    let secondHalfMinToHrs = secTommss2(sSum)
    
    console.log(firstHalfMinToHrs)
    console.log(secondHalfMinToHrs)
    let totalTimeSum = sSum + fSum
    console.log('total time: ' + totalTimeSum)
    console.log('total time: ' + secTommss2(totalTimeSum))

    let determineSplit = sSum - fSum

    if (determineSplit < 0) {
        determineSplit = Math.abs(determineSplit)
        console.log("\-" + secTommss2(determineSplit))
    } else {
        console.log(secTommss2(determineSplit))
    }

    return secTommss2(determineSplit)
}


// <tr id="distance-tr-head">
// <th>Distance</th>
// <th>Lap Length</th>
// <th>Pace</th>
// <th>Time Elapsed</th>
// <th>Difference Last Km</th>
// </tr>

// <tr>
// <th>Hippopotamus</th>
// </tr>

function generateTableData() {

    let firstHalf = [] // Array of minutes of first half
    let oddMiddleStorageBox = [] // Store odd nums middle index here
    let secondHalf = [] // // Array of minutes of second half
    
    firstHalf = arrayOfTimes.slice(0, Math.floor(arrayOfTimes.length / 2))

    console.log(firstHalf)



    for (i = 0; i < totalDistance; i++){
        document.createElement("th")
        // convertToSecButton.innerHTML = [i]
        // convertToSecButton.addEventListener("click", onLETSGO)
        // document.body.appendChild(convertToSecButton);
    }
}
  

// if diatance is odd or not whole
// divide the middle km by 2
// 7 km, divide km 4 by 2
// arrau will be 8 long
// 21.1 array will be 22 long



