// Event listener for main submit button enter key
document.addEventListener("keyup", function(event) {
    if (event.key === "Enter" && document.getElementById('raceDistance').value !== "") {
        document.getElementById("btn").click()
    }
})

// Access and check race distance input
function getRaceDistance(){
    let raceDistance = document.getElementById('raceDistance').value
    let numRaceDistance = parseFloat(raceDistance)
    
    // Check if distance is a number
    if (isNaN(numRaceDistance)){
        alert("Must input numbers");
        return false
    }

    // Check if distance is a whole number
    if (numRaceDistance % 1 != 0){
        numRaceDistance = parseInt(numRaceDistance) + 1
    }

    return numRaceDistance
}

// Convert seconds to hr/min/sec
function secTommss2(sec){
    return new Date(sec*1000).toUTCString().split(" ")[4]
}

// Populate correct num of inputs
function createAllInputs () {
    let numRaceDistance = getRaceDistance()
    let raceDistance = document.getElementById('raceDistance').value

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

//////////////////// Create array with times as seconds ////////////////////
function createArrayOfTimes () {
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
    return arrayOfTimes
}


//////////////////// Populate table with values ////////////////////
function populateTable () {
    let raceDistance = document.getElementById('raceDistance').value // Maintains decimal point
    let numRaceDistance = getRaceDistance() // Creates whole num from race distance

    for (i = 1; i <= numRaceDistance; i++){
        let currentKm = "km" + i

        //////////////////// First Column Km's
        let newRow = document.createElement("tr");
        newRow.id = currentKm + "-row"

        let kmTableH = document.createElement("th")
        kmTableH.id = "km" + i
        if (i > raceDistance){ // If distance isn't a whole num, label with decimal (21.1 -> 0.1)
            let diff = i - raceDistance
            kmTableH.innerHTML = "KM " + (1 - diff).toFixed(2)
        } else {kmTableH.innerHTML = "KM " + i}

        document.getElementById("splits-table-body").appendChild(newRow);
        document.getElementById("km" + i + "-row").appendChild(kmTableH);

        //////////////////// Second column Lap Length
        let lapLength = document.createElement("td")
        lapLength.id = "lapLength"+i
        if (i > raceDistance){ // If distance isn't a whole num, label with decimal (21.1 -> 0.1)
            let diff = i - raceDistance
            lapLength.innerHTML = ((1 - diff)*1000).toFixed(0) + "m"
        } else {lapLength.innerHTML = 1000 + "m"}
        document.getElementById("km" + i + "-row").appendChild(lapLength);

        //////////////////// Third column Pace/Km
                // Print input values in time format
        let pacePerKm = document.createElement("td")
        let minCollection = document.getElementsByClassName("minutes")
        let secCollection = document.getElementsByClassName("seconds")

        let minNum = parseFloat(minCollection[i-1].value)
        let secNum = parseFloat(secCollection[i-1].value)

        // If inputs are empty, default to 0
        if (isNaN(minNum)){
            minNum = 0;
        }
        if (isNaN(secNum)){
            secNum = 0;
        }
        pacePerKm.innerHTML = minNum + ":" + secNum
        console.log(pacePerKm.innerHTML)
        document.getElementById("km" + i + "-row").appendChild(pacePerKm);

        //////////////////// Fourth column elapsed time
        // Converts input minutes to time format
        // Adds each previous value
        let times = createArrayOfTimes()
        let timeElaspsed = document.createElement("td")

        // Loop through times array to sum only the current+previous values
        let sum = 0
        for(j = 0; j <= (i-1); j++){
            sum += times[j]
        }        

        timeElaspsed.innerHTML = secTommss2(sum) // Convert seconds to mm:ss
        document.getElementById("km" + i + "-row").appendChild(timeElaspsed)

        //////////////////// Fourth column difference in last KM
        let diffLastKm = document.createElement("td")
        let currentTimeVal = times[i-1]

        // First km is always 0
        let diffTimesSeconds = 0
        if (i >= 2){ // Make sure its on the second index
            diffTimesSeconds = currentTimeVal -= times[i-2]
        }

        // Convert to mm:ss format and add a plus or minus
        if (diffTimesSeconds < 0){
            diffTimesSeconds = Math.abs(diffTimesSeconds)
            diffTimesSeconds = "\-" + secTommss2(diffTimesSeconds)
        } else {
            diffTimesSeconds = "\+" + secTommss2(diffTimesSeconds)
        }

        diffLastKm.innerHTML = diffTimesSeconds
        document.getElementById("km" + i + "-row").appendChild(diffLastKm)
    }

}

//////////////////// Trigger after inputting km times ////////////////////
function onLETSGO () {
    document.getElementById("splits-table").style.display = "block"
    let arrayOfTimes = createArrayOfTimes()

    // Check if distance is a whole number 
    let raceDistance = document.getElementById("race-distance").innerHTML
    let lastDecimalAmmount = []
    if (raceDistance % 1 !== 0){
        // Delete last item from times array
        lastDecimalAmmount += arrayOfTimes.pop() // Store time of final decimal distance
    }
    console.log(arrayOfTimes)
    console.log("decimal storage: " + lastDecimalAmmount)

    let firstHalf = arrayOfTimes.slice(0, Math.floor(arrayOfTimes.length / 2)) // Array of minutes of first half
    let secondHalf = arrayOfTimes.slice(Math.ceil(arrayOfTimes.length / 2)) // Array of minutes of second half
    
    // Odd number of indexes divide middle time in half
    let oddMiddleStorageBox = [] // Store odd time
    if (arrayOfTimes.length %2 !== 0 ){
        oddMiddleStorageBox = arrayOfTimes[Math.floor((arrayOfTimes.length) / 2)]
        firstHalf.push(oddMiddleStorageBox / 2) // Add half of middle distance in first
        secondHalf.push(oddMiddleStorageBox / 2) // and second half of distance
    }

    console.log(arrayOfTimes)
    console.log('oddMiddleStorageBox: ' + oddMiddleStorageBox)
    console.log('firstHalf: ' + firstHalf)
    console.log('secondHalf: ' + secondHalf)
    
    // Sum first half values
    let fSum = 0;
    firstHalf.forEach( num => {
        fSum += num;
    })
    fSum += (lastDecimalAmmount / 2) // add half of any decimal ammount

    // Sum second half values
    // If odd, this excludes the middle value
    let sSum = 0;
    secondHalf.forEach( num => {
        sSum += num;
    })
    console.log("ssum before" + fSum)
    sSum += (lastDecimalAmmount / 2) // add half of any decimal ammount 
    console.log("fsum" + fSum)
    console.log("ssum" + sSum)

    let firstHalfMinToHrs = secTommss2(fSum)
    let secondHalfMinToHrs = secTommss2(sSum)
    
    console.log(firstHalfMinToHrs)
    console.log(secondHalfMinToHrs)
    let totalTimeSum = sSum + fSum

    console.log('total time: ' + totalTimeSum)
    console.log('total time: ' + secTommss2(totalTimeSum))

    let determineSplit = sSum - fSum
    console.log("determine split" + determineSplit)

    let split;
    if (determineSplit < 0) {
        determineSplit = Math.abs(determineSplit)
        determineSplit = "\-" + secTommss2(determineSplit)
    } else {
        determineSplit = secTommss2(determineSplit)
    }


    //////////////////// Create Table of splits at end of kms table
    let splitsRow = document.createElement("tr");
    splitsRow.id = "split-row"
    document.getElementById("neg-split-table").appendChild(splitsRow);

    let splitsTableTitle = document.createElement("th")
    splitsTableTitle.id = "split"
    splitsTableTitle.innerHTML = "Total Time"
    document.getElementById("split-row").appendChild(splitsTableTitle);

    let splitsTableFH = document.createElement("th")
    splitsTableFH.innerHTML = "Total Time First Half"
    document.getElementById("split-row").appendChild(splitsTableFH);

    let splitsTableSH = document.createElement("th")
    splitsTableSH.innerHTML = "Total Time Second Half"
    document.getElementById("split-row").appendChild(splitsTableSH);

    let splitsDataRow = document.createElement("tr");
    splitsDataRow.id = "split-data"
    document.getElementById("neg-split-table").appendChild(splitsDataRow);

    let overallTableTitle = document.createElement("th")
    overallTableTitle.id = "split"
    overallTableTitle.innerHTML = "Overall Split"
    document.getElementById("split-row").appendChild(overallTableTitle);


    //////////////////// Total Time
    let totalTime = document.createElement("td")
    totalTime.id = "split"
    totalTime.innerHTML = secTommss2(totalTimeSum)
    document.getElementById("split-data").appendChild(totalTime);

    //////////////////// First Splits
    let firstHalfSplit = document.createElement("td")
    firstHalfSplit.innerHTML = firstHalfMinToHrs
    document.getElementById("split-data").appendChild(firstHalfSplit);

    //////////////////// Second Splits
    let secondHalfSplit = document.createElement("td")
    secondHalfSplit.innerHTML = firstHalfMinToHrs
    document.getElementById("split-data").appendChild(secondHalfSplit);

    //////////////////// Overall Split
    let overallSplit = document.createElement("td")
    overallSplit.innerHTML = determineSplit
    document.getElementById("split-data").appendChild(overallSplit);



    console.log(determineSplit)

    populateTable()
    return determineSplit
}

