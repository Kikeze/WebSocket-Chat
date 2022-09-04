const formObject = document.querySelector("form");


formObject.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {};

    for(let item of formObject.elements) {
        if( item.name && item.name.length > 0) {
            formData[item.name] = item.value;
        }
    }
    
    fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( formData )
    })
    .then( r => r.json() )
    .then( resp => {
        if( resp.msg ) {
            return console.log(resp.msg);
        }
        
        localStorage.setItem("token", resp.token);
    })
    .catch(err => console.warn(err));
});

function handleCredentialResponse(response) {
    fetch("/api/auth/google",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            "Google_Token": response.credential
        })})
        .then( r => r.json() )
        .then( resp => {
            localStorage.setItem("token", resp.token);
        })
        .catch( err => console.warn(err) );
};

const button = document.getElementById("google_signout");
button.onclick = () => {
    console.log( google.accounts.id );
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(
        localStorage.getItem( "email" ),
        (done) => {
            localStorage.clear();
            location.reload();
        });
};


