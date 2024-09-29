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
function mostrarDiasSemana(){
    let hoy=new Date();
    let diaSemana=hoy.getDay();
    diaSemana=diaSemana==0?7:diaSemana;
    let posicion=D.findIndex(d => d.fecha.toComparableString()==hoy.toComparableString());
    mostrarDias( "Semana, "+hoy.toDD_MMM_YYYY(), D.slice(posicion-diaSemana+1,posicion-diaSemana+8) );    
}

// Por defecto, mostramos los días del cuatrimestre
mostrarDiasCuatrimestre();