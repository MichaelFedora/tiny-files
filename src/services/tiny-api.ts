import axios, { AxiosError } from 'axios';
import { handleError } from '../util';
import { FileListAdvance } from '@/types';

import dataBus from './data-bus';
import router from '@/router';

const redirect = import.meta.env.VITE_DOCS ? location.origin + '/tiny-files/' : location.origin + '/login';

function handleApiError(e: AxiosError) {
  if(!e)
    return;

  if(e.response?.status === 403 && e.response?.data?.message === 'No session found!')
    dataBus.clear();

  if(!dataBus.storeSession && !/^\/login/.test(router.currentRoute.path))
    router.push(`/login?goto=${router.currentRoute.fullPath}`);

  handleError(e);
}

class TinyApi {

  static get storeScopes() { return [dataBus.privateScope, dataBus.publicScope]; }

  private _auth = Object.freeze({
    async loginFile(origin: string, personal = true): Promise<void> {
      const spleet = origin.split('@');
      let username = '';
      if(spleet[1]) {
        origin = spleet[1];
        username = spleet[0];
      }

      const protocol = /^localhost:/.test(origin) ? 'http:' : location.protocol;
      dataBus.homeUrl = protocol + '//' + origin;
      dataBus.storeScopes = personal ? [dataBus.privateScope, dataBus.publicScope] : ['/']

      location.href = dataBus.homeUrl + '/auth/handshake/start'
        + '?app=tiny-files'
        + '&redirect=' + redirect
        + (personal ? `&scopes=${JSON.stringify(TinyApi.storeScopes)}` : '&scopes=["/"]')
        + (username ? '&username=' + username : '');
    },

    async login(origin: string, personal = true): Promise<void> {
      const spleet = origin.split('@');
      let username = '';
      if(spleet[1]) {
        origin = spleet[1];
        username = spleet[0];
      }

      const protocol = /^localhost:/.test(origin) ? 'http:' : location.protocol;
      dataBus.homeUrl = protocol + '//' + origin;
      dataBus.storeScopes = personal ? [dataBus.privateScope, dataBus.publicScope] : ['/']

      const privateScopes = JSON.stringify([dataBus.privateScope, dataBus.publicScope]);

      location.href = dataBus.homeUrl + '/auth/handshake/start'
        + '?app=tiny-files'
        + '&redirect=' + redirect
        + '&scopes=home,store,db'
        + `&fileScopes=${personal ? privateScopes : '["/"]'}`
        + `&dbScopes=${privateScopes}`
        + (username ? '&username=' + username : '');
    },

    async getFileSession(origin: string, code: string): Promise<void> {
      const sessions = await axios.post<string>(origin + '/auth/handshake/complete', {
        app: 'tiny-files',
        redirect: redirect,
        scopes: ['/'], // TinyApi.storeScopes, // 'home,store,db',
        code,
        secret: 'keyboardcat'
      }).then(res => res.data, e => { handleApiError(e); throw e; });

      dataBus['storeUrl'] = dataBus.homeUrl;
      dataBus.homeSession = sessions;
      dataBus.storeSession = sessions;
    },

    async getSessions(origin: string, code: string): Promise<void> {
      const sessions = await axios.post<{
        home: { url: string, session: string },
        store: { type: 'tiny', url: string, session: string },
        db: { type: 'tiny', url: string, session: string }
      }>(origin + '/auth/session', {
        app: 'tiny-files',
        redirect: redirect,
        scopes: 'home,store,db',
        code,
        secret: 'keyboardcat'
      }).then(res => res.data, e => { handleApiError(e); throw e; });

      for(const id of Object.keys(sessions)) {
        dataBus[id + 'Url'] = sessions[id].url;
        dataBus[id + 'Session'] = sessions[id].session;
      }
    },

    async refresh(): Promise<void> {
      await Promise.all(dataBus.uniqueBuckets
        .map(({ ids, url, session }) => axios.get(`${url}/auth/refresh?sid=${session}`)
        .then(res => ids.forEach(id => dataBus[id + 'Session'] = String(res.data), handleApiError))));
    },

    async getStoreUser(): Promise<{ id: string, username: string }> {
      return axios.get(dataBus.storeUrl + '/self?sid=' + dataBus.storeSession)
        .then(res => res.data, handleApiError);
    },

    async logout(): Promise<void> {
      await Promise.all(dataBus.uniqueBuckets.map(({ url, session }) => axios.post(`${url}/auth/logout?sid=${session}`)))
        .catch(handleApiError); // handle all errors at once
      dataBus.clear();
    },
  });

