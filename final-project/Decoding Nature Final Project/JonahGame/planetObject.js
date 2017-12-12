"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JonahPlanetObject = function () {
  function JonahPlanetObject(scene, planet, pos, vel, maxVelocity) {
    _classCallCheck(this, JonahPlanetObject);

    _initialiseProps.call(this);

    this.planet = planet, this.maxVelocity = maxVelocity || 5;
    this.pos = pos || planet.randomSurfacePos();
    this.nextPos = new THREE.Vector3();
    this.velocity = vel || this.getNewVelocity();
    this.acceleration = 0;
    this.rotationalAcceleration = 0;
    this.rotationalVelocity = 0;
    this.rotationAxis = this.getRotationAxis();
  }

  _createClass(JonahPlanetObject, [{
    key: "run",
    value: function run() {
      if (this.rotationalAcceleration != 0) {
        this.rotationalVelocity += this.rotationalAcceleration;
        if (this.rotationalVelocity > 0.15) this.rotationalVelocity = 0.15;else if (this.rotationalVelocity < -0.15) this.rotationalVelocity = -0.15;
        this.updateRotationAxis();
      }
      this.velocity.applyAxisAngle(this.pos, this.rotationalVelocity / 1000);
      this.velocity.multiplyScalar(1 + this.acceleration);
      this.velocity.clampLength(0.1, this.maxVelocity);
      this.nextPos.addVectors(this.pos, this.velocity);
      this.planet.bindToSurface(this.nextPos);
      this.rotateVelocity();
      this.pos.copy(this.nextPos);
    }
  }]);

  return JonahPlanetObject;
}();

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.getRotationAngle = function () {
    return _this.pos.angleTo(_this.nextPos);
  };

  this.rotateVelocity = function () {
    var _velocity = _this.velocity.clone().add(_this.pos);
    _this.velocity.applyAxisAngle(_this.rotationAxis, -_this.getRotationAngle());
  };

  this.getRotationAxis = function () {
    return _this.pos.clone().add(_this.velocity).cross(_this.pos).normalize();
  };

  this.updateRotationAxis = function () {
    return _this.rotationAxis.copy(_this.getRotationAxis());
  };

  this.getNewVelocity = function () {
    var x = Math.random();
    var y = Math.random();
    var z = -(x * _this.pos.x + y * _this.pos.y) / _this.pos.z;
    var vel = new THREE.Vector3(x, y, z);
    vel.setLength(_this.maxVelocity);
    return vel;
  };
};