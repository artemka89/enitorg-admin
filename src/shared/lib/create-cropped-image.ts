export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

function createImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const img = new Image();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
      img.onload = () => resolve(img);
      img.onerror = reject;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export async function createCroppedImage({
  imageFile,
  pixelCrop,
  imageFileName,
  cropWidth = 1024,
  cropHeight = 1024,
  backgroundColor = '#fff',
  rotation = 0,
  flip = { horizontal: false, vertical: false },
}: {
  imageFile: File;
  pixelCrop: CropArea;
  imageFileName?: string;
  cropWidth?: number;
  cropHeight?: number;
  backgroundColor?: string;
  rotation?: number;
  flip?: { horizontal: boolean; vertical: boolean };
}): Promise<{ url: string; file: File }> {
  const image = await createImageFromFile(imageFile);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const rotRad = getRadianAngle(rotation);

  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation,
  );

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');

  if (!croppedCtx) {
    throw new Error('No 2d context');
  }

  croppedCanvas.width = cropWidth;
  croppedCanvas.height = cropHeight;

  croppedCtx.fillStyle = backgroundColor;
  croppedCtx.fillRect(0, 0, cropWidth, cropHeight);

  const scaleX = cropWidth / pixelCrop.width;
  const scaleY = cropHeight / pixelCrop.height;
  const scale = Math.max(scaleX, scaleY);

  const scaledWidth = pixelCrop.width * scale;
  const scaledHeight = pixelCrop.height * scale;

  const offsetX = (cropWidth - scaledWidth) / 2;
  const offsetY = (cropHeight - scaledHeight) / 2;

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    offsetX,
    offsetY,
    scaledWidth,
    scaledHeight,
  );

  return new Promise((resolve) => {
    croppedCanvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const file = new File(
            [blob],
            `${imageFileName || imageFile.name}.webp`,
            {
              type: 'image/webp',
              lastModified: Date.now(),
            },
          );
          resolve({ url, file });
        }
      },
      'image/webp',
      0.9,
    );
  });
}
