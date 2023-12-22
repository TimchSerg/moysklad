import React from "react";

interface IProps {
  image: string;
}

export const ImageColumn: React.FC<IProps> = (props: IProps) => {
  const {image} = props;
  return (
    <img src={`/api/admin/files/${image}`} alt="" className="image-text"
        onError={(e: any) => e.target.src='https://3raza.com/images/3_.png'} 
    />
  );
};

export default ImageColumn;
