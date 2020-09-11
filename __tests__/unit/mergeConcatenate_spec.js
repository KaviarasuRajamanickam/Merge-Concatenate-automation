/* eslint-disable no-undef */
const fileValidator = require('../../controllers/file-validation')
let framedOutputFilePath = 'testData/merge-concatenate/output/concat-output.csv'
let inputFile = ['testData/merge-concatenate/all-users.csv','testData/merge-concatenate/users.csv']
let inputEmptyFile = ['testData/merge-concatenate/users.csv','testData/merge-concatenate/users-empty.csv']
let inputPipeDelimiterFile = ['testData/merge-concatenate/pipe.csv','testData/merge-concatenate/all-pipe.csv']
let inputFirstRowEmptyFile = ['testData/merge-concatenate/users.csv','testData/merge-concatenate/users-first-row-empty.csv']
let originalOutputFilePath = 'testData/merge-concatenate/output/merge_users-allusers.csv'
let originalEmptyOutputFilePath = 'testData/merge-concatenate/output/merge_users-usersempty.csv'
let originalPipeDelimiterOutputFilePath = 'testData/merge-concatenate/output/merge_pipe-delimiter.csv'
let originalFirstRowEmptyOutputFilePath = 'testData/merge-concatenate/output/merge_users-usersfirstrowempty.csv'

