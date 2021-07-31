class Main implements EventListenerObject {
  public personas: Array<Persona>;
  /**
   *
   */
  constructor() {
    this.personas = new Array<Persona>();
  }

  handleEvent(ev: Event) {
    let target = <HTMLElement>ev.target;

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
  }

  RedibujarTabla() {
    let criterioFilter = <HTMLSelectElement>$("txtFiltra");
    //no se en que momento rompi el hecho de que mi sexo paso a ser mi edad y biceversa
    //no pude descifrarlo y los nervios me estan matando, lo deje asi

    let varones = this.personas.filter(
      (persona) => (<Cliente>persona).edad == 0
    );

    let mujeres = this.personas.filter(
      (persona) => (<Cliente>persona).edad == 1
    );

    if (criterioFilter.selectedIndex == 0) {
      this.DibujarTabla(varones);
    } else if (criterioFilter.selectedIndex == 1) {
      this.DibujarTabla(mujeres);
    } else {
      this.DibujarTabla(this.personas);
    }

    console.log(mujeres.length);
    console.log(varones.length);
  }

  CalcularPromedio() {
    let txtArea = <HTMLTextAreaElement>$("txtAreaPromedio");

    const promedio: Promise<number> = new Promise<number>(
      (resolve: Function, reject: Function) => {
        const acum =
          this.personas.reduce((aux: number, persona: Persona) => {
            return (aux += (<Cliente>persona).sexo); //no se que rompi que cambie sexo por edad
          }, 0) / this.personas.length;

        if (acum != 0) {
          resolve(acum);
        } else {
          reject(acum);
        }
      }
    );

    promedio
      .then((valor) => {
        txtArea.value = valor.toString();
      })
      .catch((error) => {
        txtArea.value = error + "fallo promesa.";
      });
  }

  Alta() {
    let id;
    if (this.personas.length == 0) {
      id = 1;
    } else {
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

    let nombre = (<HTMLInputElement>$("txtNombre")).value;
    let apellido = (<HTMLInputElement>$("txtApellido")).value;
    let edad = parseInt((<HTMLInputElement>$("txtEdad")).value);
    let sexoAux = <HTMLSelectElement>$("txtSexo");
    let sexo: Sexo = Sexo.masculino;
    if (sexoAux.selectedIndex == 1) {
      sexo = Sexo.femenino;
    }

    let nuevaPersona = new Cliente(id, nombre, apellido, sexo, edad);
    this.personas.push(nuevaPersona);

    this.DibujarTabla(this.personas);
  }

  DibujarTabla(personas: Array<Persona>) {
    let id;
    let nombre;
    let apellido;
    let sexo;
    let edad;

    let tabla = <HTMLTableElement>document.getElementById("tablaPersonas");

    while (tabla.rows.length > 0) {
      tabla.removeChild(tabla.childNodes[0]);
    }
    let trHeaders: HTMLTableRowElement = document.createElement("tr");

    var th1: HTMLTableDataCellElement = document.createElement("th");
    var nodoTexto = document.createTextNode("Id");
    th1.appendChild(nodoTexto);
    trHeaders.appendChild(th1);

    var th2: HTMLTableDataCellElement = document.createElement("th");
    var nodoTexto = document.createTextNode("Nombre");
    th2.appendChild(nodoTexto);
    trHeaders.appendChild(th2);

    var th3: HTMLTableDataCellElement = document.createElement("th");
    var nodoTexto = document.createTextNode("Apellido");
    th3.appendChild(nodoTexto);
    trHeaders.appendChild(th3);

    var th4: HTMLTableDataCellElement = document.createElement("th");
    var nodoTexto = document.createTextNode("Edad");
    th4.appendChild(nodoTexto);
    trHeaders.appendChild(th4);

    var th5: HTMLTableDataCellElement = document.createElement("th");
    var nodoTexto = document.createTextNode("Sexo");
    th5.appendChild(nodoTexto);
    trHeaders.appendChild(th5);

    tabla.appendChild(trHeaders);

    for (const item of personas) {
      let tr: HTMLTableRowElement = document.createElement("tr");
      id = item.id;
      nombre = item.nombre;
      apellido = item.apellido;
      edad = (<Cliente>item).edad;
      sexo = (<Cliente>item).sexo;

      var td1: HTMLTableDataCellElement = document.createElement("td");
      var nodoTexto = document.createTextNode(id.toString());
      td1.appendChild(nodoTexto);
      tr.appendChild(td1);

      var td2: HTMLTableDataCellElement = document.createElement("td");
      var nodoTexto = document.createTextNode(nombre);
      td2.appendChild(nodoTexto);
      tr.appendChild(td2);

      var td3: HTMLTableDataCellElement = document.createElement("td");
      var nodoTexto = document.createTextNode(apellido);
      td3.appendChild(nodoTexto);
      tr.appendChild(td3);

      var td4: HTMLTableDataCellElement = document.createElement("td");
      var nodoTexto = document.createTextNode(sexo.toString());
      td4.appendChild(nodoTexto);
      tr.appendChild(td4);

      var td5: HTMLTableDataCellElement = document.createElement("td");
      var nodoTexto = document.createTextNode(edad.toString());
      td5.appendChild(nodoTexto);
      tr.appendChild(td5);
      tabla.appendChild(tr);
    }
  }

  Eliminar(id: number) {
    this.personas.splice(id, 1);
    this.DibujarTabla(this.personas);
  }
}

window.addEventListener("load", () => {
  let main = new Main();
  let btnAgregar = $("btnAgregar");
  let btnEliminar = $("btnEliminar");
  let btnPromediar = $("btnPromediar");
  let combo = $("txtFiltra");

  btnAgregar?.addEventListener("click", main);
  btnEliminar?.addEventListener("click", main);
  btnPromediar?.addEventListener("click", main);
  combo?.addEventListener("change", main);
});

function $(id: string): HTMLElement | null {
  return document.getElementById(id);
}
