import { useUploadProductImage } from '../model/use-upload-product-image';

import { ImageCropperModal } from './image-cropper-modal';

const MAX_IMAGES = 5;

interface ImageUploadFieldProps {
  imageUrls: string[];
  fileName: string;
  onImagesChange: (urls: string[]) => void;
  disabled?: boolean;
  isCodeFilled?: boolean;
}

export function ImageUploadField({
  imageUrls,
  fileName,
  onImagesChange,
  disabled,
}: ImageUploadFieldProps) {
  const { mutate, isPending } = useUploadProductImage();

  const handleAddImageUrl = (url: string) => {
    if (imageUrls.length > MAX_IMAGES) {
      return;
    }

    const validExtensions = ['.jpg', '.jpeg', '.webp'];
    const hasValidExtension = validExtensions.some((ext) => url.endsWith(ext));

    if (!hasValidExtension) {
      return;
    }

    const imageUrl = url.trim();
    if (url && !imageUrls.includes(imageUrl)) {
      onImagesChange([...imageUrls, imageUrl]);
    }
  };

  const handleUploadImage = (file: File) => {
    mutate(file, { onSuccess: (url) => handleAddImageUrl(url) });
  };

  return (
    <div className="space-y-4">
      <ImageCropperModal
        onCrop={handleUploadImage}
        fileName={fileName}
        disabled={disabled || isPending || imageUrls.length >= MAX_IMAGES}
      />
    </div>
  );
}
