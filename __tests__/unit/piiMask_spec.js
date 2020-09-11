/* eslint-disable no-undef */
const fileValidator = require('../../controllers/file-validation')
let userInfo, sectionInfo, relationshipInfo, enrollmentInfo, inputRecords, outputRecords

describe('To assert the datas present in the users file', () => {
  beforeAll(async () => {
    userInfo = await fileValidator.piimaskDataInfo('testData/piimask/users-input-file.csv', 'testData/piimask/output/users-output-file.csv')
    outputRecords = userInfo.outputData.records
    inputRecords = userInfo.inputData.records
  })

  it('Verify whether the family_name is displayed with "lname_1234" for all the rows.', () => {
    let familyNameStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.family_name === '' ? expect(currentRecord.family_name).toBe('') : expect(currentRecord.family_name).toBe(fileValidator.getUserAnonymizeInfo().family_name)
      } catch (err) {
        familyNameStatus = false
        console.error(currentRecord.family_name, ' - Family name is not shown correctly, Expected Family name should be ', fileValidator.getUserAnonymizeInfo().family_name)
      }
    })
    expect(familyNameStatus).toBe(true)
  })

  it('Verify whether the middle_name is displayed with "mname_1234" for all the rows.', () => {
    let middleNameStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.middle_name === '' ? expect(currentRecord.middle_name).toBe('') : expect(currentRecord.middle_name).toBe(fileValidator.getUserAnonymizeInfo().middle_name)
      } catch (err) {
        middleNameStatus = false
        console.error(currentRecord.middle_name, ' - Middle name is not shown correctly, Expected Middle name should be ', fileValidator.getUserAnonymizeInfo().middle_name)
      }
    })
    expect(middleNameStatus).toBe(true)
  })

  it('Verify whether the given_name is displayed with "fname_1234" for all the rows.', () => {
    let givenNameStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.given_name === '' ? expect(currentRecord.given_name).toBe('') : expect(currentRecord.given_name).toBe(fileValidator.getUserAnonymizeInfo().given_name)
      } catch (err) {
        givenNameStatus = false
        console.error(currentRecord.middle_name, ' - Given name is not shown correctly, Expected Given name should be ', fileValidator.getUserAnonymizeInfo().given_name)
      }
    })
    expect(givenNameStatus).toBe(true)
  })

  it('Verify whether the email is displayed with "success@simulator.amazonses.com" for all the rows.', () => {
    let emailStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.email === '' ? expect(currentRecord.email).toBe('') : expect(currentRecord.email).toBe(fileValidator.getUserAnonymizeInfo().email)
      } catch (err) {
        emailStatus = false
        console.error(currentRecord.email, ' - Email is not shown correctly, Expected Email should be ', fileValidator.getUserAnonymizeInfo().email)
      }
    })
    expect(emailStatus).toBe(true)
  })

  it('Verify whether the secondary_email is displayed with "success@simulator.amazonses.com" for all the rows.', () => {
    let secondaryEmailStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.secondary_email === '' ? expect(currentRecord.secondary_email).toBe('') : expect(currentRecord.secondary_email).toBe(fileValidator.getUserAnonymizeInfo().secondary_email)
      } catch (err) {
        secondaryEmailStatus = false
        console.error(currentRecord.secondary_email, ' - Secondary_email is not shown correctly, Expected Secondary_email should be ', fileValidator.getUserAnonymizeInfo().secondary_email)
      }
    })
    expect(secondaryEmailStatus).toBe(true)
  })

  it('Verify whether the student_id is displayed with "sid_1234" for all the rows.', () => {
    let studentIdStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.student_id === '' ? expect(currentRecord.student_id).toBe('') : expect(currentRecord.student_id).toBe(fileValidator.getUserAnonymizeInfo().student_id)
      } catch (err) {
        studentIdStatus = false
        console.error(currentRecord.student_id, ' - Student Id is not shown correctly, Expected Student Id should be ', fileValidator.getUserAnonymizeInfo().student_id)
      }
    })
    expect(studentIdStatus).toBe(true)
  })

  it('Verify whether the user_id is displayed with "u_1234" for all the rows.', () => {
    let userIdStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.user_id === '' ? expect(currentRecord.user_id).toBe('') : expect(currentRecord.user_id).toBe(fileValidator.getUserAnonymizeInfo().user_id)
      } catch (err) {
        userIdStatus = false
        console.error(currentRecord.user_id, ' - User Id is not shown correctly, Expected User Id should be ', fileValidator.getUserAnonymizeInfo().user_id)
      }
    })
    expect(userIdStatus).toBe(true)
  })

  it('Verify whether the birth_dt value is populated based on the random date range', () => {
    let birthDtStatus = true
    const minDate = fileValidator.getUserAnonymizeInfo().birth_dt.min_date
    const maxDate = fileValidator.getUserAnonymizeInfo().birth_dt.max_date
    outputRecords.forEach(function (currentRecord, index) {
      try {
        currentRecord.birth_dt === '' ? expect(currentRecord.birth_dt).toBe('') : expect(fileValidator.verifyDateInRange(minDate, maxDate, currentRecord.birth_dt, inputRecords[index].birth_dt)).toBeTruthy()
      } catch (err) {
        birthDtStatus = false
        console.error(currentRecord.birth_dt, ' Birth date is not in the available range for the integration ID - ', currentRecord.integration_id)
      }
    })
    expect(birthDtStatus).toBe(true)
  })

  it('Verify whether the birth_dt value is displayed in the format yyyy-mm-dd', () => {
    let birthDtFmtStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.birth_dt === '' ? expect(currentRecord.birth_dt).toBe('') : expect(fileValidator.verifyDateFormat(currentRecord.birth_dt)).toBeTruthy()
      } catch (err) {
        birthDtFmtStatus = false
        console.error(currentRecord.birth_dt, ' Birth date value is not displayed in the format yyyy-mm-dd for the integration ID - ', currentRecord.integration_id)
      }
    })
    expect(birthDtFmtStatus).toBe(true)
  })

  it('Verify whether the b_phone is displayed with "+17031234321" for all the rows.', () => {
    let bphoneStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.b_phone === '' ? expect(currentRecord.b_phone).toBe('') : expect(currentRecord.b_phone).toBe(fileValidator.getUserAnonymizeInfo().b_phone)
      } catch (err) {
        bphoneStatus = false
        console.error(currentRecord.b_phone, ' - b_phone is not shown correctly, Expected b_phone should be ', fileValidator.getUserAnonymizeInfo().b_phone)
      }
    })
    expect(bphoneStatus).toBe(true)
  })

  it('Verify whether the m_phone is displayed with "+17031234321" for all the rows that are pertained to "Students".', () => {
    let mphoneStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.m_phone === '' ? expect(currentRecord.m_phone).toBe('') : expect(currentRecord.m_phone).toBe(fileValidator.getUserAnonymizeInfo().m_phone)
      } catch (err) {
        mphoneStatus = false
        console.error(currentRecord.m_phone, ' - m_phone is not shown correctly, Expected m_phone should be ', fileValidator.getUserAnonymizeInfo().m_phone)
      }
    })
    expect(mphoneStatus).toBe(true)
  })

  it('Verify whether the gender,available_ind,assign_student_role,allow_login, and user_timezone column values are being correctly shown as per input User.txt file without anonymization', () => {
    let userFieldStatus = true
    const dataFields = fileValidator.getUserAnonymizeInfo().non_anonymize_fields
    outputRecords.forEach(function (currentRecord, outputIndex) {
      dataFields.forEach(function (currentField, index) {
        try {
          currentRecord[currentField] === '' ? expect(currentRecord[currentField]).toBe('') : expect(currentRecord[currentField]).toBe(inputRecords[outputIndex][currentField])
        } catch (err) {
          userFieldStatus = false
          console.error(dataFields[index] + ' - [' + inputRecords[outputIndex][currentField] + '] input value does not match with the output value [' + currentRecord[currentField] + ']')
        }
      })
    })
    expect(userFieldStatus).toBe(true)
  })

  it('Verify whether the home_city is displayed with "home_city_1234" for all the rows.', () => {
    let homeCityStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.home_city === '' ? expect(currentRecord.home_city).toBe('') : expect(currentRecord.home_city).toBe(fileValidator.getUserAnonymizeInfo().home_city)
      } catch (err) {
        homeCityStatus = false
        console.error(currentRecord.home_city, ' - home_city is not shown correctly, Expected Home City is ', fileValidator.getUserAnonymizeInfo().home_city)
      }
    })
    expect(homeCityStatus).toBe(true)
  })

  it('Verify whether the home_state is displayed with "home_state_1234" for all the rows.', () => {
    let homeStateStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.home_state === '' ? expect(currentRecord.home_state).toBe('') : expect(currentRecord.home_state).toBe(fileValidator.getUserAnonymizeInfo().home_state)
      } catch (err) {
        homeStateStatus = false
        console.error(currentRecord.home_state, ' - home_state is not shown correctly, Expected Home State is ', fileValidator.getUserAnonymizeInfo().home_state)
      }
    })
    expect(homeStateStatus).toBe(true)
  })

  it('Verify whether the home_zip is displayed with "home_zip_1234" for all the rows.', () => {
    let homeZipStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.home_zip === '' ? expect(currentRecord.home_zip).toBe('') : expect(currentRecord.home_zip).toBe(fileValidator.getUserAnonymizeInfo().home_zip)
      } catch (err) {
        homeZipStatus = false
        console.error(currentRecord.home_zip, ' - home_zip is not shown correctly, Expected Home Zip is ', fileValidator.getUserAnonymizeInfo().home_zip)
      }
    })
    expect(homeZipStatus).toBe(true)
  })

  it('Verify whether the home_county is displayed with "home_county_1234" for all the rows.', () => {
    let homeCountyStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.home_county === '' ? expect(currentRecord.home_county).toBe('') : expect(currentRecord.home_county).toBe(fileValidator.getUserAnonymizeInfo().home_county)
      } catch (err) {
        homeCountyStatus = false
        console.error(currentRecord.home_county, ' - home_county is not shown correctly, Expected Home County is ', fileValidator.getUserAnonymizeInfo().home_county)
      }
    })
    expect(homeCountyStatus).toBe(true)
  })

  it('Verify whether the max character value is correctly shown when the columns middle_name, home_city, home_state, and home_county are entered with max characters', () => {
    let maxCharStatus = true
    const dataFields = fileValidator.getUserAnonymizeInfo().max_characters_fields
    outputRecords.forEach(function (currentRecord) {
      dataFields.forEach(function (currentField) {
        try {
          currentRecord[currentField] === '' ? expect(currentRecord[currentField]).toBe('') : expect(currentRecord[currentField]).toBe(fileValidator.getUserAnonymizeInfo()[currentField])
        } catch (err) {
          maxCharStatus = false
          console.error(currentRecord[currentField] + ' - [' + currentField + '] is not shown correctly. expected value is [' + fileValidator.getUserAnonymizeInfo()[currentField] + ']')
        }
      })
    })
    expect(maxCharStatus).toBe(true)
  })

  /** Generic Validations **/
  it('Verify whether the number of records are correctly matched between the input file and output file.', () => {
    expect(outputRecords.length).toEqual(inputRecords.length)
  })

  it('Verify whether the Headers are correctly displayed in the output file.', () => {
    expect(userInfo.outputData.header[0]).toEqual(userInfo.inputData.header[0])
  })

  it('Verify that the output file column with empty value is correctly shown based on the empty value in the input file.', () => {
    let emptyColumnStatus = true
    const userFields = fileValidator.getUserAnonymizeInfo().anonymize_fields.concat(fileValidator.getUserAnonymizeInfo().non_anonymize_fields)
    inputRecords.forEach((currentRecord, index) => {
      userFields.forEach(currentField => {
        try {
          if (outputRecords[index][currentField] === '') {
            expect(outputRecords[index][currentField]).toBe('')
          }
        } catch (err) {
          emptyColumnStatus = false
          console.error(currentField + ' - [' + currentRecord[currentField] + '] input value does not match with the output value [' + outputRecords[index][currentField] + ']')
        }
      })
    })
    expect(emptyColumnStatus).toBe(true)
  })

  it('Verify that the file column with numeric value is correctly shown based on the numeric value present in the input file.', () => {
    let numericValStatus = true
    const dataFields = fileValidator.getUserAnonymizeInfo().non_anonymize_fields
    outputRecords.forEach(function (currentRecord, index) {
      dataFields.forEach(function (currentField, outputIndex) {
        try {
          currentRecord[currentField] === ''
            ? expect(currentRecord[currentField]).toBe('')
            : expect(currentRecord[currentField]).toBe(outputRecords[index][currentField])
        } catch (err) {
          numericValStatus = false
          console.error(dataFields[index] + ' - [' + inputRecords[outputIndex][currentField] + '] input numeric value does not match with the output numeric value [' + currentRecord[currentField] + ']')
        }
      })
    })
    expect(numericValStatus).toBe(true)
  })

  it('Verify that the file column with date value is correctly shown based on the date value present in the input file.', () => {
    let dateValueStatus = true
    const minDate = fileValidator.getUserAnonymizeInfo().birth_dt.min_date
    const maxDate = fileValidator.getUserAnonymizeInfo().birth_dt.max_date
    outputRecords.forEach(function (currentRecord, index) {
      try {
        currentRecord.birth_dt === '' ? expect(currentRecord.birth_dt).toBe('') : expect(fileValidator.verifyDateInRange(minDate, maxDate, currentRecord.birth_dt, inputRecords[index].birth_dt)).toBeTruthy()
      } catch (err) {
        dateValueStatus = false
        console.error(currentRecord.birth_dt, ' Date value not correctly shown based on the date value present in the input file')
      }
    })
    expect(dateValueStatus).toBe(true)
  })
})

