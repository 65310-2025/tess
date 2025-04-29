import { FC } from "react";
import Header from "@/components/Header";
import Hexagons from "@/components/Hexagons";
import Controls from "@/components/Controls";

const App: FC = () => {
  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <div className="w-full">
        <Header />
      </div>

      <div className="flex justify-between items-center p-4">
        <Controls />
      </div>

      <div className="flex justify-center">
        <Hexagons width={600} height={600} />
      </div>
    </div>
  );
};

export default App;
