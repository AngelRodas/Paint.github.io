var pantalla = document.querySelector('canvas');
var pincel = pantalla.getContext('2d');

var colores = ["white","black","Yellow",
                "blue","red","orange",
                "green","skyblue","darkgreen",
                "grey"];
var tamahoCuadrado = 30;
var j = 0;

pincel.fillStyle = 'grey';
pincel.fillRect(0, 0, 400, 400);

crearPaleta();

function crearPaleta() {
    let xMover = 5;
    for(let i = 0; i < colores.length; i++) {
        pincel.fillStyle = colores[i];
        pincel.fillRect(xMover,5,tamahoCuadrado,tamahoCuadrado);
        pincel.stroke = "black";
        pincel.strokeRect(xMover,5,tamahoCuadrado,tamahoCuadrado);
        xMover = xMover + 30;
    }
}

function seleccionarColor(evento) {
    let x = evento.pageX - pantalla.offsetLeft;
    let y = evento.pageY - pantalla.offsetTop;

    if(x < tamahoCuadrado * colores.length + 5 && x > 5
    && y < tamahoCuadrado + 5 && y > 5) {
        for(let i = 0; i < colores.length; i++) {
            if(x < tamahoCuadrado * (i + 1) + 5 && x > 5
            && y < tamahoCuadrado + 5 && y > 5) {
                j = i;
                break;
            }
        }
    }
}

var puedoDibujar = false;
var borradorActivo = false;

function dibujarCirculo(evento) {
    if (puedoDibujar && !borradorActivo) {
        var x, y;

        if (evento.type === 'mousemove') {
            x = evento.pageX - pantalla.offsetLeft;
            y = evento.pageY - pantalla.offsetTop;
        } else if (evento.type === 'touchmove') {
            x = evento.touches[0].clientX - pantalla.offsetLeft;
            y = evento.touches[0].clientY - pantalla.offsetTop;
        }

        if (y > tamahoCuadrado + 10) {
            pincel.fillStyle = colores[j];
            pincel.beginPath();
            pincel.arc(x, y, 5, 0, 2 * Math.PI);
            pincel.fill();
        }
    } else if (borradorActivo) {
        var x, y;

        if (evento.type === 'mousemove') {
            x = evento.pageX - pantalla.offsetLeft;
            y = evento.pageY - pantalla.offsetTop;
        } else if (evento.type === 'touchmove') {
            x = evento.touches[0].clientX - pantalla.offsetLeft;
            y = evento.touches[0].clientY - pantalla.offsetTop;
        }

        if (y > tamahoCuadrado + 10) {
            pincel.fillStyle = 'grey';
            pincel.beginPath();
            pincel.arc(x, y, 5, 0, 2 * Math.PI);
            pincel.fill();
        }
    }
}

function activarBorrador() {
    borradorActivo = true;
    pantalla.style.cursor="url('../img/pngwing.com.png')0 20, auto";
}

function desactivarBorrador() {
    borradorActivo = false;
    pantalla.style.cursor="url('../img/lapiz.png')0 20, auto";
}

pantalla.addEventListener('mousemove', dibujarCirculo);
pantalla.addEventListener('touchmove', dibujarCirculo);

function habilitarDibujar() {
    puedoDibujar = true;
}

function deshabilitarDibujar() {
    puedoDibujar = false;
}

pantalla.addEventListener('mousedown', habilitarDibujar);
pantalla.addEventListener('touchstart', habilitarDibujar);

pantalla.addEventListener('mouseup', deshabilitarDibujar);
pantalla.addEventListener('touchend', deshabilitarDibujar);

pantalla.onclick = seleccionarColor;



