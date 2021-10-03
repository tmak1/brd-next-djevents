import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiGalleryUploadLine } from 'react-icons/ri';

import Button from '../ui/Button';

function ImageUpload({ setImageFile, defaultVal = '' }) {
  const [image, setImage] = useState();
  const [hideBtn, setHideBtn] = useState(false);
  const [imagePreview, setImagePreview] = useState(defaultVal);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleCancel = () => {
    setHideBtn(false);
    setImagePreview(null);
    setImageFile(null);
  };

  useEffect(() => {
    let objectUrl;
    if (image) {
      objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);
    }
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  useEffect(() => {
    setImageFile(image);
  }, [imagePreview]);

  return (
    <div>
      {hideBtn ? (
        <div className="flex flex-col justify-start items-start gap-4 w-full">
          <input
            className="w-full cursor-pointer"
            type="file"
            onChange={handleChange}
          />
          <Button
            className="border-2 border-gray-300 bg-gray-200 px-2"
            widthXS={26}
            heightXS={10}
            width={40}
            bgColor="none"
            textColor="black"
            textSizeLG="sm"
            textSizeSM="xs"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          widthXS={36}
          heightXS={10}
          width={40}
          bgColor="gray-500"
          textColor="white"
          textSizeLG="sm"
          textSizeSM="xs"
          onClick={() => setHideBtn(true)}
        >
          <RiGalleryUploadLine className="inline mr-4" />
          <p className="inline whitespace-nowrap">Image Upload</p>
        </Button>
      )}
      <a
        className="flex justify-center items-center w-2/3 h-28 mt-5 border-2 border-gray-300 z-10 md:w-1/3"
        href={imagePreview || '/images/event-default.png'}
        target="_blank"
      >
        <div className="relative w-full h-full">
          <Image
            className=" baal relative z-0"
            src={imagePreview || '/images/event-default.png'}
            layout="fill"
            alt="event image"
          />
        </div>
      </a>
    </div>
  );
}

export default ImageUpload;
