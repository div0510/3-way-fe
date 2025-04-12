// validationSchema.js
import * as yup from "yup";

const SUPPORTED_FORMATS = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

export const documentSchema = yup.object().shape({
  po: yup
    .mixed()
    .test("required", "PO file is required", (files) => {
      return files && files.length > 0;
    })
    .test("fileType", "Unsupported file format", (files) => {
      const file = files?.[0];
      return file && SUPPORTED_FORMATS.includes(file.type);
    }),

  invoice: yup
    .mixed()
    .test("required", "Invoice file is required", (files) => {
      return files && files.length > 0;
    })
    .test("fileType", "Unsupported file format", (files) => {
      const file = files?.[0];
      return file && SUPPORTED_FORMATS.includes(file.type);
    }),

  grn: yup
    .mixed()
    .test("required", "GRN file is required", (files) => {
      return files && files.length > 0;
    })
    .test("fileType", "Unsupported file format", (files) => {
      const file = files?.[0];
      return file && SUPPORTED_FORMATS.includes(file.type);
    }),
});