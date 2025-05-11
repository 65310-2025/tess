// Polygons in this polygon set never overlap
// TODO: add a function to check if two polygons overlap

import RegularPolygon from "./old/RegularPolygon";
import Polygon from "./old/Polygon";

class PolygonSet {
  polygons: Array<Polygon>;

  constructor() {
    this.polygons = [];
  }

  addPolygon(polygon: Polygon) {
    this.polygons.push(polygon);
  }

  getPolygons() {
    return this.polygons;
  }

  clear() {
    this.polygons = [];
  }

  add(polygon: Polygon) {
    this.polygons.push(polygon);
  }
}
export default PolygonSet;
