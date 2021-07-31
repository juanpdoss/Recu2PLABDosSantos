"use strict";
var Main = /** @class */ (function () {
    /**
     *
     */
    function Main() {
        this.personas = new Array();
    }
    Main.prototype.handleEvent = function (ev) {
        var target = ev.target;
        switch (target.id) {
            case "btnAgregar":
                this.Alta();
                break;
            case "btnEliminar":
                //..
                alert("sin resolver");
                break;
            case "btnPromediar":
                this.CalcularPromedio();
                break;
            case "txtFiltra":
                this.RedibujarTabla();
                break;
        }
    };
    Main.prototype.RedibujarTabla = function () {
        var criterioFilter = $("txtFiltra");
        var varones = this.personas.filter(function (persona) { return persona.edad == 0; });
        var mujeres = this.personas.filter(function (persona) { return persona.edad == 1; });
        if (criterioFilter.selectedIndex == 0) {
            this.DibujarTabla(varones);
        }
        else if (criterioFilter.selectedIndex == 1) {
            this.DibujarTabla(mujeres);
        }
        else {
            this.DibujarTabla(this.personas);
        }
        console.log(mujeres.length);
        console.log(varones.length);
    };
    Main.prototype.CalcularPromedio = function () {
        var _this = this;
        var txtArea = $("txtAreaPromedio");
        var promedio = new Promise(function (resolve, reject) {
            var acum = _this.personas.reduce(function (aux, persona) {
                return (aux += persona.sexo); //no se que rompi que cambie sexo por edad
            }, 0) / _this.personas.length;
            if (acum != 0) {
                resolve(acum);
            }
            else {
                reject(acum);
            }
        });
        promedio
            .then(function (valor) {
            txtArea.value = valor.toString();
        })
            .catch(function (error) {
            txtArea.value = error + "fallo promesa.";
        });
    };
    Main.prototype.Alta = function () {
        var id;
        if (this.personas.length == 0) {
            id = 1;
        }
        else {
            id = this.personas.reduce(function (max, item) {
                if (item.id >= max) {
                    return item.id + 1;
                }
                return max;
            }, 0);
            if (id == 0) {
                id + 1;
            }
        }
        var nombre = $("txtNombre").value;
        var apellido = $("txtApellido").value;
        var edad = parseInt($("txtEdad").value);
        var sexoAux = $("txtSexo");
        var sexo = Sexo.masculino;
        if (sexoAux.selectedIndex == 1) {
            sexo = Sexo.femenino;
        }
        var nuevaPersona = new Cliente(id, nombre, apellido, sexo, edad);
        this.personas.push(nuevaPersona);
        this.DibujarTabla(this.personas);
    };
    Main.prototype.DibujarTabla = function (personas) {
        var id;
        var nombre;
        var apellido;
        var sexo;
        var edad;
        var tabla = document.getElementById("tablaPersonas");
        while (tabla.rows.length > 0) {
            tabla.removeChild(tabla.childNodes[0]);
        }
        var trHeaders = document.createElement("tr");
        var th1 = document.createElement("th");
        var nodoTexto = document.createTextNode("Id");
        th1.appendChild(nodoTexto);
        trHeaders.appendChild(th1);
        var th2 = document.createElement("th");
        var nodoTexto = document.createTextNode("Nombre");
        th2.appendChild(nodoTexto);
        trHeaders.appendChild(th2);
        var th3 = document.createElement("th");
        var nodoTexto = document.createTextNode("Apellido");
        th3.appendChild(nodoTexto);
        trHeaders.appendChild(th3);
        var th4 = document.createElement("th");
        var nodoTexto = document.createTextNode("Edad");
        th4.appendChild(nodoTexto);
        trHeaders.appendChild(th4);
        var th5 = document.createElement("th");
        var nodoTexto = document.createTextNode("Sexo");
        th5.appendChild(nodoTexto);
        trHeaders.appendChild(th5);
        tabla.appendChild(trHeaders);
        for (var _i = 0, personas_1 = personas; _i < personas_1.length; _i++) {
            var item = personas_1[_i];
            var tr = document.createElement("tr");
            id = item.id;
            nombre = item.nombre;
            apellido = item.apellido;
            edad = item.edad;
            sexo = item.sexo;
            var td1 = document.createElement("td");
            var nodoTexto = document.createTextNode(id.toString());
            td1.appendChild(nodoTexto);
            tr.appendChild(td1);
            var td2 = document.createElement("td");
            var nodoTexto = document.createTextNode(nombre);
            td2.appendChild(nodoTexto);
            tr.appendChild(td2);
            var td3 = document.createElement("td");
            var nodoTexto = document.createTextNode(apellido);
            td3.appendChild(nodoTexto);
            tr.appendChild(td3);
            var td4 = document.createElement("td");
            var nodoTexto = document.createTextNode(sexo.toString());
            td4.appendChild(nodoTexto);
            tr.appendChild(td4);
            var td5 = document.createElement("td");
            var nodoTexto = document.createTextNode(edad.toString());
            td5.appendChild(nodoTexto);
            tr.appendChild(td5);
            tabla.appendChild(tr);
        }
    };
    Main.prototype.Eliminar = function (id) {
        this.personas.splice(id, 1);
        this.DibujarTabla(this.personas);
    };
    return Main;
}());
window.addEventListener("load", function () {
    var main = new Main();
    var btnAgregar = $("btnAgregar");
    var btnEliminar = $("btnEliminar");
    var btnPromediar = $("btnPromediar");
    var combo = $("txtFiltra");
    btnAgregar === null || btnAgregar === void 0 ? void 0 : btnAgregar.addEventListener("click", main);
    btnEliminar === null || btnEliminar === void 0 ? void 0 : btnEliminar.addEventListener("click", main);
    btnPromediar === null || btnPromediar === void 0 ? void 0 : btnPromediar.addEventListener("click", main);
    combo === null || combo === void 0 ? void 0 : combo.addEventListener("change", main);
});
function $(id) {
    return document.getElementById(id);
}
