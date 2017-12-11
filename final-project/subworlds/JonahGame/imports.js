var triangulate = require("delaunay-triangulate")
var earcut = require("earcut")
var simplex = require("simplex-noise")

window.earcut = earcut
window.triangulate = triangulate
window.simplex = new simplex()
