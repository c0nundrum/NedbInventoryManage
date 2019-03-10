const loki = require('lokijs');
const path = require('path');

const LokiFSStructuredAdapter = require('lokijs/src/loki-fs-structured-adapter');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

let dbFile = path.resolve(__dirname, './test-data.json');

let Db = new loki(dbFile,
  {
    verbose: true,
    autosave: true,
    autoload: true,
    autosaveInterval: 1000,
    adapter: new LokiFSStructuredAdapter(),
    autoloadCallback: databaseInitialize,
    autosaveCallback: () => {
      console.log('autosaved db');
    }
  }
);

export default function databaseInitialize() {
  let entries = Db.getCollection('estoque');

  if (entries === null) {
    console.log('estoque collection is empty, ADDING new collection estoque');
    entries = Db.addCollection('estoque', { unique: ['id'] });
    entries.insert({id: 1, produto: 'camisa', sexo: 'M', quantidade: {p: 2, m: 0, g: 5}, preco: {atacado: 20.5, varejo: 25.5}, fabricante: "nike", total: 50});
    entries.insert({id: 2, produto: 'saia', sexo: 'F', quantidade: {p: 2, m: 0, g: 5}, preco: {atacado: 20.5, varejo: 25.5}, fabricante: "rebook", total: 30});
    entries.insert({id: 3, produto: 'calca', sexo: 'F', quantidade: {p: 2, m: 0, g: 5}, preco: {atacado: 20.5, varejo: 25.5}, fabricante: "adidas", total: 25});
  } else {
    console.log('estoque was found')
  }

  var myEventHandler = function() {
    let entry = Db.getCollection('estoque');
    entry.insert({id: 4, produto: 'meia', sexo: 'F', quantidade: {p: 2, m: 0, g: 5}, preco: {atacado: 20.5, varejo: 25.5}, fabricante: "adidas", total: 25});
    console.log('ran');
    console.log(entries);
  }

  let m = 0,n=0;

  myEmitter.on('event',() => {
    console.log("M value:",++m);
  })

  setData()

}

export function setData(){
  myEmitter.emit('event');
}
