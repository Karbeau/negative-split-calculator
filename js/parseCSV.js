// Parse local CSV File using Papa Parse
let data
const uploadsuccess=document.getElementById("uploadsuccess").addEventListener("click", () => {
    Papa.parse(document.getElementById('UploadFile').files[0], {
        header: true,
        //quotes: true,
	    complete: function(results) {
		    console.log(results);
            data = results.data[0].Time
            console.log(data)
	    }
    })
})