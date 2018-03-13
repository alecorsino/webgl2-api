const assetsCache = new Map();
let loadingAssets = 0;

const updateProgress = (e) =>{
  let percentage = 100* (e.loaded / e.total)
  if (e.lengthComputable) {
    console.log(`[LOADING] ${percentage.toFixed()}%` )
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}


const request = (url, id) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = "arraybuffer";
  
  xhr.addEventListener('progress', updateProgress);
  
  xhr.addEventListener('load', (e) => {
      loadingAssets--;
      assetsCache.set(id, {type:'TEXTURE',url:e.target.responseURL, data:e.target.response});
      console.log('[LOADER] - COMPLETE:',e.target);
      // let responseArray = new Uint8Array(this.response); 
      // console.log('[LOADER] - COMPLETE:',this.response);
      // console.log('[LOADER] - COMPLETE:',responseArray);
  });

  xhr.addEventListener('error', (e) =>{
    console.log('[WEBLOADER] ERROR', e);
    loadingAssets--
  });
  // xhr.addEventListener('abort', transferCanceled);
  loadingAssets++;
  xhr.send();

}


export default class WebLoader {
  static load(url, id){
    request(url, id)
    // if (assetsCache.has(url)) {
    //   return assetsCache.get(url)
    // }else {
    // }
  }
  static getAsset(id) {
    return assetsCache.get(id);
  }
  static ready(){
    return loadingAssets == 0;
  }
}