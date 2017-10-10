//Carico il file di configurazione che contiene un array con le configurazioni dei vari box
const boxes = require( './config.js' )

//Gestore del file system
const fs = require( 'fs' )

//Parametri di default
const defaults = {
    flags: 'w',
    encoding: 'utf8',
    fd: null,
    mode: 0o666,
    autoClose: true
  };

//Carico le librerie dei pure
const PureArray = require( './node_modules/node-purestorage/lib/PureArray.js' )

//carico la libreria delle sessioni
const con = require( './node_modules/node-purestorage/lib/session.js' )

//effettuoa la connessione ad uno storage
let C = new con( boxes[ 0 ].indirizzo , boxes[ 0 ].api_version )

//Creo l'oggetto  (Promise) relatico alla connessione
let B = new PureArray( C );

//Volumi
let volumi


//mi connetto al box

C.authSession( boxes[ 0 ].token ).then(() => {

    //Salvo le informazioni di tutti i volumi dello storage
    const writer = new fs.createWriteStream( 'volumi.json' , defaults )

    B.Volumes.list().then(( data ) => {
        writer.write( JSON.stringify( data ) );
    } , err => console.log( err ))
    







}, ( err ) => console.log( err ) )

