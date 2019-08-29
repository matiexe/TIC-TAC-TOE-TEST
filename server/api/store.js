const fs = require('fs');

let listadoToDo = [];
const saveTarea = () =>{
    let data  = JSON.stringify(listadoToDo);

    fs.writeFile('partidas/partidas.json',data,(err)=>{
        if(err) throw new Error('No se pudo grabar',err)
    })

}
const cargarDB = () =>{
    try{
        listadoToDo = require('../partidas/partidas.json');
    } catch (error){
        listadoToDo = [];
    } 
}

const crear = (partida) =>{
    cargarDB();
    let toDo ={
        partida ,
    };
    listadoToDo.push(toDo);
    saveTarea();
    return toDo;
}
const getListado =()=>{
    //listadoToDo = require('../tododb/data.json');
    cargarDB();
    return listadoToDo;
}

const actualizar=(descripcion, completado)=>{
    cargarDB();
    let index = listadoToDo.findIndex(tarea =>{
        return tarea.descripcion === descripcion;
    })
    if(index>=0){
        listadoToDo[index].completado = completado;
        saveTarea();
        return true;
    }
    else{
        return false;
    }
}
const borrar = (descripcion) =>{
    cargarDB();
    let index = listadoToDo.findIndex(tarea=>{
        return tarea.descripcion === descripcion;
     })
     console.log(index);
     if(index >= 0){
         listadoToDo.splice(index,1);
         saveTarea();
         console.log(listadoToDo);
         return true
     }
     else{
         return false
     }
}

module.exports={
    crear,
    saveTarea,
    getListado,
    actualizar,
    borrar
}