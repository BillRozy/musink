import { ref, Ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { OAuthTokenObject } from 'oauth-api/types';
import { now } from 'moment';
import { MusinkAPIProvider } from 'src/types/global';

const EXPIRATION_THRESHOLD = 0.8;

export const createProviderStore = (apiProvider: MusinkAPIProvider) =>
  defineStore(
    apiProvider,
    () => {
      const token: Ref<OAuthTokenObject | null> = ref(null);
      const tokenSetTime: Ref<number | null> = ref(null);
      const setToken = (newToken: OAuthTokenObject) => {
        tokenSetTime.value = now();
        token.value = newToken;
      };
      const tokenNeedsRefresh = computed(() => {
        if (tokenSetTime.value == null || token.value == null) return true;
        return (
          tokenSetTime.value +
            token.value?.expires_in * 1000 * EXPIRATION_THRESHOLD <
          now()
        );
      });
      const tokenExpired = computed(() => {
        if (tokenSetTime.value == null || token.value == null) return true;
        return tokenSetTime.value + token.value?.expires_in * 1000 < now();
      });
      const checkOrRefreshToken = async () => {
        let newToken = null;
        if (tokenExpired.value) {
          console.warn(`${apiProvider} token is expired, trying to get new...`);
          newToken = await musinkAPI.invokeInMainProcess(
            `${apiProvider}-oauth-get-token`
          );
        } else if (tokenNeedsRefresh.value) {
          console.warn(
            `${apiProvider} token is almost expired, trying to refresh...`
          );
          newToken = await musinkAPI.invokeInMainProcess(
            `${apiProvider}-oauth-refresh-token`
          );
        }
        newToken && setToken(newToken);
        return Promise.resolve();
      };
      return {
        token,
        setToken,
        tokenSetTime,
        tokenNeedsRefresh,
        tokenExpired,
        checkOrRefreshToken,
      };
    },
    {
      persist: {
        storage: localStorage,
        debug: true,
        paths: ['token', 'tokenSetTime'],
      },
    }
  );
