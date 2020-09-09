const fs = require('fs')
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const getDataRow = (inputFilePath) => {
  const records = []; const headerData = []
  return new Promise(function (resolve) {
    fs.createReadStream(inputFilePath)
      .pipe(csv())
      .on('data', function (row) {
        records.push(row)
      })
      .on('headers', (headers) => {
        headerData.push(headers)
      })
      .on('end', function () {
        resolve({
          header: headerData,
          records: records
        })
      })
  })
}

const dataInfo = async (inputFile) => {
  let outputFile = [];
  await Promise.all(inputFile.map(async input => {
    outputFile.push(await getDataRow(input))
  }))
  return outputFile
}

const frameHeader = (inputHeader) => {
  let finalHeader = [];
  let mergedHeader = [].concat.apply([], inputHeader);
  return new Promise(function (resolve) {
    for (let i = 0; i < mergedHeader.length; i++) {
      let outputData = {
        id: mergedHeader[i].toLowerCase(),
        title: mergedHeader[i]
      }
      finalHeader.push(outputData)
    }
    resolve(finalHeader)
  });
}

const frameRecordsData = (inputRecord) => {
  let finalRecord = [];
  for (let records of inputRecord) {
    Object.keys(records).forEach(key => {
      if (key !== "header") {
        Object.keys(records[key]).length && finalRecord.push(records[key])
      }
    })
  }
  let mergedRecord = [].concat.apply([], finalRecord);
  finalRecord = mergedRecord.filter(obj => {
    return Object.keys(obj).length !== 0
  })
  return finalRecord
}

const writeDataToCSV = (outputCsvPath, headerData, recordData) => {
  const csvWriter = createCsvWriter({
    path: outputCsvPath,
    header: headerData
  });
  return new Promise(function (resolve) {
    outputCsv = csvWriter
      .writeRecords(recordData)
      .then(() => {
        resolve(recordData)
      });
  });
}

module.exports = {
  getDataRow,
  dataInfo,
  frameHeader,
  frameRecordsData,
  writeDataToCSV
}