describe('To assert the datas present in the sections file', () => {
  beforeAll(async () => {
    sectionInfo = await fileValidator.piimaskDataInfo('testData/piimask/sections-input-file.csv', 'testData/piimask/output/sections-output-file.csv')
    outputRecords = sectionInfo.outputData.records
    inputRecords = sectionInfo.inputData.records
  })

  it('Verify whether the integration_id, course_section_name, course_section_id, term_id, course_integration_id, start_dt, end_dt, course_section_delivery, maximum_enrollment_count, credit_hours, and registration_call_number column values are being correctly shown as per input file without anonymization.', () => {
    let sectionFieldStatus = true
    const dataFields = fileValidator.getSectionInfo().records
    inputRecords.forEach((currentRecord, index) => {
      dataFields.forEach(currentField => {
        try {
          currentRecord[currentField] === '' ? expect(outputRecords[index][currentField]).toBe('') : expect(outputRecords[index][currentField]).toBe(currentRecord[currentField])
        } catch (err) {
          sectionFieldStatus = false
          console.error(currentField + ' - [' + currentRecord[currentField] + '] input value does not match with the output value [' + outputRecords[index][currentField] + ']')
        }
      })
    })
    expect(sectionFieldStatus).toBe(true)
  })

  /** Generic Validations **/
  it('Verify whether the number of records are correctly matched between the input file and output file.', () => {
    expect(outputRecords.length).toEqual(inputRecords.length)
  })

  it('Verify whether the Headers are correctly displayed in the output file.', () => {
    expect(sectionInfo.inputData.header[0]).toEqual(sectionInfo.outputData.header[0])
  })

  it('Verify that the output file column with empty value is correctly shown based on the empty value in the input file.', () => {
    let emptyColumnStatus = true
    const dataFields = fileValidator.getSectionInfo().records
    inputRecords.forEach((currentRecord, index) => {
      dataFields.forEach(currentField => {
        try {
          if (currentRecord[currentField] === '') {
            expect(outputRecords[index][currentField]).toBe('')
          }
        } catch (err) {
          emptyColumnStatus = false
          console.error(currentField + ' - [' + currentRecord[currentField] + '] input value does not match with the output value [' + outputRecords[index][currentField] + ']')
        }
      })
    })
    expect(emptyColumnStatus).toBe(true)
  })

  it('Verify that the file column with date value is correctly shown based on the date value present in the input file.', () => {
    let dateValueStatus = true
    const dataFields = ['start_dt', 'end_dt']
    inputRecords.forEach((currentRecord, index) => {
      dataFields.forEach(currentField => {
        try {
          currentRecord[currentField] === '' ? expect(outputRecords[index][currentField]).toBe('') : expect(fileValidator.verifyDateFormat(outputRecords[index][currentField])).toBeTruthy()
        } catch (err) {
          dateValueStatus = false
          console.error(currentField + ' - [' + outputRecords[index][currentField] + '] output value does not displayed in the format yyyy-mm-dd [' + currentRecord[currentField] + ']')
        }
      })
    })
    expect(dateValueStatus).toBe(true)
  })
})

