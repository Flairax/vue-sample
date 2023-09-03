import { AHttpRequest } from '@/utils'
import { watch, inject } from 'vue'
import { USER_PROFILE_SCHEMA, type TUserProfile } from '../model/profile.model'
import { injectAuth } from '../../auth'


export class ProfileService extends AHttpRequest<void, TUserProfile> {
  constructor() {
    super()
    this.watchTokenReady()
  }
  // ------------------------------------
  //              Api
  // ------------------------------------
  public override async load(): Promise<any> {
    throw new Error(`Load depends on AuthService`)
  }
  // ------------------------------------
  //              Internal
  // ------------------------------------
  protected override createRequest() {
    return this.createFetchRequest({
      method: `GET`,
      url: [ `auth`, `profile`],
      schema: USER_PROFILE_SCHEMA
    })
  }

  private watchTokenReady() {
    watch(injectAuth().state, ({ ready, initial }) => {
      if (initial) return this.clear()
      if (!ready) return
      super.load()
    })
  }
  // ------------------------------------
  //              Mock
  // ------------------------------------
  protected override async loadMock() {
    return (await import(`../mock/profile.mock`)).PROFILE
  }
}

export interface IReadonlyProfileService extends Omit<ProfileService, `load`> {
}

export const PROFILE_PROVIDER = Symbol();

export function injectProfile() {
  return inject(PROFILE_PROVIDER) as IReadonlyProfileService;
}
