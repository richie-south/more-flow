const fs = require('fs')
const { promisify } = require("util")
const { buildLines, buildBlocks } = require('../dist/index')
const blocks = require('./test-block-data.json')

const promiseReadFile = promisify(fs.readFile)
const promiseWriteFile = promisify(fs.writeFile)

async function start ()  {
  const fileContents = await promiseReadFile('./previous-runs.json')
  const previousRuns = JSON.parse(fileContents)
  const xOffset = 30
  const yOffset = 80
  const height = 1306
  const width = 2022
  const startBlockX = height / 2
  const startBlockY = width / 6
  const runs = []

  for (let index = 0; index < 1000; index++) {
    const startDate = new Date()
    const _blocks = buildBlocks(
      blocks,
      1306,
      2022,
      startBlockX,
      startBlockY,
      xOffset,
      yOffset
    )

    const endBuildBlocksDate = new Date()

    const startBuildLinesDate = new Date()
    const _lines = buildLines(
      _blocks,
      xOffset,
      yOffset
    )
    const endBuildLinesDate = new Date()

    const run = {
      start: startDate,
      blockEndDate: endBuildBlocksDate,
      lineStartDate: startBuildLinesDate,
      endBuildDate: endBuildLinesDate
    }

    runs.push(run)
  }



  previousRuns.push(runs)
  await promiseWriteFile('./previous-runs.json', JSON.stringify(previousRuns, null, 2))

}

start()
  .catch((e) => console.log(e))
