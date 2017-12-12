"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JonahPlayer = function (_JonahPlanetObject) {
  _inherits(JonahPlayer, _JonahPlanetObject);

  function JonahPlayer(scene, planet) {
    _classCallCheck(this, JonahPlayer);

    var _this = _possibleConstructorReturn(this, (JonahPlayer.__proto__ || Object.getPrototypeOf(JonahPlayer)).call(this, scene, planet));

    _this.run = function () {
      _this.checkKeys();
      _get(JonahPlayer.prototype.__proto__ || Object.getPrototypeOf(JonahPlayer.prototype), "run", _this).call(_this);
      _this.raycaster.set(_this.pos, _this.pos.clone().negate().normalize());
      var intersection = _this.raycaster.intersectObject(_this.planet.displayObject)[0];
      if (intersection) {
        var surfaceNormal = intersection.face.normal;
        var len = intersection.point.length();
        _this.displayObject.position.copy(intersection.point).setLength(len + 25);
        _this.displayObject.lookAt(new THREE.Vector3());
        //this.displayObject.lookAt(this.displayObject.position.clone().sub(surfaceNormal));
      }
    };

    _this.checkKeys = function () {
      if (_this.keys.left) _this.rotationalAcceleration = 0.006;else if (_this.keys.right) _this.rotationalAcceleration = -0.006;else {
        if (_this.rotationalVelocity > 0) _this.rotationalAcceleration = -0.012;else if (_this.rotationalVelocity < 0) _this.rotationalAcceleration = 0.012;
        if (Math.abs(_this.rotationalVelocity) < 0.012) {
          _this.rotationalAcceleration = 0;
          _this.rotationalVelocity = 0;
        }
      }
      if (_this.keys.up) _this.acceleration = 0.05;else _this.acceleration = -0.01;
    };

    _this.handleJoystick = function (joystickX, joystickY) {

      var upThreshold = 50;
      var leftThreshold = 25;
      var rightThreshold = 75;

      if (joystickX < leftThreshold) _this.keys.left = true;else _this.keys.left = right;
      if (joystickX > rightThreshold) _this.keys.right = true;else _this.keys.right = false;
      if (joystickY > upThreshold) _this.keys.up = true;else _this.keys.up = false;
    };

    _this.handleKeys = function (key, direction) {
      if (direction === "UP") {
        if (key === "ArrowUp") _this.keys.up = false;else if (key === "ArrowLeft") _this.keys.left = false;else if (key === "ArrowRight") _this.keys.right = false;
      } else if (direction === "DOWN") {
        if (key === "ArrowUp") _this.keys.up = true;else if (key === "ArrowLeft") _this.keys.left = true;else if (key === "ArrowRight") _this.keys.right = true;
      }
    };

    _this.scene = scene;
    _this.displayObject = _this.getDisplayObject();
    scene.add(_this.displayObject);
    _this.keys = { left: false, right: false, up: false };
    _this.raycaster = new THREE.Raycaster(_this.pos, _this.pos.clone().negate().normalize());
    _this.raycaster.far = 100;
    return _this;
  }

  _createClass(JonahPlayer, [{
    key: "getDisplayObject",
    value: function getDisplayObject() {
      var geometry = new THREE.OctahedronGeometry(8, 0);
      var material = new THREE.MeshPhongMaterial({ color: 0x4488FF });
      var mesh = new THREE.Mesh(geometry, material);
      var wireframeGeometry = new THREE.EdgesGeometry(mesh.geometry);
      var wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
      var wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
      mesh.add(wireframe);
      return mesh;
    }

    /*
      ********************************* JOYSTICK HANDLER ********************************
     * Thresholds not properly set yet
    */

  }]);

  return JonahPlayer;
}(JonahPlanetObject);