import { z } from 'zod'

export interface IEntryHolder<T> {
  getEntryByHash(hash: string): T | undefined
}

class SchemaCache<T extends object> {
  private map = new Map<string, WeakRef<T>>()
  private registry = new FinalizationRegistry<string>(this.finalizator.bind(this))

  public get(id: string) {
    return this.map.get(id)?.deref()
  }

  public add(map: [string, T][]) {
    for (const [id, value] of map) {
      this.map.set(id, new WeakRef(value))
      this.registry.register(value, id)
    }
  }

  private finalizator(id: string) {
    const entry = this.map.get(id)
    if (entry && !entry.deref()) this.map.delete(id)
  }
}

export class IdObjectCache {
  private schemas = new Map<z.ZodSchema<object>, SchemaCache<object>>()

  public get<T extends object>(schema: z.ZodSchema<T>, id: string) {
    return this.schemas.get(schema)?.get(id) as T | undefined
  }

  public set<T extends object>(schema: z.ZodSchema<T>, map: [string, T][]) {
    let cache = this.schemas.get(schema)

    if (!cache) {
      cache = new SchemaCache()
      this.schemas.set(schema, cache)
    }

    cache.add(map)
  }
}

export class RequestCache {
  private schemas = new Map<z.ZodSchema<object>, Set<WeakRef<IEntryHolder<object>>>>()
  private registry = new FinalizationRegistry<string>(this.finalizator.bind(this))

  public get<T extends object>(schema: z.ZodSchema<T>, hash: string) {
    const weak = new WeakSet([])


    for (const holder of this.schemas.get(schema) ?? []) {
      const entry = holder.getEntryByHash(hash)
      if (entry !== undefined) return entry
    }
  }

  public set<T extends object>(schema: z.ZodSchema<T>, holder: IEntryHolder<object>) {
    let cache = this.schemas.get(schema)

    if (!cache) {
      cache = new Set()
      this.schemas.set(schema, cache)
    }

    this.cache.set(id, new WeakRef(value))
    
    
    cache.add(new WeakRef(holder))
    this.registry.register(value, id)
  }

  private finalizator(holder: IEntryHolder<object>) {
    const entry = this.sch.get(id)
    if (entry && !entry.deref()) this.map.delete(id)
  }
}
