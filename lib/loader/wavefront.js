
export default class WavefrontParser {
  static parse (o) {
      let model = {
        vertices:[],
        indices:[]
      };
      
      let lines = o.split('\n');
    
      lines.reduce((m, line)=>{
            let vert = (/^v\s(-?\d+\.\d+) (-?\d+\.\d+) (-?\d+\.\d+)/g).exec(line); //VERTICES
            let vertIndex = (/^f (\d*)\/\d*\/\d* (\d*)\/\d*\/\d* (\d*)\/\d*\/\d*/g).exec(line); //VERT INDICES
            // let indexGroup = (/^f\s(\d*\/\d*\/\d*) (\d*\/\d*\/\d*) (\d*\/\d*\/\d*)/g).exec(line); //ALL INDICES
            
            if(vert){
              let [,v1,v2,v3]=vert;
              m.vertices.push(v1,v2,v3);
              // console.log(`[VERT]${v1},${v2},${v3}`);
            }
          
            if(vertIndex){
              let [,vi1,vi2,vi3] = vertIndex;
              m.indices.push(vi1 - 1,vi2 - 1, vi3 - 1); //Correct indices to match zero based array indices
              // console.log(`[V Index] ${vi1},${vi2},${vi3}`);
            }
        
            return m;

      }, model);
      
      return model;

  }
}


// WavefrontParser.parse(obj);