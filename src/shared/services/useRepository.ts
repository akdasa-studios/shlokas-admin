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

  async function find(query: any): Promise<T[]> {
    return await database.find({ selector: {
      '@type': { '$eq': collectionName },
      ...query
    } }) as T[]
  }

  return {
    find, all
  }
}