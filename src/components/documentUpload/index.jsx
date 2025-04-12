import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { documentSchema } from "./validationSchema";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

export const DocumentUpload = ({setData,setLoading}) => {

  const renderPreview = (file) => {
    if (!file) return null;

    if (file.type === "application/pdf") {
      return (
        <iframe
          src={URL.createObjectURL(file)}
          title="PDF Preview"
          className="w-full object-fill h-[550px]  mt-4 border rounded-md"
        />
      );
    } else {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="Document Preview"
          className="w-full  h-[550px]  object-contain mt-4 rounded-md border"
        />
      );
    }
  };


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(documentSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("po", data.po[0]);
    formData.append("invoice", data.invoice[0]);
    formData.append("grn", data.grn[0]);

   console.log("formData", formData)

   const uploadDocuments= async (formData)=>{
      try{
        setLoading(true)
              const response= await axios.post('http://localhost:8000/upload-docs', formData,{
                headers:{
                    "Content-Type": "multipart/form-data",
                }
              });
              toast.success("Documents uploaded successfully!");
              setData(response.data)
              console.log("Success:", response.data);
              setLoading(false)
      } catch (err) {
        setLoading(false)
        toast.error("unable to generate the response!!");
        console.error("Upload error:", err);
      }
   }

   uploadDocuments(formData);
  };



  const onError = (errors) => {
    const isMissingFile =
      errors.po?.message?.includes("required") ||
      errors.invoice?.message?.includes("required") ||
      errors.grn?.message?.includes("required");
  
    const isWrongFormat =
      errors.po?.message?.includes("Unsupported") ||
      errors.invoice?.message?.includes("Unsupported") ||
      errors.grn?.message?.includes("Unsupported");
  
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
    <form onSubmit={handleSubmit(onSubmit,onError)} >
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

      {/* PO Document */}
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">PO Document</h2>
        <input
          type="file"
          {...register("po")}
       
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
           {errors.po && <p className="text-red-600 text-sm mt-1">{errors.po.message}</p>}
        {renderPreview(poFile)}
      </div>

      {/* Invoice Document */}
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Invoice Document</h2>
        <input
          type="file"
          {...register("invoice")}
    
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
           {errors.invoice && <p className="text-red-600 text-sm mt-1">{errors.invoice.message}</p>}
           
        {renderPreview(invoiceFile)}
      </div>

      {/* GRN Document */}
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">GRN Document</h2>
        <input
          type="file"
          {...register("grn")}
    
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
           {errors.grn && <p className="text-red-600 text-sm mt-1">{errors.grn.message}</p>}
         
        {renderPreview(grnFile)}
      </div>
   
    </div>
    <div className="mx-auto w-[100%] text-center">
          <button
            className="bg-blue-600 text-white  md:text-[24px] sm-text-[20px] text-[15px] px-8 py-3 w-[60%] md:w-[40%] rounded-lg hover:bg-blue-700 transition duration-200"
            type="submit"
          >
            🔍 Start Matching
          </button>
        </div>

    </form>
  );
};