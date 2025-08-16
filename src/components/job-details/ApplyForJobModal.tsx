"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

// components
import Modal from "@/components/shared/Modal";
import ResumeActions from "./ResumeActions";
import ResumeMissingPrompt from "./ResumeMissingPrompt";
import UploadResume from "./upload-resume/UploadResume";

// actions
import { checkIsResumeUploadedServerAction } from "@/actions/check-is-resume-uploaded-server-action";

// 3rd party
import { useQuery } from "@tanstack/react-query";
import { MdOutlineClose } from "react-icons/md";

interface ApplyForJobModalProps {
  userId: string;
  jobId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ApplyForJobModal({
  userId,
  jobId,
  isOpen,
  setIsOpen,
}: ApplyForJobModalProps) {
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string>();
  const modalRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["checkResumeUploaded", userId],
    queryFn: () => checkIsResumeUploadedServerAction(userId!),
    enabled: !!userId && isOpen,
  });

  useEffect(() => {
    if (data?.success) {
      setResumeUrl(data.data?.url);
    } else {
      setResumeUrl(undefined);
    }
  }, [data]);

  useEffect(() => {
    if (isOpen) setShowUploadResume(false);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} ref={modalRef}>
      {isLoading ? (
        <div className="">
          <div className="flex items-center justify-between mb-4">
            <p className="skeleton w-40 h-6 rounded" />
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              aria-label="Close apply panel"
              className="p-1 rounded hover:bg-muted"
            >
              <MdOutlineClose className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-col gap-3 border p-4 rounded">
            <p className="skeleton w-full h-6 rounded" />
            <p className="skeleton w-full h-6 rounded" />
            <p className="skeleton w-40 h-6 rounded" />
          </div>
        </div>
      ) : showUploadResume ? (
        <UploadResume
          isResumeUploaded={data?.success || false}
          setShowUploadResume={setShowUploadResume}
          userId={userId}
          refetch={refetch}
          setResumeUrl={setResumeUrl}
        />
      ) : data?.success ? (
        <ResumeActions
          userId={userId}
          jobId={jobId}
          resumeUrl={resumeUrl}
          setIsOpen={setIsOpen}
          setShowUploadResume={setShowUploadResume}
        />
      ) : (
        <ResumeMissingPrompt setShowUploadResume={setShowUploadResume} />
      )}
    </Modal>
  );
}
