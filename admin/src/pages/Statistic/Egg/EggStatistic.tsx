import BasicLineChart from "./BasicLineChart";
import { BienDongGiaTrung } from "./BienDongGiaTrung";
import { DoanhThuTheoMix } from "./DoanhThuTheoMix";

export const EggStatistic = () => {
  return (
    <>
      <DoanhThuTheoMix />
      <BienDongGiaTrung/>
      <BasicLineChart/>
    </>
  );
};
