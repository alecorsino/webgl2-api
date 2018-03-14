const assetsCache = new Map();

const updateProgress = (e) =>{
  let percentage = 100* (e.loaded / e.total)
  if (e.lengthComputable) {
    console.log(`[LOADING] ${percentage.toFixed()}%` )
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}


const request = (url, id) => {
  return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = "arraybuffer";
      
      xhr.addEventListener('progress', updateProgress);
      
      xhr.addEventListener('load', (e) => {
          
          console.log('[XHR]',xhr);
          
          resolve(xhr);
          // let responseArray = new Uint8Array(this.response); 
          // console.log('[LOADER] - COMPLETE:',this.response);
          // console.log('[LOADER] - COMPLETE:',responseArray);
      });

      xhr.addEventListener('error', (e) =>{
        console.log('[WEBLOADER] ERROR', e);
        reject(xhr.statusText);
      });
      // xhr.addEventListener('abort', transferCanceled);
      xhr.send();
  })
}



export default class WebLoader {
  
  static load(url, id, cache = true){
    return request(url, id).then(xhr =>{
        let resource = {type:'TEXTURE', url: xhr.responseURL, data: xhr.response}
        if (cache){
          assetsCache.set(id, resource);
        }
        return resource;
      }
    )
    // if (assetsCache.has(url)) {
    //   return assetsCache.get(url)
    // }else {
    // }
  }
  static getAsset(id) {
    return assetsCache.get(id);
  }
}