  public get auth() { return this._auth; }

  private _files = Object.freeze({

    /**
     * Read a file
     * @param {string} path the file path to read
     * @param {string} responseType (optional) the response type for axios to cast into
     */
    async read(path: string, responseType?: 'blob' | 'text' | 'json'): Promise<any> {
      return axios.get(dataBus.storeUrl + '/files' + path + '?sid=' + dataBus.storeSession, { responseType })
        .then(res => res.data)
        .catch(e => { handleApiError(e); throw e; });
    },

    /**
     * Get the href to read the file
     * @param {string} path the file path to read
     */
    getReadUrl(path: string): string {
      return dataBus.storeUrl + '/files' + path + '?sid=' + dataBus.storeSession;
    },

    /**
     * Write a raw stream
     * @param {string} path the file path
     * @param {ArrayBuffer } data the data to write
     */
    async write(path: string, data: ArrayBuffer, contentType?: string, onUploadProgress: (event: { loaded: number, total: number }) => void = () => null): Promise<any> {
      await axios.put(`${dataBus.storeUrl}/files${path}?sid=${dataBus.storeSession}${contentType ? '&contentType=' + contentType : ''}`,
        data,
        { headers: contentType ? { 'Content-Type': contentType } : undefined, onUploadProgress })
        .catch(e => { handleApiError(e); throw e; });
    },

    /**
     * Write a file
     * @param {string} path the file path
     * @param {File} file the file to write
     */
    async writeFile(path: string, file: File, onUploadProgress: (event: { loaded: number, total: number }) => void = () => null): Promise<any> {
      const formData = new FormData();
      formData.append('file', file);

      await axios.put(dataBus.storeUrl + '/files' + path + '?sid=' + dataBus.storeSession, formData, { headers: { 'Content-Type': 'multipart/form-data' }, onUploadProgress })
        .catch(e => { handleApiError(e); throw e; });
    },


    /**
     * Delete a file
     * @param {string} path the file path
     */
    async delete(path: string): Promise<void> {
      await axios.delete(dataBus.storeUrl + '/files' + path + '?sid=' + dataBus.storeSession)
        .catch(e => { handleApiError(e); throw e; });
    },

    async listFiles<T extends boolean = false>(path: string, advance?: T, page?: number): Promise<T extends false ? FileList : FileListAdvance> {
      return axios.get(`${dataBus.storeUrl}/list-files${path.length > 0 && !path.startsWith('/') ? '/' : ''}${path}`
        + `?sid=${dataBus.storeSession}${advance ? '&advance=true' : ''}`
        + (page ? '&page=' + page : ''))
        .then(res => res.data)
        .catch(e => { handleApiError(e); throw e; });
    },

    async getStorageStats(): Promise<{ used: number, available: number, max: number }> {
      return axios.get(dataBus.storeUrl + '/storage-stats' + '?sid=' + dataBus.storeSession)
        .then(res => res.data)
        .catch(e => { handleApiError(e); throw e; });
    },

    async readPublic(user: string, path: string, responseType?: 'blob' | 'text' | 'json'): Promise<any> {
      return axios.get(dataBus.storeUrl + '/public/' + user + path, { responseType })
        .then(res => res.data)
        .catch(e => { handleApiError(e); throw e; });
    },

    getPublicReadUrl(user: string, path: string, store?: string): string {
      return (store || dataBus.storeUrl) + '/public/' + user + path;
    }
  });

  public get files() { return this._files; }
};

export default new TinyApi();
