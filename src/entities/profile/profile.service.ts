import { AFetchRequest, ARequestReflector } from '@/utils'
import { inject, provide, watch } from 'vue'
import { AUTH } from '../'
import { USER_PROFILE_SCHEMA, type TUserProfile } from './profile.model'

export class ProfileService extends ARequestReflector<TUserProfile> {
  constructor() {
    super()
    this.watchTokenReady()
  }
  // ------------------------------------
  //              Internal
  // ------------------------------------
  private watchTokenReady() {
    watch(
      AUTH.inject().state,
      ({ ready, initial }) => {
        if (initial) return this.clear()
        if (!ready) return
        this.reflectState(new ProfileRequest(), null)
        console.log(this)
      },
      { immediate: true }
    )
  }
  // ------------------------------------
  //              Static
  // ------------------------------------
  public static inject() {
    return inject(ProfileService.name) as ProfileService
  }

  public static provide() {
    return provide(ProfileService.name, new ProfileService())
  }
}

export class ProfileRequest extends AFetchRequest<null, TUserProfile> {
  // ------------------------------------
  //              Internal
  // ------------------------------------
  public load() {
    return this.configureRequest({
      method: `GET`,
      url: [`auth`, `profile`],
      schema: USER_PROFILE_SCHEMA,
      body: null
    })
  }
  // ------------------------------------
  //              Mock
  // ------------------------------------
  protected override async loadMock() {
    return (await import(`./profile.mock`)).PROFILE
  }
}
