import PouchDB from 'pouchdb'
import PouchdbFind from 'pouchdb-find'
import PouchDBUpsert from 'pouchdb-upsert'

PouchDB.plugin(PouchdbFind)
PouchDB.plugin(PouchDBUpsert)

export class Database {
  private db: PouchDB.Database

  constructor() {
    this.db = new PouchDB('mydb')
  }

  async find(query: any) {
    const rows = await this.db.find(query)
    return rows.docs
  }

  async get(id: string) {
    return await this.db.get(id)
  }

  async put(doc: any) {
    console.log(doc)
    await this.db.upsert(
      doc._id,
      () => { return doc as any }
    )
  }

  async sync(remote: string) {
    return this.db.sync(remote)
  }
}

const database = new Database()

export function useDatabase() {
  return database
}