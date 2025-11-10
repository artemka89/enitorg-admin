import { useState } from 'react';
import { Link, Plus } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { useUploadProductImage } from '../model/use-upload-product-image';

import { ImageCropperModal } from './image-cropper-modal';

const MAX_IMAGES = 5;

interface ImageUploadFieldProps {
  imageUrls: string[];
  fileName: string;
  onImagesChange: (urls: string[]) => void;
  disabled?: boolean;
}

export function ImageUploadField({
  imageUrls,
  fileName,
  onImagesChange,
  disabled,
}: ImageUploadFieldProps) {
  const [newImageUrl, setNewImageUrl] = useState('');

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
      setNewImageUrl('');
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
        buttonTrigger={
          <Button
            type="button"
            disabled={disabled || isPending || imageUrls.length >= MAX_IMAGES}
          >
            <Plus className="h-4 w-4" />
            Загрузить изображение
          </Button>
        }
      />

      <div className="flex gap-2">
        <div className="bg-primary text-background flex items-center gap-2 rounded-md px-4">
          <Link className="h-4 w-4" />
          URL
        </div>

        <div className="flex flex-1 gap-2">
          <Input
            placeholder="https://example.com/image.jpg"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && handleAddImageUrl(e.currentTarget.value)
            }
            type="text"
          />
          <Button
            type="button"
            onClick={() => handleAddImageUrl(newImageUrl)}
            disabled={!newImageUrl.trim() || imageUrls.length >= MAX_IMAGES}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
