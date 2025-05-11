import RegularPolygon from "../old/RegularPolygon";
import Tiling from "../Tiling";

function createOctagonSquareTiling(width: number, height: number): Tiling {
  const tiling = new Tiling();

  const a = 30; // shared edge length

  // Octagon radius: from side length
  const octagonRadius = a / (2 * Math.sin(Math.PI / 8));

  // Square radius (45-degree rotation, side length = a)
  const squareRadius = a / Math.SQRT2;

  // Offsets between octagon centers (horizontal and vertical step)
  const step = 2 * a + a * Math.SQRT2; // accounts for square in between

  const cols = Math.floor(width / step) + 2;
  const rows = Math.floor(height / step) + 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * step;
      const cy = row * step;

      // Add octagon
      const octagon = new RegularPolygon(8, octagonRadius, cx, cy, Math.PI / 8);
      tiling.addPolygon(octagon);

      // Add square at gap between this octagon and one to the bottom-right
      if (col < cols - 1 && row < rows - 1) {
        const squareX = cx + step / 2;
        const squareY = cy + step / 2;
        const square = new RegularPolygon(
          4,
          squareRadius,
          squareX,
          squareY,
          Math.PI / 4,
        );
        tiling.addPolygon(square);
      }
    }
  }

  return tiling;
}

const OctagonSquareTiling = createOctagonSquareTiling(600, 600);
export default OctagonSquareTiling;
