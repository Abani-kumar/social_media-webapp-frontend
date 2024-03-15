import React from "react";

const MessageCard = ({ sent, content, time }) => {
  return (
    <>
      <div>
        <div className="flex-1 overflow-auto">
          <div className="py-2 px-3">
            <div className={`flex mb-2 ${sent === "me"?"justify-end" :""}`}>
              <div
                className={`rounded py-1 px-4 ${
                  sent === "me" ? "bg-richblue-1000" : "bg-richblue-1100"
                } `}
              >
                <p className="text-sm mt-1 text-black">{content}</p>
                <p className="text-right text-xs text-richblack-500 mt-1 ml-8">
                  {time}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageCard;
