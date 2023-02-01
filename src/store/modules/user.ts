import { getUserInfo, login } from '/@/api/system/user';
import { StorageEnum } from '/@/enums/storageEnum';
import { storage } from '/@/utils/Storage';
import store from '/@/store';
import { isArray } from '/@/utils/is';
import { reject } from 'lodash-es';

interface UserState {
  token: string;
  userName: string;
  avatar: string;
  userInfo: UserInfo;
  roles: string[];
  permissions: string[];
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userName: '',
    avatar: '',
    userInfo: {},
    roles: [],
    permissions: [],
  }),

  getters: {
    getPermissions(): string[] {
      return this.permissions;
    },

    getRoles(): string[] {
      return this.roles;
    },
  },

  actions: {
    setToken(token: string) {
      this.token = token;
    },

    setPermissions(permissions: []) {
      this.permissions = permissions;
    },

    setRoles(roles: []) {
      this.permissions = roles;
    },

    setAvatar(avatar: string) {
      this.avatar = avatar;
    },

    // 登录系统
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

    // 获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo().then((result: { permissions: []; roles: []; user: UserInfo }) => {
          const { permissions: permissionsList, user: userInfo } = result;

          if (isArray(permissionsList) && permissionsList.length) {
            this.setPermissions(permissionsList);
          } else {
            throw new Error('getInfo: permissions 必须是非空数组!');
          }

          this.setAvatar(userInfo.avatar || '');

          resolve(result);
        });
      }).catch((error) => {
        reject(error);
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
