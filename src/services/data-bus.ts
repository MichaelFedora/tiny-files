
class DataBus {

  public get privateScope(): string { return '/appdata/tiny-files'; }
  public get publicScope(): string { return '/public/tiny-files'; }

  public get homeUrl(): string { return localStorage.getItem('home_url'); }
  public set homeUrl(url: string) {     localStorage.setItem('home_url', url); }
  public get homeToken(): string { return localStorage.getItem('home_token'); }
  public set homeToken(sid: string) {     localStorage.setItem('home_token', sid); }

  public get storeUrl(): string { return localStorage.getItem('store_url'); }
  public set storeUrl(url: string) {     localStorage.setItem('store_url', url); }
  public get storeToken(): string { return localStorage.getItem('store_token'); }
  public set storeToken(sid: string) {     localStorage.setItem('store_token', sid); }

  public get storeScopes(): string[] { return JSON.parse(localStorage.getItem('store_scopes')); }
  public set storeScopes(scopes: string[]) {             localStorage.setItem('store_scopes', JSON.stringify(scopes)); }

  public get dbUrl(): string { return localStorage.getItem('db_url'); }
  public set dbUrl(url: string) {     localStorage.setItem('db_url', url); }
  public get dbToken(): string { return localStorage.getItem('db_token'); }
  public set dbToken(sid: string) {     localStorage.setItem('db_token', sid); }

  get infoArray(): { id: string, url: string, token: string, scopes?: string[] }[] { return [
    { id: 'home', url: this.homeUrl, token: this.homeToken },
    { id: 'store', url: this.storeUrl, token: this.storeToken, scopes: this.storeScopes },
    { id: 'db', url: this.dbUrl, token: this.dbToken }
  ]; }

  public clear() {
    localStorage.clear();
  }
};

export default new DataBus();
