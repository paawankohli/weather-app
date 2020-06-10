document.querySelector("form").addEventListener("submit", (e) => {
    
    e.preventDefault();

    const input = document.querySelector("input").value;
    const output = document.querySelector(".output");
    
    output.innerHTML = "Loading....";

    fetch("/weather?address=" + input).then((response) => {
        response.json().then((fetchedData) => {
            if (fetchedData.success === false) {
                // console.log(fetchedData);
                output.textContent = `Error Occured! ${fetchedData.errorMessage}`;
                return;
            }

            // console.log(fetchedData);
            output.textContent = `${fetchedData.forecast} at ${fetchedData.place_name}`;
        });
    });
});
