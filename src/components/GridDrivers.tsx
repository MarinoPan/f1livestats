import TyreIcon from "./Table/TyreIcon";
import SegmentsSectors from "./Table/SegmentsSectors";
import PositionChange from "./Table/PositionChange";
import PositionDriver from "./Table/DriverPosition";
import CarSpeed from "./Table/CarSpeed";
import CarDrs from "./Table/CarDrs";
import Gap from "./Table/Gap";
import LapTime from "./Table/LapTime";
import { useDataStore } from "@store/dataStore";

const GridDrivers: React.FC = () => {
  const timingData = useDataStore((state) => state.TimingData);
  const drivers = useDataStore((state) => state.DriverList);

  const orderedDrivers = Object.values(drivers ?? {})
    .filter((driver) => driver.RacingNumber)
    .sort((a, b) => {
      const posA = timingData?.Lines?.[a.RacingNumber]?.Position || "999";
      const posB = timingData?.Lines?.[b.RacingNumber]?.Position || "999";
      return parseInt(posA) - parseInt(posB);
    });

  // Metodo 3: Log con table per visualizzazione strutturata
  console.table(orderedDrivers);

  return (
    <div className="w-full mx-auto rounded-xl bg-f1-bgLight col-span-12 lg:col-span-8 border border-f1-border block overflow-auto">
      <table className="table-auto w-full text-white text-xs text-left border-collapse">
        <thead className="border-b border-f1-border">
          <tr>
            <th className="px-5 py-2 font-normal">Driver</th>
            <th className="px-5 text-center font-normal">Info</th>
            <th className="px-6 text-center font-normal">Speed</th>
            <th className="px-3 py-2 font-normal">DRS</th>
            <th className="px-3 py-2 font-normal">Tyre</th>
            <th className="px-5 py-2 font-normal">Gap</th>
            <th className="px-3 py-2 font-normal">Lap Time</th>
            <th className="px-3 py-2 font-normal">Settore 1</th>
            <th className="px-3 py-2 font-normal">Settore 2</th>
            <th className="px-3 py-2 font-normal">Settore 3</th>
          </tr>
        </thead>
        <tbody>
          {orderedDrivers.map((driver, index) => (
            <tr
              key={`${driver.RacingNumber}-${index}`}
              className="border-b border-f1-border text-f1-white text-sm"
            >
              <td className="px-5">
                <PositionDriver
                  position={timingData?.Lines?.[driver.RacingNumber]?.Position}
                  color={drivers?.[driver.RacingNumber]?.TeamColour || "NA"}
                  teamName={drivers?.[driver.RacingNumber]?.TeamName || "NA"}
                  acronym={drivers?.[driver.RacingNumber]?.Tla || "NA"}
                />
              </td>
              <td className="px-5">
                <PositionChange racingNumber={driver.RacingNumber} />
              </td>
              <td className="px-6">
                <CarSpeed racingNumber={driver.RacingNumber} />
              </td>
              <td className="px-3">
                <CarDrs racingNumber={driver.RacingNumber} />
              </td>
              <td className="px-3">
                <TyreIcon racingNumber={driver.RacingNumber} />
              </td>
              <td className="px-5 py-1">
                <Gap racingNumber={driver.RacingNumber} />
              </td>
              <td className="px-3 font-bold">
                <LapTime racingNumber={driver.RacingNumber} />
              </td>
              <td className="px-3">
                <SegmentsSectors
                  racingNumber={driver.RacingNumber}
                  numberSector={0}
                />
              </td>
              <td className="px-3">
                <SegmentsSectors
                  racingNumber={driver.RacingNumber}
                  numberSector={1}
                />
              </td>
              <td className="px-3">
                <SegmentsSectors
                  racingNumber={driver.RacingNumber}
                  numberSector={2}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridDrivers;