describe('To assert the datas present in multiple files are concatenated into a single file', () => {
  beforeAll(async () => {
    inputFrameDatas = await fileValidator.mergeFrameDatas(inputFile, framedOutputFilePath, originalOutputFilePath)
  })

  it('Verify whether the multiple files are merged together when the input files have the same column values and sequence', () => {
    let verifyRecordStatus = true
    inputFrameDatas.originalOutput.records.forEach(function (outputRecord, outputIndex) {
      inputFrameDatas.framedInputHeaderData.forEach(function (framedHeaderRecord) {
        try {
          expect(outputRecord[framedHeaderRecord.id]).toEqual(inputFrameDatas.framedOutputWithoutHeader[outputIndex][framedHeaderRecord.id])
        } catch (err) {
          verifyRecordStatus = false
          console.error('[',outputRecord[framedHeaderRecord.id],'] - output value doesn\'t match with the framed output value - [',inputFrameDatas.framedOutputWithoutHeader[outputIndex][framedHeaderRecord.id],'] for the field - (',framedHeaderRecord.id,') at index', outputIndex)
        }        
      })
    })
    expect(verifyRecordStatus).toBe(true)
  })

  it('Verify whether the number of records are correctly matched between the multiple input files and output master file.', () => {
    expect(inputFrameDatas.framedInputRecordData.length).toEqual(inputFrameDatas.originalOutput.records.length)    
  })

  it('Verify whether the Headers are correctly displayed in the output master file.', async () => {
    if(inputFrameDatas.framedOutputWithoutHeader){
      framedOutputWithHeader = await fileValidator.getDataRow(framedOutputFilePath);
    }
    let FramedMergedHeader = [].concat.apply([], framedOutputWithHeader.header);
    let OriginalMergedHeader = [].concat.apply([], inputFrameDatas.originalOutput.header);
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
})

describe('To assert the master output file is generated if one of the file is empty', () => {
  beforeAll(async () => {
    inputFrameDatas = await fileValidator.mergeFrameDatas(inputEmptyFile, framedOutputFilePath, originalEmptyOutputFilePath)
  })

  it('Verify whether the multiple files are merged together when the input files have the same column values and sequence', () => {
    let verifyRecordStatus = true
    inputFrameDatas.originalOutput.records.forEach(function (outputRecord, outputIndex) {
      inputFrameDatas.framedInputHeaderData.forEach(function (framedHeaderRecord) {
        try {
          expect(outputRecord[framedHeaderRecord.id]).toEqual(inputFrameDatas.framedOutputWithoutHeader[outputIndex][framedHeaderRecord.id])
        } catch (err) {
          verifyRecordStatus = false
          console.error('[',outputRecord[framedHeaderRecord.id],'] - output value doesn\'t match with the framed output value - [',inputFrameDatas.framedOutputWithoutHeader[outputIndex][framedHeaderRecord.id],'] for the field - (',framedHeaderRecord.id,') at index', outputIndex)
        }        
      })
    })
    expect(verifyRecordStatus).toBe(true)
  })

  it('Verify whether the number of records are correctly matched between the multiple input files and output master file.', () => {
    expect(inputFrameDatas.framedInputRecordData.length).toEqual(inputFrameDatas.originalOutput.records.length)    
  })

  it('Verify whether the Headers are correctly displayed in the output master file.', async () => {
    if(inputFrameDatas.framedOutputWithoutHeader){
      framedOutputWithHeader = await fileValidator.getDataRow(framedOutputFilePath);
    }
    let FramedMergedHeader = [].concat.apply([], framedOutputWithHeader.header);
    let OriginalMergedHeader = [].concat.apply([], inputFrameDatas.originalOutput.header);
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
})

describe('To assert the master output file is generated if the input files are pipe delimeter', () => {
  beforeAll(async () => {
    inputFrameDatas = await fileValidator.mergeFrameDatas(inputPipeDelimiterFile, framedOutputFilePath, originalPipeDelimiterOutputFilePath)
  })

  it('Verify whether the multiple files are merged together when the input files have the same column values and sequence', () => {
    let verifyRecordStatus = true
    inputFrameDatas.originalOutput.records.forEach(function (outputRecord, outputIndex) {
      inputFrameDatas.framedInputHeaderData.forEach(function (framedHeaderRecord) {
        try {
          expect(outputRecord[framedHeaderRecord.id]).toEqual(inputFrameDatas.framedOutputWithoutHeader[outputIndex][framedHeaderRecord.id])
        } catch (err) {
          verifyRecordStatus = false
          console.error('[',outputRecord[framedHeaderRecord.id],'] - output value doesn\'t match with the framed output value - [',inputFrameDatas.framedOutputWithoutHeader[outputIndex][framedHeaderRecord.id],'] for the field - (',framedHeaderRecord.id,') at index', outputIndex)
        }        
      })
    })
    expect(verifyRecordStatus).toBe(true)
  })

  it('Verify whether the number of records are correctly matched between the multiple input files and output master file.', () => {
    expect(inputFrameDatas.framedInputRecordData.length).toEqual(inputFrameDatas.originalOutput.records.length)    
  })

  it('Verify whether the Headers are correctly displayed in the output master file.', async () => {
    if(inputFrameDatas.framedOutputWithoutHeader){
      framedOutputWithHeader = await fileValidator.getDataRow(framedOutputFilePath);
    }
    let FramedMergedHeader = [].concat.apply([], framedOutputWithHeader.header);
    let OriginalMergedHeader = [].concat.apply([], inputFrameDatas.originalOutput.header);
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
})

describe('To assert the master output file is generated if the one of the input file has first row empty', () => {
  beforeAll(async () => {
    inputFrameDatas = await fileValidator.mergeFrameDatas(inputFirstRowEmptyFile, framedOutputFilePath, originalFirstRowEmptyOutputFilePath)
  })

  it('Verify whether the multiple files are merged together when the input files have the same column values and sequence', () => {
    let verifyRecordStatus = true
    inputFrameDatas.originalOutput.records.forEach(function (outputRecord, outputIndex) {
      inputFrameDatas.framedInputHeaderData.forEach(function (framedHeaderRecord) {
        try {
          expect(outputRecord[framedHeaderRecord.id]).toEqual(inputFrameDatas.framedOutputWithoutHeader[outputIndex][framedHeaderRecord.id])
        } catch (err) {
          verifyRecordStatus = false
          console.error('[',outputRecord[framedHeaderRecord.id],'] - output value doesn\'t match with the framed output value - [',inputFrameDatas.framedOutputWithoutHeader[outputIndex][framedHeaderRecord.id],'] for the field - (',framedHeaderRecord.id,') at index', outputIndex)
        }        
      })
    })
    expect(verifyRecordStatus).toBe(true)
  })

  it('Verify whether the number of records are correctly matched between the multiple input files and output master file.', () => {
    expect(inputFrameDatas.framedInputRecordData.length).toEqual(inputFrameDatas.originalOutput.records.length)    
  })

  it('Verify whether the Headers are correctly displayed in the output master file.', async () => {
    if(inputFrameDatas.framedOutputWithoutHeader){
      framedOutputWithHeader = await fileValidator.getDataRow(framedOutputFilePath);
    }
    let FramedMergedHeader = [].concat.apply([], framedOutputWithHeader.header);
    let OriginalMergedHeader = [].concat.apply([], inputFrameDatas.originalOutput.header);
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
})

