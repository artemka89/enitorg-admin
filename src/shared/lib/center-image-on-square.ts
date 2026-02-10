export const centerImageOnSquare = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.src = url;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = Math.max(image.naturalWidth, image.naturalHeight);
      canvas.width = size;
      canvas.height = size;
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to get canvas context'));
        return;
      }
      const x = (size - image.naturalWidth) / 2;
      const y = (size - image.naturalHeight) / 2;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(image, x, y);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const newFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(newFile);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
          URL.revokeObjectURL(url);
        },
        file.type,
        1,
      );
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
  });
};
