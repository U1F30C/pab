import { scaleLinear } from "d3-scale";
import { chain } from "lodash";

const colorScale = (value: number, max: number) => {
  return chain(value)
    .thru(scaleLinear().domain([0, max]).range([0, 255]))
    .clamp(0, 255)
    .round()
    .value();
};

function hexCode(shade: number) {
  return shade.toString(16).toUpperCase().padStart(2, "0");
}

export function riskColor(risk: number) {
  const greenShade = 255 - colorScale(risk - 50, 50);
  const greenColorCode = hexCode(greenShade);
  const redShade = colorScale(risk, 50);
  const redColorCode = hexCode(redShade);
  return `#${redColorCode}${greenColorCode}00`;
}
