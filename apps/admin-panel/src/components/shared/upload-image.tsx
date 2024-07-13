import { useRef, useState } from 'react';
import { IKUpload } from 'imagekitio-react';
import { IKUploadProps } from 'imagekitio-react/dist/types/components/IKUpload/props';
import { Upload } from 'lucide-react';
import { LoadingSpinner } from '../ui/spinner';

function UploadImage(props: IKUploadProps) {
  const { onSuccess, onError, onUploadStart, onUploadProgress } = props;
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (ref.current) {
      const files = e.dataTransfer.files;
      if (files.length) {
        ref.current.files = files;
        ref.current.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  return (
    <>
      <IKUpload
        ref={ref}
        draggable
        accept="image/*,.heic,.heif"
        hidden
        disabled={uploading}
        {...props}
        onSuccess={(e) => {
          setUploading(false);
          onSuccess?.(e);
        }}
        onUploadStart={(e) => {
          setUploading(true);
          onUploadStart?.(e);
        }}
        onUploadProgress={(e) => {
          onUploadProgress?.(e);
        }}
        onError={(e) => {
          setUploading(false);
          onError?.(e);
        }}
      />
      <div
        onClick={() => ref.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex aspect-square w-full items-center justify-center rounded-md border border-dashed ${
          dragging ? 'border-blue-600' : ''
        }`}
        style={{ cursor: uploading ? 'not-allowed' : 'pointer' }}
      >
        {uploading ? (
          <LoadingSpinner />
        ) : (
          <Upload className="h-8 w-8 text-muted-foreground" />
        )}
        <span className="sr-only">Upload</span>
      </div>
    </>
  );
}

export default UploadImage;
