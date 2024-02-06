import React from "react";

const Hashtag = ({ tag1, tag2, tag3, tag4, tag5 }) => {
  return (
    <div className="relative z-50 border-[1px] border-white flex flex-col text-white w-full">
      <div className="ml-4 mt-3 mr-12 mb-4">
        <div className="font-bold"># Trending Hashtags</div>
        <ul className="flex text-pure-greys-100 hover:text-pure-greys-1000 cursor-pointer">
          <div>#</div>
          <li className="pl-2">{tag1}</li>
        </ul>
        <ul className="flex text-pure-greys-100 hover:text-pure-greys-1000 cursor-pointer">
          <div>#</div>
          <li className="pl-2">{tag2}</li>
        </ul>
        <ul className="flex  text-pure-greys-100 hover:text-pure-greys-1000 cursor-pointer">
          <div>#</div>
          <li className="pl-2">{tag3}</li>
        </ul>
        <ul className="flex text-pure-greys-100 hover:text-pure-greys-1000 cursor-pointer">
          <div>#</div>
          <li className="pl-2">{tag4}</li>
        </ul>
        <ul className="flex  text-pure-greys-100 hover:text-pure-greys-1000 cursor-pointer">
          <div>#</div>
          <li className="pl-2">{tag5}</li>
        </ul>
      </div>
    </div>
  );
};

export default Hashtag;
