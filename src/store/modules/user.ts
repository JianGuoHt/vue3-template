import { login } from '/@/api/system/user';
import { StorageEnum } from '/@/enums/storageEnum';
import { storage } from '/@/utils/Storage';

interface UserState {
  token: string;
  userName: string;
  avatar: string;
  roles: [];
  permissions: [];
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userName: '',
    avatar: '',
    roles: [],
    permissions: [],
  }),

  actions: {
    setToken(token: string) {
      this.token = token;
    },

    async login(userInfo: { username: string; password: string }) {
      try {
        const response = await login(userInfo);
        const { token } = response;
        storage.set(StorageEnum.TOKEN_KEY, token);
        this.setToken(token);

        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject();
      }
    },
  },
});
