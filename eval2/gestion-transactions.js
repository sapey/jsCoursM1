window.addEventListener("DOMContentLoaded"  , async() => {

    const reponse = await fetch("http://localhost:4221/transaction" )
    const todos = await reponse.json(); 
    
    document.querySelector(".js-list-transaction").innerHTML = genererFormsTaches(todos);

    // gestion du nombre de recette
    // document.querySelector(".totalRecette").innerHTML = todos.filter( todo => todo.montant < 0);
    //console.log(todos.filter( todo => todo.montant < 0));
    let totalRecette = 0
    const recette = todos.filter( todo => todo.montant < 0);
    console.log(recette);
    for(let i = 0 ; i < recette.length; i++){
        totalRecette += recette[i].montant;
        //console.log(recette[i].montant);
    }
    //console.log(totalRecette);
    document.querySelector(".totalRecette").innerHTML = totalRecette;


    // gestion du nombre de dépense
    // document.querySelector(".totalDepense").innerHTML = todos.filter( todo => todo.montant > 0);
    //console.log(todos.filter( todo => todo.montant > 0));
    let totalDepense = 0
    const depense = todos.filter( todo => todo.montant > 0);
    console.log(depense);
    for(let i = 0 ; i < depense.length; i++){
        totalDepense += depense[i].montant;
        console.log(depense[i].montant);
    }
    //console.log(totalRecette);
    document.querySelector(".totalDepense").innerHTML = totalDepense;
    



    // gestion du nombre du total de transactions
    document.querySelector(".total").innerHTML = totalDepense - totalRecette; 


    // écouter quand on clique dans la zone js-list-tache
    document.querySelector(".js-list-transaction").addEventListener("click" , async e => {
        e.preventDefault();
        if(e.target.className.includes("btn")){
            const form = e.target.parentNode;
            const action = e.target.value ;
            const id = form.id.value
            if(action == "modifier"){
                const data = {
                    id : id,
                    name : form.name.value,
                    montant : form.montant.valueAsNumber
                }
                const options = { method : "PUT" , body : JSON.stringify(data) , headers : {'Content-Type': 'application/json'} }
                await fetch("http://localhost:4221/transaction/"+id , options)
            }else if(action == "supprimer"){
                const options = {method : "DELETE"}
                await fetch("http://localhost:4221/transaction/"+id , options);
            }
        }
    })
})

function genererFormsTaches(data){

    if(data.length === 0) return "<p>Veuillez ajouter des transactions</p>";

    return data.map( d => {
        return `<form class="d-flex my-3">
        <input type="number" name="id" class="form-input" value="${d.id}" readonly>
        <input type="text" name="name" class="form-input" value="${d.name}">
        <input type="number" name="montant" class="form-input" value="${d.montant}">
        <input type="submit" class="btn btn-primary mx-3" value="modifier">
        <input type="submit" class="btn btn-danger" value="supprimer">
    </form>`
    } ).join("")
}