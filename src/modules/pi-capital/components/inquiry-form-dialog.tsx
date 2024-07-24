import Button from "components/button/button";
import type { FormEvent } from "react";
import { useState } from "react";
import { cn } from "utils";
import type { InquiryBodyType } from "../api/inquiry";
import { toast } from "hooks/use-toast";
import FileUploader from "./file-uploader";
import { useCollabsInquiryMutation } from "modules/collabs/inquiry-collabs";
import { useInquiryQuestion } from "modules/collabs/inquiry-questions";

type Props = {
  app: string;
  showDialog: boolean;
  handleClose: () => void;
};
const InquiryFormDialog = ({ app, showDialog, handleClose }: Props) => {
  const initState: InquiryBodyType = {
    notes: "",
    file: null,
    app: app,
    answer: [],
    is_collabs: true,
  };
  const [step, setStep] = useState([1]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [answer, setAnswer] = useState<any>([]);
  const [formData, setFormData] = useState<InquiryBodyType>(initState);
  const post = useCollabsInquiryMutation();
  const { data } = useInquiryQuestion();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    post
      .mutateAsync({ ...formData, answer })
      .then(() => {
        toast({
          title: "Inquiry berhasil!",
        });
        onClose();
      })
      .catch(() => {
        toast({
          title: "Inquiry gagal!",
        });
      });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onClose = () => {
    setFormData({ ...initState });
    setStep([1]);
    setAnswer([]);
    handleClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50",
        {
          hidden: !showDialog,
        }
      )}
    >
      <div className="z-10 w-[90%] rounded-md bg-white animate-in zoom-in-90 xl:max-w-xl">
        <div className="flex items-center p-6">
          <h2 className="border-r-2 pr-2 text-lg font-semibold">Inquiry</h2>
          <div className="flex-1 pl-2 text-sm">Step {step.length} of 3</div>
          <img
            onClick={onClose}
            src="/assets/icon/close-dialog.svg"
            alt=""
            className="h-8 w-8 cursor-pointer p-1"
          />
        </div>
        <div className="bg-pv-grey-light2">
          <div className="grid grid-cols-3">
            {step.map((_, key) => (
              <div key={key} className="h-1 bg-pv-blue-light" />
            ))}
          </div>
        </div>
        <div className={cn("p-6", step.length !== 1 && "hidden")}>
          <h2 className="mb-4 text-lg font-semibold">
            {data && data[0]?.question}
          </h2>
          {data &&
            data[0]?.answers.map((ans, key) => (
              <div
                className="mb-4 flex cursor-pointer items-center justify-start rounded-lg border-[1px] border-pv-blue-light px-4 py-2 hover:border-pv-blue-dark"
                key={key}
                onClick={() => {
                  answer[0] = { id_question: data[0]?.id, id_answer: ans.id };
                  setAnswer([...answer]);
                }}
              >
                <img
                  src={
                    answer[0] && answer[0].id_answer === ans.id
                      ? "/assets/icon/radio-checked.svg"
                      : "/assets/icon/radio.svg"
                  }
                  className="mr-3"
                  alt=""
                />
                <div className="mb-1">{ans.answer}</div>
              </div>
            ))}
          <div className="flex justify-end">
            <Button
              onClick={() => {
                step.push(2);
                setStep([...step]);
              }}
              className="font-normal"
            >
              Next
            </Button>
          </div>
        </div>
        <div className={cn("p-6", step.length !== 2 && "hidden")}>
          <h2 className="mb-4 text-lg font-semibold">
            {data && data[1]?.question}
          </h2>
          {data &&
            data[1]?.answers.map((ans, key) => (
              <div
                className="mb-4 flex cursor-pointer items-center justify-start rounded-lg border-[1px] border-pv-blue-light px-4 py-2 hover:border-pv-blue-dark"
                key={key}
                onClick={() => {
                  answer[1] = { id_question: data[1]?.id, id_answer: ans.id };
                  setAnswer([...answer]);
                }}
              >
                <img
                  src={
                    answer[1] && answer[1].id_answer === ans.id
                      ? "/assets/icon/radio-checked.svg"
                      : "/assets/icon/radio.svg"
                  }
                  className="mr-3"
                  alt=""
                />
                <div className="mb-1">{ans.answer}</div>
              </div>
            ))}
          <div className="flex justify-end">
            <Button
              variant="outlined"
              onClick={() => {
                step.pop();
                setStep([...step]);
              }}
              className="mr-4 font-normal"
            >
              Back
            </Button>
            <Button
              onClick={() => setStep([...step, 2])}
              className="font-normal"
            >
              Next
            </Button>
          </div>
        </div>
        <div className={cn("p-6", step.length !== 3 && "hidden")}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <div className="pb-2">Tujuan Inquiry</div>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="h-[120px] w-full rounded-md border border-pv-grey-medium1 px-4 py-2 hover:border-pv-grey-medium2 focus:outline-none focus:ring-1"
                placeholder="Masukkan Tujuan Inquiry"
              />
              <div className="py-3 pt-6">File Pendukung</div>
              <FileUploader
                file={formData.file}
                onChange={function (file: File): void {
                  setFormData({ ...formData, file: file });
                }}
              />
            </div>
            <div className="mt-2 flex justify-end">
              <Button
                type="reset"
                variant="outlined"
                onClick={() => {
                  step.pop();
                  setStep([...step]);
                }}
                className="mr-4 font-normal"
              >
                Back
              </Button>
              <Button type="submit" className="mt-2">Inquiry</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryFormDialog;
