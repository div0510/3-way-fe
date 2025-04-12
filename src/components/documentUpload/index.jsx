import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {documentSchema} from "./validationSchema";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";

// Reusable FileInput component
const FileInput = ({label, name, register, error, file}) => {
    const renderPreview = () => {
        if (!file) return null;
        const url = URL.createObjectURL(file);
        if (file.type === "application/pdf") {
            return (
                <iframe
                    src={url}
                    title={`${label} Preview`}
                    className="w-full object-fill h-[550px] mt-4 border rounded-md"
                />
            );
        } else {
            return (
                <img
                    src={url}
                    alt={`${label} Preview`}
                    className="w-full h-[550px] object-contain mt-4 rounded-md border"
                />
            );
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow-sm bg-white">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{label} Document</h2>
            <input
                type="file"
                {...register(name)}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
            {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
            {renderPreview()}
        </div>
    );
};

export const DocumentUpload = ({setData, setLoading}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(documentSchema),
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("po", data.po[0]);
        formData.append("invoice", data.invoice[0]);
        formData.append("grn", data.grn[0]);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8000/upload-docs', formData, {
                headers: {"Content-Type": "multipart/form-data"}
            });

            if (response?.data?.error) {
                toast.error(response.data.error);
            } else {
                toast.success("Documents uploaded successfully!");
                setData(response.data);
            }
        } catch (err) {
            toast.error("Unable to generate the response!!");
            console.error("Upload error:", err);
        } finally {
            setLoading(false);
        }
    };

    const onError = (errors) => {
        const isMissingFile = ["po", "invoice", "grn"].some(key =>
            errors[key]?.message?.includes("required")
        );
        const isWrongFormat = ["po", "invoice", "grn"].some(key =>
            errors[key]?.message?.includes("Unsupported")
        );

        if (isMissingFile) {
            toast.error("Please select all required documents!");
        } else if (isWrongFormat) {
            toast.error("Only PDF, JPG, and PNG files are supported!");
        }
    };

    const poFile = watch("po")?.[0];
    const invoiceFile = watch("invoice")?.[0];
    const grnFile = watch("grn")?.[0];

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                <FileInput
                    label="PO"
                    name="po"
                    register={register}
                    error={errors.po}
                    file={poFile}
                />
                <FileInput
                    label="Invoice"
                    name="invoice"
                    register={register}
                    error={errors.invoice}
                    file={invoiceFile}
                />
                <FileInput
                    label="GRN"
                    name="grn"
                    register={register}
                    error={errors.grn}
                    file={grnFile}
                />
            </div>

            <div className="mx-auto w-full text-center">
                <button
                    type="submit"
                    className="bg-blue-600 text-white md:text-[24px] sm-text-[20px] text-[15px] px-8 py-3 w-[60%] md:w-[40%] rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    🔍 Start Matching
                </button>
            </div>
        </form>
    );
};
