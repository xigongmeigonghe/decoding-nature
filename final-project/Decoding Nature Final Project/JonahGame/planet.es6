class JonahPlanet {
  constructor(scene,radius, pos) {
    this.pos = pos
    this.radius = radius
    this.displayObject = this.getDisplayObject();
    this.scene = scene;
    this.scene.add(this.displayObject)
  }

  getDisplayObject() {
    const geometry = getGeometry(this.radius, 12, 0.08)
    const material = new THREE.MeshBasicMaterial({color: 0x000000})
    var mesh = new THREE.Mesh( geometry, material );
    var wireframeGeometry = new THREE.EdgesGeometry( mesh.geometry );
    var wireframeMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
    var wireframe = new THREE.LineSegments( wireframeGeometry,wireframeMaterial );
    mesh.add( wireframe );
    return mesh
  }

  randomSurfacePos() {
    return new THREE.Vector3(Math.random()-0.5,Math.random()-0.5,Math.random()-0.5)
      .setLength(this.radius)
  }

  surfacePosToSpacePos() {
    return pos.add(this.pos)
  }
  bindToSurface(vector) {
    vector.setLength(this.radius+50)
  }
}

const getGeometry = (radius, segments, roughness=0.05) => {
  const l = radius*2
  const s = segments
  const boxGeometry = new THREE.BoxGeometry(l,l,l,s,s,s)
  const geometry = new THREE.Geometry()
  boxGeometry.vertices.forEach(vertice => {
    vertice.setLength(radius)
    const noise = (jonahSimplex.noise3D(vertice.x/radius*20, vertice.y/radius*20, vertice.z/radius*20))*radius*roughness
    vertice.setLength(radius+noise)
  })
  geometry.vertices = boxGeometry.vertices
  geometry.faces = boxGeometry.faces
  geometry.computeFaceNormals()
  geometry.computeVertexNormals()
  return new THREE.BufferGeometry().fromGeometry(geometry)

}
