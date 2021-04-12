export const buildTsGameOfLifePattern = (
  patternName: string,
  value: boolean[][]
) =>
  `export const ${patternName}​​​​​​​ = ${JSON.stringify(
    value,
    null,
    2
  )}​​​​​​​;`;
