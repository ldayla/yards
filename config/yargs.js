const objDescripcion = {
    alias: "d",
    demand: true,
    desc: "descriptionde la tarea por hacer"
}
const argv = require('yargs')
    .command('crear', 'crea las tareas por hacer', {
        descripcion: objDescripcion
    })
    .command('actualizar', 'actualizar las tareas realizadas', {
        descripcion: objDescripcion,
        completado: {
            alias: "c",
            default: true
        }
    })
    .command('borrar', 'borrar una tarea', {
        descripcion: objDescripcion,

    })
    .help()
    .argv;

module.exports = {
    argv
}