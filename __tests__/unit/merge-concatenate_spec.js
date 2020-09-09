/* eslint-disable no-undef */
const fileValidator = require('../../controllers/file-validation')
let framedOutputFilePath = 'testData/output/concat-output.csv'
let inputData, frameHeaderData, frameRecordsData, framedOutputWithoutHeader, originalOutput
let inputParam = process.env.npm_config_inputs.split(',')
let originalOutputFilePath = process.env.npm_config_outputFile

describe('To assert the datas present in multiple files are concatenated into a single file', () => {
  beforeAll(async () => {
    inputData = await fileValidator.dataInfo(inputParam)
    if(inputData){
      await Promise.all(inputData.map(async (input, index) => {        
        if(index === 0){
          frameHeaderData = await fileValidator.frameHeader(input.header)
        }
      }))
      frameRecordsData = fileValidator.frameRecordsData(inputData)
    }
    if(frameHeaderData && frameRecordsData){
        framedOutputWithoutHeader = await fileValidator.writeDataToCSV(framedOutputFilePath, frameHeaderData, frameRecordsData);
    }
    originalOutput = await fileValidator.getDataRow(originalOutputFilePath);
  })

  //npm run test-dev --inputs=testData/users.csv,testData/all-users.csv --outputFile=testData/output/merge_users-allusers.csv
  it('Verify whether the multiple files are merged together when the input files have the same column headers and sequence', () => {
    let verifyRecordStatus = true
    originalOutput.records.forEach(function (outputRecord, outputIndex) {
      frameHeaderData.forEach(function (framedHeaderRecord) {
        try {
          expect(outputRecord[framedHeaderRecord.id]).toEqual(framedOutputWithoutHeader[outputIndex][framedHeaderRecord.id])
        } catch (err) {
          verifyRecordStatus = false
          console.error('[',outputRecord[framedHeaderRecord.id],'] - output value doesn\'t match with the framed output value - [',framedOutputWithoutHeader[outputIndex][framedHeaderRecord.id],'] for the field - (',framedHeaderRecord.id,') at index', outputIndex)
        }        
      })
    })
    expect(verifyRecordStatus).toBe(true)
  })

  it('Verify whether the Master output file with first file records are shown when the two files are involved and one file has no records including headers', () => {
    //npm run test-dev --inputs=testData/users.csv,testData/users-empty.csv --outputFile=testData/output/merge_users-usersempty.csv
  })

  it('Verify whether the Master output file with first file records when the three files are involved and only one file has no valid records but still holds the valid header', () => {
    //npm run test-dev --inputs=testData/users.csv,testData/users-empty.csv,testData/all-users.csv --outputFile=testData/output/merge_users-usersempty-allusers.csv
  })

  it('Verify whether the output master file that concatenates all the records from the multiple input files has pipe delimiter', () => {
    //npm run test-dev --inputs=testData/pipe.csv,testData/all-pipe.csv --outputFile=testData/output/merge_pipe-delimiter.csv
  })

  it('Verify whether the number of records are correctly matched between the multiple input files and output master file.', () => {
    expect(frameRecordsData.length).toEqual(originalOutput.records.length)    
  })

  it('Verify whether the Headers are correctly displayed in the output master file.', async () => {
    if(framedOutputWithoutHeader){
      framedOutputWithHeader = await fileValidator.getDataRow(framedOutputFilePath);
    }
    let FramedMergedHeader = [].concat.apply([], framedOutputWithHeader.header);
    let OriginalMergedHeader = [].concat.apply([], originalOutput.header);
    let verifyHeaderStatus = true
    for(let i = 0; i < FramedMergedHeader.length; i++){
      try {
        expect(FramedMergedHeader[i]).toEqual(OriginalMergedHeader[i])
      } catch (err) {
        verifyHeaderStatus = false
        console.error('[',OriginalMergedHeader[i],'] - output header value doesn\'t match with the framed output header value - [',FramedMergedHeader[i],']')
      }  
    }
    expect(verifyHeaderStatus).toBe(true)        
  })

  it('"Verify whether the actual records are correctly generated with the file has valid headers, If the first row of the file is empty, subsequent rows of the file have valid records"', () => {
    //npm run test-dev --inputs=testData/users.csv,testData/users-first-row-empty.csv --outputFile=testData/output/merge_users-usersfirstrowempty.csv
  })
})
