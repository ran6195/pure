//Carico il file di configurazione che contiene un array con le configurazioni dei vari box
const boxes = require( './config.js' )

//Carico le librerie dei pure
const PureArray = require( './node_modules/node-purestorage/lib/PureArray.js' )

//carico la libreria delle sessioni
const con = require( './node_modules/node-purestorage/lib/session.js' )

//effettuoa la connessione ad uno storage

let C = new con( boxes[ 0 ].indirizzo , boxes[ 0 ].api_version )

//Creo l'oggetto  (Promise) relatico alla connessione
let B = new PureArray( C );


//mi connetto al box

C.authSession( boxes[ 0 ].token ).then(() => console.log('connessione ok') , ( err ) => console.log( err ) )





