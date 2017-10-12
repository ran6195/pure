let f = (lista, righe = [
    []
], p = 0) => {

    //Pulisia della lista
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] instanceof Array && lista[i].length == 0)
            lista[i] = 'NULL'
    }

    if (p != 0) {

        rs = []
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] instanceof Array) {} else {
                for(let j = 0; j< righe.length; j++){
                    nuova_riga = righe[j].slice()
                    nuova_riga.push(lista[i])
                    rs.push(nuova_riga)
                }
            }
        }

        return rs


    } else {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] instanceof Array) {
                righe = f(lista[i].slice(), righe.slice(), 1)
            } else {
                for (let j = 0; j < righe.length; j++) {
                    righe[j].push(lista[i])
                }
            }
        }
    }

    return righe

}


module.exports = f