describe('To assert the datas present in the relationship file', () => {
  beforeAll(async () => {
    relationshipInfo = await fileValidator.piimaskDataInfo('testData/piimask/relationship-input-file.csv', 'testData/piimask/output/relationship-output-file.csv')
    inputRecords = relationshipInfo.inputData.records
    outputRecords = relationshipInfo.outputData.records
  })

  it('Verify whether the parent_role,child_role, and term_id column values are being correctly shown as per input file without anonymization.', () => {
    const dataFeilds = fileValidator.getRelationshipInfo().non_anonymize_fields
    let relationshipFieldStatus = true
    inputRecords.forEach(function (currentRecord, index) {
      dataFeilds.forEach(function (currentField) {
        try {
          currentRecord[currentField] === '' ? expect(outputRecords[index][currentField]).toBe('') : expect(currentRecord[currentField]).toBe(outputRecords[index][currentField])
        } catch {
          relationshipFieldStatus = false
          console.error('"' + currentRecord[currentField] + '" for the field [' + currentField + '] should not be "' + outputRecords[index][currentField] + '"')
        }
      })
    })
    expect(relationshipFieldStatus).toBe(true)
  })

  /** Generic Validations **/
  it('Verify whether the number of records are correctly matched between the input file and output file.', () => {
    expect(outputRecords.length).toEqual(inputRecords.length)
  })

  it('Verify whether the Headers are correctly displayed in the output file.', () => {
    expect(relationshipInfo.outputData.header[0]).toEqual(relationshipInfo.inputData.header[0])
  })

  it('Verify that the output file column with empty value is correctly shown based on the empty value in the input file.', () => {
    let emptyColumnStatus = true
    const dataFields = fileValidator.getRelationshipInfo().non_anonymize_fields
    inputRecords.forEach((currentRecord, index) => {
      dataFields.forEach(currentField => {
        try {
          if (currentRecord[currentField] === '') {
            expect(outputRecords[index][currentField]).toBe('')
          }
        } catch (err) {
          emptyColumnStatus = false
          console.error(currentField + ' - [' + currentRecord[currentField] + '] input value does not match with the output value [' + outputRecords[index][currentField] + ']')
        }
      })
    })
    expect(emptyColumnStatus).toBe(true)
  })

  it('Verify that the file column with numeric value is correctly shown based on the numeric value present in the input file.', () => {
    let numericValStatus = true
    const dataFeilds = fileValidator.getRelationshipInfo().non_anonymize_fields
    outputRecords.forEach(function (currentRecord, index) {
      dataFeilds.forEach(function (currentField) {
        try {
          currentRecord[currentField] === ''
            ? expect(currentRecord[currentField]).toBe('')
            : expect(currentRecord[currentField]).toBe(outputRecords[index][currentField])
        } catch (err) {
          numericValStatus = false
          console.error(dataFields[index] + ' - [' + inputRecords[outputIndex][currentField] + '] input numeric value does not match with the output numeric value [' + currentRecord[currentField] + ']')
        }
      })
    })
    expect(numericValStatus).toBe(true)
  })
})

