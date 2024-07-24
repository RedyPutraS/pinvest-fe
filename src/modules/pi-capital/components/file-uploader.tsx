import { useDropzone } from "react-dropzone";

type Props = {
  file: File | null;
  onChange: (file: File) => void;
  placeholder?: string;
};

const FileUploader = ({
  file,
  onChange,
  placeholder = "Pilih Atau Tarik File PDF,JPG,PNG,JPEG,XLSX",
}: Props) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onChange(acceptedFiles[0]);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
      "application/": [
        ".pdf",
        ".vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ".vnd.ms-excel",
      ],
    },
    onDrop,
  });
  return (
    <div
      {...getRootProps()}
      className="mx-1 flex items-center justify-center rounded-md border border-pv-grey-medium1 px-6 pt-5 pb-6 hover:border-pv-grey-medium2"
    >
      <input {...getInputProps()} />
      {file ? (
        <div className="text-center">
          <img
            className="mx-auto h-12 w-12"
            src={URL.createObjectURL(file)}
            alt="selected file"
          />
          <p className="mt-1 text-sm text-gray-600">{file.name}</p>
        </div>
      ) : (
        <div className="text-center">
          <img
            src="/assets/icon/upload-icon.svg"
            className="mx-auto h-12 w-[42px] text-gray-400"
            alt=""
          />
          <p className="mt-1 text-sm text-gray-600">{placeholder}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
