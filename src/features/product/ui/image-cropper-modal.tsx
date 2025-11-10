import type React from 'react';
import { type FC, useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { RotateCw, Upload } from 'lucide-react';

import {
  createCroppedImage,
  type CropArea,
} from '@/shared/lib/create-cropped-image';
import { selectFile } from '@/shared/lib/file';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface Point {
  x: number;
  y: number;
}

interface ImageCropperModalProps {
  buttonTrigger: React.ReactNode;
  onCrop: (file: File) => void;
  fileName: string;
}

export const ImageCropperModal: FC<ImageCropperModalProps> = ({
  buttonTrigger,
  onCrop,
  fileName,
}) => {
  const [image, setImage] = useState<File | null>(null);

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(
    null,
  );

  const imageSrc = image ? URL.createObjectURL(image) : '';

  const onCropComplete = useCallback(
    (_croppedArea: CropArea, croppedAreaPixels: CropArea) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleFileSelect = async () => {
    const file = await selectFile('image/*');
    setImage(file);
  };

  const handleCrop = async () => {
    if (!croppedAreaPixels || !image) return;

    try {
      const { file } = await createCroppedImage({
        imageFile: image,
        pixelCrop: croppedAreaPixels,
        rotation,
        imageFileName: fileName,
        cropWidth: 1890,
        cropHeight: 1890,
      });

      onCrop(file);
      setImage(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
      setCroppedAreaPixels(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <Dialog>
      {buttonTrigger && <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>}
      <DialogContent className="min-w-4xl" showCloseButton={false}>
        <DialogTitle>Загрузка изображения</DialogTitle>

        <div className="space-y-4">
          <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-100">
            {imageSrc ? (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                classes={{
                  cropAreaClassName: 'crop-area-grid',
                }}
              />
            ) : (
              <div className="flex h-96 w-full items-center justify-center text-2xl font-semibold">
                Выберите изображение
              </div>
            )}
          </div>

          <Button type="button" onClick={handleFileSelect} className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Выбрать изображение
          </Button>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="zoom">Масштаб: {zoom.toFixed(1)}</Label>
              <Input
                id="zoom"
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
                disabled={!imageSrc}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="rotation">Поворот: {rotation}°</Label>
              <Input
                id="rotation"
                type="range"
                value={rotation}
                min={0}
                max={360}
                step={1}
                onChange={(e) => setRotation(Number(e.target.value))}
                disabled={!imageSrc}
                className="mt-2"
              />
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleRotate}
                variant="outline"
                disabled={!imageSrc}
                className="w-full bg-transparent"
              >
                <RotateCw className="mr-2 h-4 w-4" />
                Повернуть на 90°
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleCrop} disabled={!imageSrc}>
              Загрузить
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => setImage(null)}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
