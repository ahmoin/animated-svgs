# animated-svgs

## Installation

```bash
npm i animated-svgs
```

## Example

```ts
import fs from "fs";
import path from "path";
import generateSVG from "animated-svgs";

const width = 2048;
const height = 200;
const text = "Hello world!";

const numFrames = 60;
const waveFrequency = 1.57;
const waveAmplitude = 5;
const letterSize = 64;
const letterSpacing = 50;

const frames = Array.from({ length: numFrames }, (_, i) => {
  const offset = (i / numFrames) * 2 * Math.PI;
  return Array.from(text)
    .map((letter, j) => {
      const x =
        width / 2 - (text.length / 2) * letterSpacing + j * letterSpacing;
      const y = height / 2;
      const yOffset = Math.sin(j * waveFrequency + offset) * waveAmplitude;
      return `<text x="${x}" y="${
        y + yOffset
      }" fill="#fff" font-size="${letterSize}" text-anchor="middle" dominant-baseline="middle">${letter}</text>`;
    })
    .join("\n");
});

const svgString = generateSVG(width, height, 1, 60, 3, "#000", frames);

const outputPath = path.join("./", "output.svg");

fs.writeFile(outputPath, svgString, (err) => {
  if (err) {
    console.error("Error writing SVG file:", err);
  } else {
    console.log(`SVG file has been saved to ${outputPath}`);
  }
});
```
