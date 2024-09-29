function mostrarDias(titulo, dias){
    let divTitulo=document.getElementById("titulo");
    let divContenido=document.getElementById("contenido");
    divTitulo.innerHTML=titulo
    let msj="";
    dias.forEach( d => {
        msj+=d.toDiv()+"\n";
    });
    divContenido.innerHTML=msj;
    
}
function mostrarDiasCuatrimestre(){
    mostrarDias(cuatrimestre.getTitulo(),D);    
}

function mostrarDiaHoy(){
    let hoy=new Date();
    mostrarDias( "Hoy, "+hoy.toDD_MMM_YYYY(), D.filter(d => d.fecha.toComparableString()==hoy.toComparableString()) );    
}


// Por defecto, mostramos los días del cuatrimestre
mostrarDiasCuatrimestre();