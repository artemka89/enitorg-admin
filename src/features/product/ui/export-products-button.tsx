import { useState } from 'react';

import { privateConfig } from '@/shared/config';
import { API_ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';

export function ExportButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${privateConfig.VITE_STORAGE_API_URL}${API_ROUTES.products.export}`,
        {
          cache: 'no-store',
          method: 'GET',
          mode: 'cors',
          headers: {
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache',
          },
        },
      );

      if (!response.ok) throw new Error('Ошибка при выгрузке');

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = `products_${new Date().toISOString().split('T')[0]}.xlsx`;
      link.setAttribute('download', fileName);

      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('не удалось скачать файл');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isLoading} className="w-[150px]">
      {isLoading ? (
        <>
          <Spinner />
          <span>Готовим файл...</span>
        </>
      ) : (
        'Экспорт Excel'
      )}
    </Button>
  );
}
