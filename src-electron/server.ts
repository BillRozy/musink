import {
  OAuthTokenObject,
  RestAPI,
  AuthAPI,
  Track,
  UserProfile,
} from '../api/types';
import { useYandexRestAPI, useYandexAuthAPI } from '../api/index';

class YandexRestler implements RestAPI {
  static token: null | OAuthTokenObject = null;
  private restAPI: RestAPI;
  private authAPI: AuthAPI;
  constructor() {
    this.authAPI = useYandexAuthAPI();
    this.restAPI = useYandexRestAPI();
  }
  async invokeAuthAPI(method, args) {}

  async invokeRestAPI() {}
}
