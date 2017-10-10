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


//Ciclo su tutti i box

for (let i = 0; i < boxes.length; i++) {
    //effettuoa la connessione ad uno storage
    let C = new con(boxes[i].indirizzo, boxes[i].api_version)

    //Creo l'oggetto  (Promise) relatico alla connessione
    let B = new PureArray(C);


    C.authSession(boxes[0].token).then(() => {
        //Salvo le informazioni di tutti i volumi dello storage
        let writer_json = new fs.createWriteStream('volumi_' + boxes[i].nome + '.json', defaults)
        let writer_csv = new fs.createWriteStream('volumi_' + boxes[i].nome + '.csv', defaults)
        B.Volumes.list().then((data) => {
            writer_json.write(JSON.stringify(volumi = data));
            //Prendo le chiavi degli oggetti contenuti nell'array
            let o = volumi[0]
            let k = Object.keys(o);
            let prima_riga = k.join(',')
            writer_csv.write(prima_riga + '\r\n');
            for (let j = 0; j < volumi.length; j++) {
                let v = Object.values(volumi[j])
                v[v.length - 1] = v[v.length - 1] / (Math.pow(2, 30))  //Dimensione in GB

                writer_csv.write(v.join(',') + '\r\n')
            }
        }, err => console.log(err))

    }, (err) => console.log(err))

}



