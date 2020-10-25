const { argv } = require('./config/yargs');
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');
const { actualizar } = require('./por-hacer/por-hacer');
console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log("============== Por hacer ======".green);
            console.log(tarea.descripcion);
            console.log(`Estado : ${tarea.completado}`);
            console.log("===============================".green);
        }
        break;
    case 'actualizar':
        console.log(actualizar(argv.descripcion));
        break;
    case 'borrar':
        porHacer.borrar(argv.descripcion).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
        break;


    default:
        console.log("ese comando no existe");
        break;
}