import { CreateElement } from 'vue';
import { DialogProgrammatic } from 'buefy';
import { AxiosError } from 'axios';

export function makeCenterStyle() {
  return {
    display: 'flex',
    flexFlow: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent'
  };
}

export function makeInitializerComponent(h: CreateElement, loadingComponent: any) {
  return h('div', { staticStyle: makeCenterStyle() }, [h(loadingComponent)]);
}

export async function handleError(e: Error, action?: string, wait?: boolean) {

  const message = (e as AxiosError).response?.data?.message || e.message || String(e);

   const p = new Promise<void>(res => DialogProgrammatic.alert({
    title: action ? 'Error ' + action : 'Error',
    message,
    type: 'is-danger',
    hasIcon: true,
    onConfirm: () => res(),
    onCancel: () => res()
  }));

  if(wait)
    await p;
}


export function getFileIcon(contentType: string): { fileIcon: string; fileIconColor: string } {
  if(contentType.startsWith('application/json'))
    return { fileIcon: 'file-code', fileIconColor: '#f44336' };
  if(contentType.startsWith('application/octet-stream'))
    return { fileIcon: 'file-question', fileIconColor: '#BDBDBD' };
  if(contentType.startsWith('text'))
    return { fileIcon: 'file-document', fileIconColor: '#3F51B5' };
  if(contentType.startsWith('application/pdf'))
    return { fileIcon: 'file-pdf', fileIconColor: '#3F51B5' };
  if(contentType.startsWith('audio') || contentType.startsWith('video/ogg'))
    return { fileIcon: 'file-music', fileIconColor: '#E91E63' };
  if(contentType.startsWith('image'))
    return { fileIcon: 'file-image', fileIconColor: '#4CAF50' };
  if(contentType.startsWith('video'))
    return { fileIcon: 'file-video', fileIconColor: '#673AB7' };
  return { fileIcon: 'file', fileIconColor: '#78909C' };
}

export function computeShortestPath(paths: string[]): string {
  let shortestPath = paths[0];
  for(const path of paths)
    if(path.length < shortestPath.length)
      shortestPath = path;

  shortestPath = shortestPath.slice(0, shortestPath.lastIndexOf('/'));

  while(paths.find(a => !a.startsWith(shortestPath + '/')))
    shortestPath = shortestPath.slice(0, shortestPath.lastIndexOf('/'));

  return shortestPath;
}
