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
      AUTH.state,
      ({ ready, initial }) => {
        if (initial) return this.clear()
        if (!ready) return
        this.reflectRequest(new ProfileRequest(), null)
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
  constructor() {
    super(USER_PROFILE_SCHEMA)
  }
  // ------------------------------------
  //              Internal
  // ------------------------------------
  public load() {
    return this.sendRequest({
      method: `GET`,
      url: [`auth`, `profile`],
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
