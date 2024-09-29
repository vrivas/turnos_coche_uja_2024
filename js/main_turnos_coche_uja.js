function mostrarDiasCuatrimestre(){
    let divTitulo=document.getElementById("titulo");
    let divContenido=document.getElementById("contenido");
    divTitulo.innerHTML="Turnos "+cuatrimestre.getTitulo();
    let msj="";
    D.forEach( d => {
        msj+=d.toDiv()+"\n";
    });
    divContenido.innerHTML+=msj;
    
}




mostrarDiasCuatrimestre();