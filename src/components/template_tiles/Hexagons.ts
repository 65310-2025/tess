import RegularPolygon from "../old/RegularPolygon";
// import PolygonSet from "./PolygonSet";
import Tiling from "../Tiling";

function createHexagons(width: number, height: number): Tiling {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 75;
  const rotation = Math.PI / 6; // default rotation

  const dx = Math.sqrt(3) * 75; // TODO: remove hardcoded value
  const dy = 1.5 * 75;

  const hexCenters = [
    [0, 0], // center
    [dx, 0],
    [-dx, 0],
    [dx / 2, dy],
    [-dx / 2, dy],
    [dx / 2, -dy],
    [-dx / 2, -dy],
  ];

  // create polygon set of polygons
  const hexPolygonSet = new Tiling();
  // parse polygon set to draw lines corresponding to hexagons
  hexCenters.forEach(([offsetX, offsetY]) => {
    const hexagon = new RegularPolygon(
      6,
      radius,
      centerX + offsetX,
      centerY + offsetY,
      rotation,
    );
    hexPolygonSet.addPolygon(hexagon);
  });

  return hexPolygonSet;
}

const HexagonTiling = createHexagons(600, 600);

export default HexagonTiling;
