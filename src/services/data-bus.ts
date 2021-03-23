
class DataBus {

  public storeUser: { id: string, username: string } = null;

  public get privateScope(): string { return '/appdata/tiny-files'; }
  public get publicScope(): string { return '/public/tiny-files'; }

  public get homeUrl(): string { return localStorage.getItem('home_url'); }
  public set homeUrl(url: string) {     localStorage.setItem('home_url', url); }
  public get homeSession(): string { return localStorage.getItem('home_session'); }
  public set homeSession(sid: string) {     localStorage.setItem('home_session', sid); }

  public get storeUrl(): string { return localStorage.getItem('store_url'); }
  public set storeUrl(url: string) {     localStorage.setItem('store_url', url); }
  public get storeSession(): string { return localStorage.getItem('store_session'); }
  public set storeSession(sid: string) {     localStorage.setItem('store_session', sid); }

  public get storeScopes(): string[] { return JSON.parse(localStorage.getItem('store_scopes')); }
  public set storeScopes(scopes: string[]) {             localStorage.setItem('store_scopes', JSON.stringify(scopes)); }

  public get dbUrl(): string { return localStorage.getItem('db_url'); }
  public set dbUrl(url: string) {     localStorage.setItem('db_url', url); }
  public get dbSession(): string { return localStorage.getItem('db_session'); }
  public set dbSession(sid: string) {     localStorage.setItem('db_session', sid); }

  get infoArray(): { id: string, url: string, session: string, scopes?: string[] }[] { return [
    { id: 'home', url: this.homeUrl, session: this.homeSession },
    { id: 'store', url: this.storeUrl, session: this.storeSession, scopes: this.storeScopes },
    { id: 'db', url: this.dbUrl, session: this.dbSession }
  ]; }

  get uniqueBuckets(): { ids: string[], url: string, session: string }[] {
    return this.infoArray
      .reduce((acc, c) => {
        const a = acc.find(a => a.url === c.url && a.session === c.session);
        if(a) a.ids.push(c.id);
        else acc.push({ ids: [c.id], url: c.url, session: c.session });
        return acc;
      }, [] as { ids: string[], url: string, session: string }[]);
  }

  public clear() {
    localStorage.clear();
  }
};

export default new DataBus();
