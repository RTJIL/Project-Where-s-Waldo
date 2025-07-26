export const toPercent = (x, y, width, height) => ({
  x: +((x / width) * 100).toFixed(2),
  y: +((y / height) * 100).toFixed(2),
})
