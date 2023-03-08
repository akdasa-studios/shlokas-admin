import PouchDB from 'pouchdb'
import PouchdbFind from 'pouchdb-find'

PouchDB.plugin(PouchdbFind)

export class Database {
  private db: PouchDB.Database

  constructor() {
    this.db = new PouchDB('mydb')
  }

  async allDocs() {
    const rows = await this.db.find({ selector: { '@type': { '$eq': 'verse' } } })
    // .allDocs({ include_docs: true })
    return rows.docs
  }

  async find(query: any) {
    const rows = await this.db.find(query)
    return rows.docs
  }

  async get(id: string) {
    return this.db.get(id)
  }

  async put(doc: PouchDB.Core.PutDocument<any>) {
    return this.db.put(doc)
  }

  async sync(remote: string) {
    return this.db.sync(remote)
  }
}

const database = new Database()

export function useDatabase() {
  return database
}