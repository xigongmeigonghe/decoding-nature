"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Planet = function () {
  function Planet(scene, radius, pos) {
    _classCallCheck(this, Planet);

    this.pos = pos;
    this.radius = radius;
    this.displayObject = this.getDisplayObject();
    this.scene = scene;
    this.scene.add(this.displayObject);
  }

  _createClass(Planet, [{
    key: "getDisplayObject",
    value: function getDisplayObject() {
      var geometry = getGeometry(this.radius, 15, 0.08);
      var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
      var mesh = new THREE.Mesh(geometry, material);
      var wireframeGeometry = new THREE.EdgesGeometry(mesh.geometry);
      var wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
      var wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
      mesh.add(wireframe);
      return mesh;
    }
  }, {
    key: "randomSurfacePos",
    value: function randomSurfacePos() {
      return new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).setLength(this.radius);
    }
  }, {
    key: "surfacePosToSpacePos",
    value: function surfacePosToSpacePos() {
      return pos.add(this.pos);
    }
  }, {
    key: "bindToSurface",
    value: function bindToSurface(vector) {
      vector.setLength(this.radius + 50);
    }
  }]);

  return Planet;
}();

var getGeometry = function getGeometry(radius, segments) {
  var roughness = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.05;

  var l = radius * 2;
  var s = segments;
  var boxGeometry = new THREE.BoxGeometry(l, l, l, s, s, s);
  var geometry = new THREE.Geometry();
  boxGeometry.vertices.forEach(function (vertice) {
    vertice.setLength(radius);
    var noise = simplex.noise3D(vertice.x / radius * 20, vertice.y / radius * 20, vertice.z / radius * 20) * radius * roughness;
    vertice.setLength(radius + noise);
  });
  geometry.vertices = boxGeometry.vertices;
  geometry.faces = boxGeometry.faces;
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  return new THREE.BufferGeometry().fromGeometry(geometry);
};