import React from 'react';
import { FileUpload } from 'primereact/fileupload';

interface IProps {
  myUploader?: (event: any) => void;
  onSelectFIle: (event: any) => void;
  label: string,
  currentImg?: string
}

const SingleUploadImage: React.FC<IProps> = (props: any) => {
  const { label, onSelectFIle, file, currentImg } = props

  const itemTemplate = (file: any, props: any) => {
    return (
      <div className="flex align-items-center flex-wrap p-0">
        <img alt={file.name} role="presentation" src={file.objectURL} style={{width: '100%'}}/>
      </div>
    )
  }
  
  const chooseOptions = 
    {icon: 'pi pi-fw pi-images', iconOnly: false, className: 'single-choose-btn p-button-rounded p-button-outlined', label: 'Загрузить'};
  const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};

  const headerTemplate = (options:any) => {
    const { className, chooseButton } = options;

    return (
      <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
        {chooseButton}
      </div>
    );
  }

  const emptyTemplate = () => {
    const template = (
      <div className="flex align-items-center p-dir-col">
        <span>{label}</span>
      </div>
    )

    const currentTemplate = (
      <div className="flex align-items-center flex-wrap p-0">
        <img 
          alt="Логотип" 
          role="presentation" 
          src={`/api/files/${currentImg}`} 
          style={{
            width: '170px',
            height: '170px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
      </div>
    )

    return !!currentImg && !file ? currentTemplate : template
  }

  return (
    <div className="galleria single-uploader">
      <FileUpload name="image" url="" onUpload={()=>{}} accept="image/*" maxFileSize={20000000} customUpload multiple={false}
        headerTemplate={headerTemplate} chooseOptions={chooseOptions} cancelOptions={cancelOptions} itemTemplate={itemTemplate} onSelect={ (e:any) => {
          if(e.files.length) onSelectFIle(e.files[0]);
        }} emptyTemplate={emptyTemplate}
      />
    </div>
  );
};


export default SingleUploadImage;