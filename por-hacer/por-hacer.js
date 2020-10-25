const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

let ListadoPorHacer = [];

const guardarBd = () => {

        let data = JSON.stringify(ListadoPorHacer); // convierte un objeto a json

        fs.writeFile("db/data.json", data, (err) => {
            if (err)
                throw new Error(" nos se puedo salvar", err)

        })


    }
    // esta funcion es para cargar la bd `para de esa manera cuando la rescribamos no perdamos los datos
const cargarBd = () => {
    try {
        ListadoPorHacer = require('../db/data.json'); // al hacer un require de un punto json, el solo me convierte su contenido en un objeto
    } catch (error) {
        ListadoPorHacer = []; // porqe si a la hora de cargar el json esta vacio me lanza un error
    }
}

let crear = (descripcion) => {
    cargarBd();
    let porHacer = {
        descripcion,
        completado: false // porque si se esta creando la tarea entonces debe estar por hacer
    }
    ListadoPorHacer.push(porHacer);
    guardarBd()
    return porHacer;
}

const getListado = () => {
    cargarBd();
    return ListadoPorHacer;
}

const actualizar = (description) => {
    cargarBd()
        // ListadoPorHacer.find((listado) => {
        //     if (listado.descripcion === description) {
        //         listado.completado = true;
        //     }
        // })

    for (let i = 0; i < ListadoPorHacer.length; i++) {
        if (ListadoPorHacer[i].descripcion == description) {
            ListadoPorHacer[i].completado = true;
            console.log(ListadoPorHacer);
            guardarBd();
            return ListadoPorHacer[i];
        } else
            throw new Error("es tarea no existe")

    }
}

const borrar = (description) => {
    cargarBd();
    let index = ListadoPorHacer.findIndex(tarea => tarea.descripcion === description);
    return new Promise((resolve, reject) => {
        console.log(index);
        if (index < 0) {

            reject("esa tarea no existe");
        } else {
            let borrado = ListadoPorHacer.splice(index, 1);
            guardarBd();
            if (borrado)
                resolve("la tarea ha sido borrada");
        }
    })

}
module.exports = {
    crear,
    guardarBd,
    getListado,
    actualizar,
    borrar
}