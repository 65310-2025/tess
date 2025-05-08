import { FC } from "react";
import Header from "@/components/Header";
import HexagonTiling from "@/components/template_tiles/Hexagons";
import OctagonSquareTiling from "@/components/template_tiles/OctagonSquare";
import Controls from "@/components/Controls";
import Tess from "@/components/Tess";

const App: FC = () => {
  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <div className="w-full">
        <Header />
      </div>

      <div className="flex justify-center p-4">
        <Tess
          width={600}
          height={600}
          tiling={HexagonTiling}
        />
      </div>

    </div>
  );
};

export default App;
