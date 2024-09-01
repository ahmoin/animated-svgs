export function generateSVG(
  width: number,
  height: number,
  duration: number,
  frameRate: number = 24,
  precision: number = 3,
  backgroundColor?: string,
  frames?: string[]
): string {
  if (frames) {
    frames.push("");
  }

  const numFrames = frames ? frames.length : Math.round(duration * frameRate);

  if (frames) {
    duration = Number(((numFrames - 1) / frameRate).toFixed(precision));
  }

  const delays = Array.from({ length: numFrames }, (_, i) => {
    const delay = i / frameRate;
    return `#f${i} { animation-delay: ${Number(delay.toFixed(precision))}s; }`;
  }).join("\n");

  const backgroundRect = backgroundColor
    ? `<rect width="${width}" height="${height}" fill="${backgroundColor}"/>`
    : "";

  const pathElements = frames
    ? frames
        .map(
          (paths, index) => `
          <g id="f${index}">
            ${paths}
          </g>`
        )
        .join("\n")
    : Array.from({ length: numFrames }, (_, i) => `<g id="f${i}"></g>`).join(
        "\n"
      );

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    ${backgroundRect}
    ${pathElements}
    <style>
    g{visibility:hidden;animation-duration:${duration}s;animation-iteration-count:infinite;animation-name:frame}@keyframes
    frame{0%{visibility:visible}${
      1 / ((duration / 10) * (frameRate / 10))
    }%{visibility:hidden}}
    ${delays}
    </style>
</svg>`;

  return svg;
}

export default generateSVG;
