import * as channels from '../libs/channels';

export function getEpg() {
  return fetch('http://localhost:1337/epg')
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(new Error('Failed to load EPG'));
    }).then(json => channels.convertDatesToNumbers(json.channels));
}
