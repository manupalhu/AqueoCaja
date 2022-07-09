$(document).ready(function () {

    //Variables necesarios
    
    var enCaja = [];
    var monedas = [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];
    var devolver = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var importe=0;
    var caja=0;
    var total=0;

    $("#calcular").click(function (e) {

        e.preventDefault();

        caja = parseFloat($("#caja").val());
        importe = parseFloat($("#cantidadEperada").val());

        monedas.forEach(function(item,index){

            let nombre="#e"+monedas[index];
            nombre=nombre.replace(".",'');

            enCaja[index] = parseFloat($(nombre).val());
            total = total + (enCaja[index] * monedas[index]);

        });

        //Mostarmos total
        $("#total").text(total.toFixed(2) + "€");

        //Discrepancia
        var discrepancia = total - importe;
        var diferencia = $("#diferencia");

        diferencia.text(discrepancia.toFixed(2) + "€");

        if (discrepancia >= 0) {

           diferencia.css("color", "green");

        } else if (discrepancia < 0) {

            diferencia.css("color", "red");
        }

        
       


        calculadora();
        sacarDinero();

    });

/**
 * Funciones
 */


    function calculadora(){
        //Calculadora
        enCaja.forEach(function (item, index) {

            // Si el importe actual, es superior a la moneda
           
            if (importe >= monedas[index]) {

                // obtenemos cantidad de monedas
                devolver[index] = (Math.floor(importe / monedas[index]));

                if (devolver[index] > enCaja[index]) {
                    devolver[index] = enCaja[index];
                }

                console.log(devolver[index]);
                // actualizamos el valor del importe que nos queda por didivir
                importe = (importe - (devolver[index] * monedas[index])).toFixed(2);


            }


        });

    }


    function sacarDinero(){

        var derecha = $("#drch");

        //Limpiamos si hubiera datos
        derecha.html("");

        //Recorre todas posibilidades
        monedas.forEach(function (item, index) {
            if (devolver[index] > 0) {
                if (monedas[index] > 2) {
                    // Indicamos que es un billete
                    derecha.append("<p>" + "Billetes de " + monedas[index] + "€: " + devolver[index] + "<p>");

                } else {
                    // Indicamos que es una moneda
                    derecha.append("<p>" + "Monedas de " + monedas[index] + "€: " + devolver[index] + "<p>");
                }

            }
        });

        //en caso de que falte suelto para sacar
        if (importe > 0) {

            derecha.append("<p>" + "Falta: " + importe + "€" + "<p>");
        }

        if (total > 0) {
            derecha.css({
                "padding": "10px",
                "border": "solid 1px black"
            });
        }
    }
});
