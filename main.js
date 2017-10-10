//Carico il file di configurazione che contiene un array con le configurazioni dei vari box
const boxes = require('./config.js')

//Gestore del file system
const fs = require('fs')

//Parametri di default
const defaults = {
    flags: 'w',
    encoding: 'utf8',
    fd: null,
    mode: 0o666,
    autoClose: true
};

//Carico le librerie dei pure
const PureArray = require('./node_modules/node-purestorage/lib/PureArray.js')

//carico la libreria delle sessioni
const con = require('./node_modules/node-purestorage/lib/session.js')





//Volumi
let volumi
let hosts


//Ciclo su tutti i box

for (let i = 0; i < boxes.length; i++) {
    //effettuoa la connessione ad uno storage
    let C = new con(boxes[i].indirizzo, boxes[i].api_version)

    //Creo l'oggetto  (Promise) relatico alla connessione
    let B = new PureArray(C);

    let writer = (nome, box, estensione) => {
        return new fs.createWriteStream(nome + '_' + box + '.' + estensione, defaults)
    }


    C.authSession(boxes[0].token).then(() => {

       

        //Volumi
        B.Volumes.list().then((data) => {
            let w_csv = writer('volumi', boxes[i].nome, 'csv')
            let w_json = writer('volumi', boxes[i].nome, 'json')
            w_json.write(JSON.stringify(volumi = data));
            w_json = null
            w_csv.write(Object.keys(volumi[0]).join(',') + '\r\n');
            for (let j = 0; j < volumi.length; j++) {

                volumi[j].size = volumi[j].size / Math.pow(2, 30) //Se lo faccio qui funziona anche se la chiave cambia di posizione

                w_csv.write(Object.values(volumi[j]).join(',') + '\r\n')
            }

            w_json = null

        }, err => console.log(err))


        //Hosts
        B.Hosts.list().then((hosts = data) => {
            let w_json = writer('hosts', boxes[i].nome, 'json');
            w_json.write(JSON.stringify(hosts))
            w_json = null
        }, err => console.log(err))


    }, (err) => console.log(err))

}