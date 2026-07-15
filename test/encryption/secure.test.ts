import { encrypt, decrypt } from "../../utils/encryption/secure";

describe("encryption utils", () => {
  it("should encrypt and decrypt a string correctly", () => {
    const text = "Sensitive Data";
    const { data, iv, tag } = encrypt(text);
    expect(typeof data).toBe("string");
    expect(typeof iv).toBe("string");
    expect(typeof tag).toBe("string");

    const decrypted = decrypt({ data, iv, tag });
    expect(decrypted).toBe(text);
  });

  it("should throw if decrypting with wrong tag", () => {
    const text = "Sensitive Data";
    const { data, iv, tag } = encrypt(text);
    expect(() => decrypt({ data, iv, tag: "wrongtag" })).toThrow();
  });

  it("should throw if decrypting with wrong iv", () => {
    const text = "Sensitive Data";
    const { data, tag } = encrypt(text);
    expect(() => decrypt({ data, iv: "wrongiv", tag })).toThrow();
  });

  it("should handle empty strings", () => {
    const text = "";
    const { data, iv, tag } = encrypt(text);
    expect(typeof data).toBe("string");
    expect(typeof iv).toBe("string");
    expect(typeof tag).toBe("string");

    const decrypted = decrypt({ data, iv, tag });
    expect(decrypted).toBe(text);
  });

  it("should handle special characters", () => {
    const text = "Special Characters !@#$%^&*()_+";
    const { data, iv, tag } = encrypt(text);
    expect(typeof data).toBe("string");
    expect(typeof iv).toBe("string");
    expect(typeof tag).toBe("string");

    const decrypted = decrypt({ data, iv, tag });
    expect(decrypted).toBe(text);
  });
});

