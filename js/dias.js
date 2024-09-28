/// Genera los días del cuatrimestre
let D=[];

function diaToDiv( ) {
    let msj="";
    // clases aplicables al día
    let clasesDia=["dia"];
    if( this.fecha.getDay()==1 ) clasesDia.push("nueva-semana");
    if( this.fecha.getDate()==1 ) clasesDia.push("nuevo-mes");
    if( this.fecha.getDay()==0 || this.fecha.getDay()==6 ) clasesDia.push("fin-de-semana");
    let idDia="";
    if( this.festivo!=null ) clasesDia.push("no-lectivo");
    if( this.fecha.toComparableString()==(new Date()).toComparableString() ) idDia="id='hoy'";
    clasesDia=clasesDia.join(" ");
    // Contenido de cada dia
    let divFecha=`<div class='fecha-dia'>${this.fecha.toDW_DD_MMM()}</div>`;
    let divEficiencia=""//`<div class='eficiencia-dia'>Eficiencia ${this.eficiencia}</div>`;
    let divTurnos="";
    this.infoTurnos.filter( it => !null).forEach(it => divTurnos+=infoTurnoToDiv(it) );

    return `<div class='${clasesDia}' ${idDia}>
        ${divFecha}
        ${divEficiencia}
        ${divTurnos}
        <div class='separador'></div>
    </div>`
}
// Objeto Dia
function Dia( fecha ) {
    this.fecha = fecha;
    this.infoTurnos = [];
    this.addInfoTurno = function( info ) {
        this.infoTurnos.push(info);
        return this;
    }
    this.festivo=null;
    this.toDiv=diaToDiv;
}

function esNoLectivo( unaFecha ) {
    // Comprobamos si es festivo
    for( let f of cuatrimestre.festivos ) {
        if( comparaFechas(f.inicio, unaFecha)==0 ) {
            return f.nombre;
        }

        if ( (f.fin!=null && comparaFechas(f.inicio,unaFecha)<=0 &&
            comparaFechas(f.fin,unaFecha)>=0) ) {
            return f.nombre;
        }
        
    }
    // Comprobamos si es sábado o domingo
    if( unaFecha.getDay()==0 || unaFecha.getDay()==6 ) {
        return "Fin de semana";
    }
    return null;
}

function rellenaDias() {
    let d=new Date( cuatrimestre.inicio);
    while( d<=cuatrimestre.fin ) {
        let dia=new Dia( new Date(d) );

        // En primer lugar, comprobamos si es no lectivo
        dia.festivo=esNoLectivo(d);
        

        // Si es lectivo, añadimos los turnos
        if( dia.festivo==null ) {
            for( let t of T ) {
                if( t.dia==d.getDay() ) {
                    if( comparaFechas(t.fechaInicio,d)<=0 
                        && comparaFechas(t.fechaFin,d)>=0 ) {
                        dia.addInfoTurno(t.getInfoParaDia());
                    }
                }
            }
        }

        D.push( dia);
        d.setDate(d.getDate()+1);
    }
}


rellenaDias();