describe('To assert the datas present in the enrollment file', () => {
  beforeAll(async () => {
    enrollmentInfo = await fileValidator.piimaskDataInfo('testData/piimask/enrollment-input-file.csv', 'testData/piimask/output/enrollment-output-file.csv')
    inputRecords = enrollmentInfo.inputData.records
    outputRecords = enrollmentInfo.outputData.records
  })

  it('Verify whether the course_section_integration_id, user_role, available_ind, credit_hours, last_access_date, and authoritative_status column values are being correctly shown as per input file without anonymization', () => {
    const dataFeilds = fileValidator.getEnrollmentInfo().non_anonymize_fields
    let enrollmentFieldStatus = true
    inputRecords.forEach(function (currentRecord, index) {
      dataFeilds.forEach(function (currentField) {
        try {
          currentRecord[currentField] === '' ? expect(outputRecords[index][currentField]).toBe('') : expect(currentRecord[currentField]).toBe(outputRecords[index][currentField])
        } catch {
          enrollmentFieldStatus = false
          console.error('"' + currentRecord[currentField] + '" for the field [' + currentField + '] should not be "' + outputRecords[index][currentField] + '"')
        }
      })
    })
    expect(enrollmentFieldStatus).toBe(true)
  })

  /** Generic Validations **/
  it('Verify whether the number of records are correctly matched between the input file and output file.', () => {
    expect(outputRecords.length).toEqual(inputRecords.length)
  })

  it('Verify whether the Headers are correctly displayed in the output file.', () => {
    expect(enrollmentInfo.inputData.header[0]).toEqual(enrollmentInfo.outputData.header[0])
  })

  it('Verify that the output file column with empty value is correctly shown based on the empty value in the input file.', () => {
    let emptyColumnStatus = true
    const dataFields = fileValidator.getEnrollmentInfo().non_anonymize_fields
    inputRecords.forEach((currentRecord, index) => {
      dataFields.forEach(currentField => {
        try {
          if (currentRecord[currentField] === '') {
            expect(outputRecords[index][currentField]).toBe('')
          }
        } catch (err) {
          emptyColumnStatus = false
          console.error(currentField + ' - [' + currentRecord[currentField] + '] input value does not match with the output value [' + outputRecords[index][currentField] + ']')
        }
      })
    })
    expect(emptyColumnStatus).toBe(true)
  })

  it('Verify that the file column with date value is correctly shown based on the date value present in the input file.', () => {
    let dateValueStatus = true
    outputRecords.forEach(function (currentRecord, index) {
      try {
        currentRecord.last_access_date === '' ? expect(currentRecord.last_access_date).toBe('') : expect(fileValidator.verifyTimestamp(currentRecord.last_access_date)).toBeTruthy()
      } catch (err) {
        dateValueStatus = false
        console.error('last_access_date - [' + currentRecord.last_access_date + '] output value does not displayed in the format yyyy-mm-dd hh:mm:ss [' + inputRecords[index].last_access_date + ']')
      }
    })
    expect(dateValueStatus).toBe(true)
  })
})