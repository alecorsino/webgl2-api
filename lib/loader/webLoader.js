const assetsCache = new Map();
let resourcesLoading = 0;



const updateProgress = (e) =>{
  let percentage = 100* (e.loaded / e.total)
  if (e.lengthComputable) {
    // console.log(`[WEBLOADER] ${percentage.toFixed()}%` )
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}


const request = (url, id, responseType) => {
  return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      resourcesLoading++;

      xhr.open('GET', url, true);
      xhr.responseType = responseType || '';
      
      xhr.addEventListener('progress', updateProgress);
      
      xhr.addEventListener('load', (e) => {
          
          
          resolve(xhr);
         
          // let responseArray = new Uint8Array(this.response); 
          // console.log('[LOADER] - COMPLETE:',this.response);
          // console.log('[LOADER] - COMPLETE:',responseArray);
      });

      xhr.addEventListener('error', (e) =>{
        console.log('[WEBLOADER] ERROR', e);
        resourcesLoading--;
        reject(xhr.statusText);
        fireReadyEvent()
      });
      // xhr.addEventListener('abort', transferCanceled);
      xhr.send();
  })
}
let callBacks = [];

const isReady = () => (resourcesLoading === 0)

const fireReadyEvent = ()=>{
  if (isReady()){
    callBacks.forEach((f)=>{
      f();
    })
    callBacks = [];
    console.log('[WEBLOADER] IS READY');
    
  }
}



export default class WebLoader {

  static onReady(fn) {
    callBacks.push(fn);
  }
  
  static loadImage(url, id, cache = true){
    return request(url, id, 'blob').then(xhr =>{

        // var arrayBufferView = new Uint8Array( xhr.response );
        // var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl = urlCreator.createObjectURL( xhr.response ); //Already a blob
        let img = document.createElement('img');
        img.onload = function(e) {
          resourcesLoading--;
          fireReadyEvent();
          // window.URL.revokeObjectURL(img.src); 
        };
        img.src = imageUrl;
        let resource = {type:'TEXTURE', url: xhr.responseURL, image: img}
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
  static loadMesh(url, id, cache = true){
    return request(url, id).then(xhr =>{
        let resource = {type:'MESH', url: xhr.responseURL, data: xhr.response}
        if (cache){
          assetsCache.set(id, resource);
          resourcesLoading--;
          fireReadyEvent();
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
    let c = assetsCache.get(id);
    // console.log('[CACHE]',c);
    
    return assetsCache.get(id);
  }
}