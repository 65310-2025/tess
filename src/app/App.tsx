import { FC } from "react";
import Header from "@/components/Header";
import Hexagons from "@/components/Hexagons";
import Controls from "@/components/Controls";
import TilingCanvas from "@/components/RegularPolygonCanvas";
import RegularPolygonCanvas from "@/components/RegularPolygonCanvas";

const App: FC = () => {
  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <div className="w-full">
        <Header />
      </div>

      <div className="flex justify-center p-4">
        <RegularPolygonCanvas />
      </div>

    </div>
  );
};

export default App;
