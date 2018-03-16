
const getVertexAt = (pos,stride,list) => list.slice(pos*stride,(pos*stride)+stride);




export default class WavefrontParser {
  static parse (o) {
      
    let model = {
        elements: [],
        elementSize: 0,
        elementIndices: []
      };

      let vertices =[],
          uv = [],
          normals = [],
          indices = [],
          indexLookup = new Map(),
          lines = o.split('\n');

      const mapNewIndex = ( v, t, n) =>{
            if (!indexLookup.has(`${v}/${t}/${n}`)) {
              let newV = getVertexAt(v, 3, vertices)
              let newUV = getVertexAt(t, 2, uv)
              let newNormal = getVertexAt(n, 3, normals)
              let elem = [...newV, ...newUV,...newNormal];
              
              model.elements.push(...elem);
              let index =  (model.elements.length / elem.length) - 1;
              indexLookup.set(`${v}/${t}/${n}`,{index, element:elem} );
              model.elementIndices.push(index);
              // console.log(`[Mapping NEW Index] ${index}: ${v}/${t}/${n}`);
            }else {
              let e = indexLookup.get(`${v}/${t}/${n}`);
              // console.log(`[EXISTING Index] ${e.index}: ${v}/${t}/${n}`);
              model.elementIndices.push(e.index);
              
            }
      }
      
      lines.reduce((m, line)=>{
            let vertLine = (/^v\s(-?\d+\.\d+) (-?\d+\.\d+) (-?\d+\.\d+)/g).exec(line); //VERTICES
            let textureLine = (/^vt\s(-?\d+\.\d+) (-?\d+\.\d+)/g).exec(line); //VERTICES
            let normalsLine = (/^vn\s(-?\d+\.\d+) (-?\d+\.\d+) (-?\d+\.\d+)/g).exec(line); //VERTICES
            let indicesLine = (/^f (\d*)\/(\d*)\/(\d*) (\d*)\/(\d*)\/(\d*) (\d*)\/(\d*)\/(\d*)/g).exec(line); //VERT INDICES
            // let indexGroup = (/^f\s(\d*\/\d*\/\d*) (\d*\/\d*\/\d*) (\d*\/\d*\/\d*)/g).exec(line); //ALL INDICES
            
            if(vertLine){
              let [,v1,v2,v3] = vertLine;
              vertices.push(v1,v2,v3);
              // console.log(`[VERT]${v1},${v2},${v3}`);
            }
           
            if(textureLine){
              let [,u,v] = textureLine;
              uv.push(u,v); 
              // console.log(`[V Index] ${vi1},${vi2},${vi3}`);
            }

            if(normalsLine){
              let [,n1,n2,n3]= normalsLine;
              normals.push(n1,n2,n3);
            }

            if(indicesLine){
              let [,
                vi1, ti1, ni1,
                vi2, ti2, ni2,
                vi3, ti3, ni3
              ] = indicesLine;

              //Modify indices to match zero based array indices
              vi1 && vi1--; ti1 && ti1--; ni1 && ni1--;
              vi2 && vi2--; ti2 && ti2--; ni2 && ni2--;
              vi3 && vi3--; ti3 && ti3--; ni3 && ni3--;
              
              indices.push(vi1,vi2, vi3);
              
              // console.log(`[V Index] ${vi1}/${ti1}/${ni1}, ${vi2}/${ti2}/${ni1} ,${vi3}/${ti3}/${ni1}`);
              //Map new Tri faces
              mapNewIndex( vi1, ti1, ni1)
              mapNewIndex( vi2, ti2, ni2)
              mapNewIndex( vi3, ti3, ni3)
              // console.log('[LOOKUP]',indexLookup.has(`${vi1}/${ti1}/${ni1}`));
              
            }
            
            return m;
            
          }, model);
         
          model.elementSize = indexLookup.entries().next().value[1].element.length;

      
      return model;

  }
}


// WavefrontParser.parse(obj);