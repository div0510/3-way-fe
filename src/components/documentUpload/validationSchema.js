// validationSchema.js
import * as yup from "yup";

const SUPPORTED_FORMATS = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

const fileValidation = (fieldName) =>
    yup
        .mixed()
        .test("required", `${fieldName} file is required`, (files) => {
            return files && files.length > 0;
        })
        .test("fileType", "Unsupported file format", (files) => {
            const file = files?.[0];
            return file && SUPPORTED_FORMATS.includes(file.type);
        });

export const documentSchema = yup.object().shape({
    po: fileValidation("PO"),
    invoice: fileValidation("Invoice"),
    grn: fileValidation("GRN"),
});