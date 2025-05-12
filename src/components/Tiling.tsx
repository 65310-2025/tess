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

  toFOLD() {
  // exportToFOLDAndDownload(filename = "export.fold") {
    const vertices: Vertex[] = [];
    const vertexIndexMap = new Map<string, number>();
    const edgeCountMap = new Map<string, { count: number; i0: number; i1: number }>();
    const faces: number[][] = [];
    const pleatEdges: { i0: number; i1: number; crease: number }[] = [];
  
    const addVertex = (v: Vertex): number => {
      const key = `${v.x.toFixed(6)},${v.y.toFixed(6)}`;
      if (vertexIndexMap.has(key)) return vertexIndexMap.get(key)!;
      const index = vertices.length;
      vertexIndexMap.set(key, index);
      vertices.push(v);
      return index;
    };
  
    for (const tile of this.polygonTiles) {
      const face = tile.vertices.map(v => addVertex(v));
      faces.push(face);
  
      for (const edge of tile.edges) {
        const i0 = addVertex(edge.start);
        const i1 = addVertex(edge.end);
        const key = [i0, i1].sort((a, b) => a - b).join(":");
  
        if (!edgeCountMap.has(key)) {
          edgeCountMap.set(key, { count: 1, i0, i1 });
        } else {
          edgeCountMap.get(key)!.count++;
        }
      }
  
      for (const pleatEdge of tile.pleatEdges) {
        const i0 = addVertex(pleatEdge.start);
        const i1 = addVertex(pleatEdge.end);
        pleatEdges.push({ i0, i1, crease: pleatEdge.crease });
      }
    }
  
    const edges_vertices: number[][] = [];
    const edges_assignment: string[] = [];
  
    // Add pleats first (crease-assigned edges)
    for (const { i0, i1, crease } of pleatEdges) {
      edges_vertices.push([i0, i1]);
      edges_assignment.push(crease === 1 ? "M" : crease === -1 ? "V" : "U");
    }
  
    // Add outer and shared edges
    for (const { count, i0, i1 } of edgeCountMap.values()) {
      edges_vertices.push([i0, i1]);
      edges_assignment.push(count === 1 ? "B" : "F");
    }
  
    const foldObject = {
      file_spec: 1,
      file_creator: "Tessellation App",
      file_author: "You",
      file_classes: ["singleModel"],
      frame_title: "Polygon Tiling",
      frame_classes: ["foldedForm"],
      frame_attributes: ["2D"],
      vertices_coords: vertices.map(v => [v.x, v.y, 0]),
      faces_vertices: faces,
      edges_vertices,
      edges_assignment,
    };
  
    // Trigger download
    const blob = new Blob([JSON.stringify(foldObject, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const randomString = Math.random().toString(36).substring(2, 15);
    a.href = url;
    a.download = `tess_${randomString}.fold`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export default Tiling;
