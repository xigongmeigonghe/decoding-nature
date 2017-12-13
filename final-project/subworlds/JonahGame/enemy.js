"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JonahEnemy = function (_JonahPlanetObject) {
  _inherits(JonahEnemy, _JonahPlanetObject);

  function JonahEnemy(gameState, target) {
    var _ref;

    _classCallCheck(this, JonahEnemy);

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = JonahEnemy.__proto__ || Object.getPrototypeOf(JonahEnemy)).call.apply(_ref, [this].concat(args)));

    _this.run = function () {

      if (_this.pos.distanceTo(_this.target.pos) < 10) {
        _this.gameState.lives -= 1;
        if (_this.gameState.lives === 0) _this.gameState.userHasLost = true;
        _this.pos = _this.planet.randomSurfacePos();
        _this.velocity = _this.getNewVelocity();
        _this.velocity.setLength(_this.maxVelocity);
        _this.rotationAxis = _this.getRotationAxis();
      } else {
        _get(JonahEnemy.prototype.__proto__ || Object.getPrototypeOf(JonahEnemy.prototype), "run", _this).call(_this);
        _this.displayObject.position.copy(_this.pos).setLength(_this.planet.radius + 20);
      }
    };

    _this.gameState = gameState;
    _this.target = target;
    _this.displayObject = _this.getDisplayObject();
    return _this;
  }

  _createClass(JonahEnemy, [{
    key: "getDisplayObject",
    value: function getDisplayObject() {
      var geometry = new THREE.BoxGeometry(5, 5, 5);
      var material = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
      var mesh = new THREE.Mesh(geometry, material);
      var wireframeGeometry = new THREE.EdgesGeometry(mesh.geometry);
      var wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
      var wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
      mesh.add(wireframe);
      return mesh;
    }
  }]);

  return JonahEnemy;
}(JonahPlanetObject);

var JonahEnemyGenerator = function JonahEnemyGenerator(gameState, scene, planet, target) {
  var _this2 = this;

  _classCallCheck(this, JonahEnemyGenerator);

  this.run = function () {
    if (_this2.gameState.frameCount % _this2.frequency === 0) {
      _this2.createEnemy();
    }
    _this2.enemies.forEach(function (enemy) {
      return enemy.run();
    });
  };

  this.createEnemy = function () {
    var enemy = new JonahEnemy(_this2.gameState, _this2.target, _this2.scene, _this2.planet, _this2.planet.randomSurfacePos(), false, 3);
    if (_this2.enemies.length < _this2.maxEnemies) {
      _this2.enemies.push(enemy);
    }
    _this2.scene.add(enemy.displayObject);
  };

  this.gameState = gameState;
  this.scene = scene;
  this.planet = planet;
  this.target = target;
  this.position = planet.randomSurfacePos();
  this.frequency = 10;
  this.maxEnemies = 60;
  this.enemies = [];
};