describe("patient data encryption", () => {
  // Mock patient data from the comment
  const mockPatientData = {
    Patient_First_Name: "John",
    Patient_Middle_Name: "Middle",
    Patient_Last_Name: "Walker",
    Gender: "M",
    Patient_Date_of_Birth: "12/31/2018",
    Patient_Phone_Number: "999-999-9999",
    Patient_Address: "120",
    City: "Athens",
    State: "AZ",
    Zip_Code: "98456",
    Patient_Notes: "This my patient note",
    Date_of_Service_Start: "2019-06-12T13:00:00Z",
    Date_of_Service_End: "2019-06-29T13:00:00Z",
    Transaction_ID: "DIPALIEBBULK28FEb2025-05",
    Appointment_Type: "New Patient",
    Appointment_Type_Code: "New Pt",
    Patient_Class: "E - Emergency",
    Provider_Code: "HD",
    Provider_Name: "7 Hills Department",
    Provider_NPI: "1982633566",
    Ordering_Physician_First_Name: "JANE",
    Ordering_Physician_Last_Name: "AANESTAD",
    Ordering_Physician_NPI: "1982633566",
    Ordering_Physician_Phone_Number: "2108599041",
    Ordering_Physician_Fax: "123456789",
    Ordering_Physician_TIN: "123456789",
    Ordering_Physician_External_ID: "10104",
    Ordering_Physician_Address: "5207 STORMY AUTUMN",
    Ordering_Physician_City: "Arizona",
    Ordering_Physician_State: "TX",
    Ordering_Physician_Zip: "78247",
    Ordering_Facility_Code: "HD",
    Ordering_Facility_Name: "7 Hills Department",
    Ordering_Facility_NPI: "1891925582",
    Ordering_Facility_Fax: "602-651-1945",
    Ordering_Facility_Contact: "987678987",
    Ordering_Facility_Address: "Facility Address",
    Ordering_Facility_City: "Athens",
    Ordering_Facility_State: "AZ",
    Ordering_Facility_Zip: "87896",
    Group_Number_1: "1234",
    Group_Name_1: "Group 1",
    Payer_Code_1: "W71CEJYF",
    Insurance_Name_1: "UHC",
    Insurance_Phone_1: "123-456-7890",
    Member_ID_1: "90987654",
    Network_Type_1: "General",
    Employer_Name_1: "Employer1",
    Mailing_Email_Address_1: "123 new line",
    Group_Number_2: "456",
    Group_Name_2: "Group 2",
    Payer_Code_2: "OYIAVXZ9",
    Insurance_Name_2: "Aetna",
    Insurance_Phone_2: "909-090-9090",
    Member_ID_2: "1111111",
    Network_Type_2: "General",
    Employer_Name_2: "Employer2",
    Mailing_Email_Address_2: "345 New Address",
    Group_Number_3: "456",
    Group_Name_3: "Group3",
    Payer_Code_3: "CWJOSLHN",
    Insurance_Name_3: "Humana",
    Insurance_Phone_3: "909-090-9090",
    Member_ID_3: "TYDH2345",
    Network_Type_3: "General",
    Employer_Name_3: "Employer3",
    Mailing_Email_Address_3: "Address",
    CPT_Code_1: "74177",
    Modifier_1: "LT",
    Body_Part_1: "Knee",
    Place_Of_Service_1: "Ambulatory Surgical Center",
    CPT_Description_1: "CT Abd & Pelvis W/ Contrast",
    Service_Type_1: "62",
    Test_Name_1: "Test1",
    Test_Code_1: "T1",
    CPT_Code_2: "74178",
    Modifier_2: "LT",
    Body_Part_2: "Knee",
    Place_Of_Service_2: "Ambulatory Surgical Center",
    CPT_Description_2: "MRI of Brain",
    Service_Type_2: "62",
    Test_Name_2: "Test2",
    Test_Code_2: "T2",
    CPT_Code_3: "74160",
    Modifier_3: "LT",
    Body_Part_3: "Knee",
    Place_Of_Service_3: "Ambulatory Surgical Center",
    CPT_Description_3: "MRI of Brain",
    Service_Type_3: "62",
    Test_Name_3: "Test3",
    Test_Code_3: "T3",
    ICD_Code_1: "R19.11",
    ICD_Description_1: "Desc",
    Custom_Field1: "Lorem ipsum dolor sit amet, consectetuer adipiscin",
    Custom_Field2: "Lorem ipsum dolor sit amet, consectetuer adipiscin",
    Product_Group_Id: "1",
    Product_Id: "2",
  };

  it("should encrypt and decrypt individual patient fields", () => {
    // Test sensitive fields individually
    const sensitiveFields = [
      "Patient_First_Name",
      "Patient_Last_Name",
      "Patient_Phone_Number",
      "Patient_Address",
      "Member_ID_1",
      "Member_ID_2",
      "Member_ID_3",
      "Ordering_Physician_NPI",
      "Provider_NPI",
    ];

    sensitiveFields.forEach((field) => {
      const value = mockPatientData[field as keyof typeof mockPatientData];
      const { data, iv, tag } = encrypt(value);

      expect(typeof data).toBe("string");
      expect(typeof iv).toBe("string");
      expect(typeof tag).toBe("string");
      expect(data.length).toBeGreaterThan(0);
      expect(iv.length).toBeGreaterThan(0);
      expect(tag.length).toBeGreaterThan(0);

      const decrypted = decrypt({ data, iv, tag });
      expect(decrypted).toBe(value);
    });
  });

  it("should encrypt and decrypt the entire patient object as JSON", () => {
    const patientJson = JSON.stringify(mockPatientData);
    const { data, iv, tag } = encrypt(patientJson);

    expect(typeof data).toBe("string");
    expect(typeof iv).toBe("string");
    expect(typeof tag).toBe("string");

    const decrypted = decrypt({ data, iv, tag });
    const decryptedPatient = JSON.parse(decrypted);

    expect(decryptedPatient).toEqual(mockPatientData);
  });

  it("should handle patient data with special characters and long text", () => {
    const longText = mockPatientData.Custom_Field1;
    const { data, iv, tag } = encrypt(longText);

    expect(typeof data).toBe("string");
    expect(typeof iv).toBe("string");
    expect(typeof tag).toBe("string");

    const decrypted = decrypt({ data, iv, tag });
    expect(decrypted).toBe(longText);
  });

  it("should handle patient phone numbers and IDs correctly", () => {
    const phoneNumbers = [
      mockPatientData.Patient_Phone_Number,
      mockPatientData.Insurance_Phone_1,
      mockPatientData.Insurance_Phone_2,
      mockPatientData.Insurance_Phone_3,
      mockPatientData.Ordering_Physician_Phone_Number,
      mockPatientData.Ordering_Facility_Fax,
    ];

    phoneNumbers.forEach((phone) => {
      const { data, iv, tag } = encrypt(phone);
      const decrypted = decrypt({ data, iv, tag });
      expect(decrypted).toBe(phone);
    });
  });

  it("should handle patient addresses and location data", () => {
    const addresses = [
      mockPatientData.Patient_Address,
      mockPatientData.City,
      mockPatientData.State,
      mockPatientData.Zip_Code,
      mockPatientData.Ordering_Physician_Address,
      mockPatientData.Ordering_Facility_Address,
    ];

    addresses.forEach((address) => {
      const { data, iv, tag } = encrypt(address);
      const decrypted = decrypt({ data, iv, tag });
      expect(decrypted).toBe(address);
    });
  });

  it("should handle medical codes and identifiers", () => {
    const codes = [
      mockPatientData.CPT_Code_1,
      mockPatientData.CPT_Code_2,
      mockPatientData.CPT_Code_3,
      mockPatientData.ICD_Code_1,
      mockPatientData.Provider_NPI,
      mockPatientData.Ordering_Physician_NPI,
      mockPatientData.Ordering_Facility_NPI,
    ];

    codes.forEach((code) => {
      const { data, iv, tag } = encrypt(code);
      const decrypted = decrypt({ data, iv, tag });
      expect(decrypted).toBe(code);
    });
  });

  it("should handle insurance information", () => {
    const insuranceData = [
      mockPatientData.Insurance_Name_1,
      mockPatientData.Insurance_Name_2,
      mockPatientData.Insurance_Name_3,
      mockPatientData.Member_ID_1,
      mockPatientData.Member_ID_2,
      mockPatientData.Member_ID_3,
      mockPatientData.Group_Number_1,
      mockPatientData.Group_Number_2,
      mockPatientData.Group_Number_3,
    ];

    insuranceData.forEach((insurance) => {
      const { data, iv, tag } = encrypt(insurance);
      const decrypted = decrypt({ data, iv, tag });
      expect(decrypted).toBe(insurance);
    });
  });

  it("should handle dates and timestamps", () => {
    const dates = [
      mockPatientData.Patient_Date_of_Birth,
      mockPatientData.Date_of_Service_Start,
      mockPatientData.Date_of_Service_End,
    ];

    dates.forEach((date) => {
      const { data, iv, tag } = encrypt(date);
      const decrypted = decrypt({ data, iv, tag });
      expect(decrypted).toBe(date);
    });
  });

  it("should maintain data integrity across multiple encryption/decryption cycles", () => {
    const patientJson = JSON.stringify(mockPatientData);

    // First encryption/decryption
    let { data, iv, tag } = encrypt(patientJson);
    let decrypted = decrypt({ data, iv, tag });
    let firstResult = JSON.parse(decrypted);

    // Second encryption/decryption
    ({ data, iv, tag } = encrypt(decrypted));
    decrypted = decrypt({ data, iv, tag });
    let secondResult = JSON.parse(decrypted);

    // Third encryption/decryption
    ({ data, iv, tag } = encrypt(decrypted));
    decrypted = decrypt({ data, iv, tag });
    let thirdResult = JSON.parse(decrypted);

    expect(firstResult).toEqual(mockPatientData);
    expect(secondResult).toEqual(mockPatientData);
    expect(thirdResult).toEqual(mockPatientData);
  });

  it("should handle empty and null values in patient data", () => {
    const patientWithEmptyFields = {
      ...mockPatientData,
      Patient_Middle_Name: "",
      Patient_Notes: "",
      Custom_Field1: "",
      Custom_Field2: "",
    };

    const patientJson = JSON.stringify(patientWithEmptyFields);
    const { data, iv, tag } = encrypt(patientJson);
    const decrypted = decrypt({ data, iv, tag });
    const decryptedPatient = JSON.parse(decrypted);

    expect(decryptedPatient).toEqual(patientWithEmptyFields);
  });

  it("should generate different encrypted data for same input (due to random IV)", () => {
    const text = mockPatientData.Patient_First_Name;

    const first = encrypt(text);
    const second = encrypt(text);
    const third = encrypt(text);

    // Data should be different due to random IV
    expect(first.data).not.toBe(second.data);
    expect(first.data).not.toBe(third.data);
    expect(second.data).not.toBe(third.data);

    // IV should be different
    expect(first.iv).not.toBe(second.iv);
    expect(first.iv).not.toBe(third.iv);
    expect(second.iv).not.toBe(third.iv);

    // Tag should be different
    expect(first.tag).not.toBe(second.tag);
    expect(first.tag).not.toBe(third.tag);
    expect(second.tag).not.toBe(third.tag);

    // But all should decrypt to the same value
    expect(decrypt(first)).toBe(text);
    expect(decrypt(second)).toBe(text);
    expect(decrypt(third)).toBe(text);
  });
});
