document.querySelector(".js-form-add").addEventListener("submit" , async (e) => {
    e.preventDefault();

    const data = {
        name : e.target.name.value ,
        montant : e.target.montant.valueAsNumber 
    }

    // vérification avec joi 

    const optionsRequete = { method : "POST" , body : JSON.stringify(data) , headers :  {'Content-Type': 'application/json'}  }
    const reponse = await fetch("http://localhost:4221/transaction" , optionsRequete)

    if(reponse.status) e.target.reset()

})