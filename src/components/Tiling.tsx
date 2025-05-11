// import PolygonSet from "./PolygonSet";
import Vertex from "./Vertex";
import Edge from "./Edge";
import RegularPolygon from "./old/RegularPolygon";
import Polygon from "./old/Polygon";
import PolygonTile from "./PolygonTile";

class Tiling {
  polygonTiles: Array<PolygonTile>;
  // later: dual graphs?? 
  // overarching crease pattern?


  constructor(polygonTiling: Array<PolygonTile>) {
    this.polygonTiles = polygonTiling.map((polygonTile) => {
      return polygonTile.copy();
    });
  }


  // returns a deep copy with new polygon tile
  addPolygonTile(polygonTile: PolygonTile) {
    const newPolygonTiles = this.polygonTiles.map((tile) => tile.copy());
    newPolygonTiles.push(polygonTile.copy());
    return new Tiling(newPolygonTiles);
  }
  // print() {
  // }

  
}

export default Tiling;
