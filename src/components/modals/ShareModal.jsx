import React from "react";
import { RxCross2 } from "react-icons/rx";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareModal = ({ link, setShareModal, setShowModal }) => {
  function handleModal() {
    setShowModal(false);
    setShareModal(null);
  }
  const title="tweetbeat";
  return (
    <div onClick={handleModal} className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[400px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <div className="w-[95%] flex justify-between">
          <div className="mb-4">Share</div>
          <div className="text-2xl" onClick={handleModal}>
            <RxCross2 />
          </div>
        </div>

        <div className="flex justify-evenly ">
          <WhatsappShareButton url={link} title={title} separator=":: ">
            <WhatsappIcon className="w-[40px] h-[40px] rounded-full" />
          </WhatsappShareButton>

          <EmailShareButton url={link} title={title}>
            <EmailIcon className="w-[40px] h-[40px] rounded-full" />
          </EmailShareButton>

          <TelegramShareButton url={link} title={title}>
            <TelegramIcon className="w-[40px] h-[40px] rounded-full" />
          </TelegramShareButton>

          <FacebookShareButton url={link} title={title}>
            <FacebookIcon className="w-[40px] h-[40px] rounded-full" />
          </FacebookShareButton>

          <LinkedinShareButton url={link} title={title}>
            <LinkedinIcon className="w-[40px] h-[40px] rounded-full" />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
