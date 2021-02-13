import axios from 'axios';
import dataBus from './data-bus';
import { handleError } from '../util';
import { FileListAdvance } from 'types';

declare const docs: boolean;
const redirect = docs ? location.origin + '/tiny-files/' : location.origin + '/login'

class TinyApi {

  private _auth = Object.freeze({
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

      location.href = dataBus.homeUrl + '/auth/handshake/start'
        + '?app=tiny-files'
        + '&redirect=' + redirect
        + '&scopes=home,store,db'
        + (personal ? `&fileScopes=["${dataBus.privateScope}", "${dataBus.publicScope}"]` : '&fileScopes=["/"]')
        + (username ? '&username=' + username : '');
    },

    async getTokens(origin: string, code: string): Promise<void> {
      const tokens = await axios.post<{
        home: { url: string, token: string },
        store: { type: 'tiny', url: string, token: string },
        db: { type: 'tiny', url: string, token: string }
      }>(origin + '/auth/token', {
        app: 'tiny-files',
        redirect: redirect,
        scopes: 'home,store,db',
        code,
        secret: 'keyboardcat'
      }).then(res => res.data, e => { handleError(e); throw e; });

      for(const id of Object.keys(tokens)) {
        dataBus[id + 'Url'] = tokens[id].url;
        dataBus[id + 'Token'] = tokens[id].token;
      }
    },

    async refresh(): Promise<void> {
      await Promise.all(dataBus.uniqueBuckets
        .map(({ ids, url, token }) => axios.get(`${url}/auth/refresh?sid=${token}`)
        .then(res => ids.forEach(id => dataBus[id + 'Token'] = String(res.data), handleError))));
    },

    async getStoreUser(): Promise<{ id: string, username: string }> {
      return axios.get(dataBus.storeUrl + '/self?sid=' + dataBus.storeToken)
        .then(res => res.data, handleError);
    },

    async logout(): Promise<void> {
      await Promise.all(dataBus.uniqueBuckets.map(({ url, token }) => axios.post(`${url}/auth/logout?sid=${token}`)))
        .catch(handleError); // handle all errors at once
      dataBus.clear();
    },
  });

  public get auth() { return this._auth; }

  async deleteSelf(): Promise<void> {
    await Promise.all(dataBus.uniqueBuckets.map(({ url, token }) => axios.delete(`${url}/self?sid=${token}`)
      .catch(handleError))); // handle each error
    dataBus.clear();
  }

  private _files = Object.freeze({

    /**
     * Read a file
     * @param {string} path the file path to read
     * @param {string} responseType (optional) the response type for axios to cast into
     */
    async read(path: string, responseType?: 'blob' | 'text' | 'json'): Promise<any> {
      return axios.get(dataBus.storeUrl + '/files' + path + '?sid=' + dataBus.storeToken, { responseType })
        .then(res => res.data)
        .catch(e => { handleError(e); throw e; });
    },

    /**
     * Get the href to read the file
     * @param {string} path the file path to read
     */
    getReadUrl(path: string): string {
      return dataBus.storeUrl + '/files' + path + '?sid=' + dataBus.storeToken;
    },

    /**
     * Write a raw stream
     * @param {string} path the file path
     * @param {ArrayBuffer } data the data to write
     */
    async write(path: string, data: ArrayBuffer, contentType?: string, onUploadProgress: (event: { loaded: number, total: number }) => void = () => null): Promise<any> {
      await axios.put(`${dataBus.storeUrl}/files${path}?sid=${dataBus.storeToken}${contentType ? '&contentType=' + contentType : ''}`,
        data,
        { headers: contentType ? { 'Content-Type': contentType } : undefined, onUploadProgress })
        .catch(e => { handleError(e); throw e; });
    },

    /**
     * Write a file
     * @param {string} path the file path
     * @param {File} file the file to write
     */
    async writeFile(path: string, file: File, onUploadProgress: (event: { loaded: number, total: number }) => void = () => null): Promise<any> {
      const formData = new FormData();
      formData.append('file', file);

      await axios.put(dataBus.storeUrl + '/files' + path + '?sid=' + dataBus.storeToken, formData, { headers: { 'Content-Type': 'multipart/form-data' }, onUploadProgress })
        .catch(e => { handleError(e); throw e; });
    },


    /**
     * Delete a file
     * @param {string} path the file path
     */
    async delete(path: string): Promise<void> {
      await axios.delete(dataBus.storeUrl + '/files' + path + '?sid=' + dataBus.storeToken)
        .catch(e => { handleError(e); throw e; });
    },

    async listFiles<T extends boolean = false>(path: string, advance?: T, page?: number): Promise<T extends false ? FileList : FileListAdvance> {
      return axios.get(`${dataBus.storeUrl}/list-files${path.length > 0 && !path.startsWith('/') ? '/' : ''}${path}`
        + `?sid=${dataBus.storeToken}${advance ? '&advance=true' : ''}`
        + (page ? '&page=' + page : ''))
        .then(res => res.data)
        .catch(e => { handleError(e); throw e; });
    },

    async getStorageStats(): Promise<{ used: number, available: number, max: number }> {
      return axios.get(dataBus.storeUrl + '/storage-stats' + '?sid=' + dataBus.storeToken)
        .then(res => res.data)
        .catch(e => { handleError(e); throw e; });
    },

    async readPublic(user: string, path: string, responseType?: 'blob' | 'text' | 'json'): Promise<any> {
      return axios.get(dataBus.storeUrl + '/public/' + user + path, { responseType })
        .then(res => res.data)
        .catch(e => { handleError(e); throw e; });
    },

    getPublicReadUrl(user: string, path: string, store?: string): string {
      return (store || dataBus.storeUrl) + '/public/' + user + path;
    }
  });

  public get files() { return this._files; }
};

export default new TinyApi();
