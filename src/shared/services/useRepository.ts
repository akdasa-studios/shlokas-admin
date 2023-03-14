import { Database } from './useDatabase'

export function useRepository<T>(
  database: Database,
  collectionName: string
) {
  async function all(): Promise<T[]> {
    return await database.find({
      selector: {
        '@type': { '$eq': collectionName }
      }
    }) as T[]
  }

  async function save(data: T) {
    return await database.save({
      ...data,
      '@type': collectionName,
    })
  }

  async function find(query: any): Promise<T[]> {
    return await database.find({ selector: {
      '@type': { '$eq': collectionName },
      ...query
    } }) as T[]
  }


  async function get(id: string): Promise<T> {
    return await database.get(id) as T
  }

  return {
    find, all, get, save
  }
}