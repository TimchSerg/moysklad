import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';

export interface IGallery{
  link: string,
  title: string
}

interface IProps {
  gallery: Array<IGallery>;
  mergeGallery: Array<IGallery>;
  className?: string;
}

export const MergeGallery: React.FC<IProps> = (props: IProps) => {
  let { gallery, mergeGallery, className = "flex flex-column col-12" } = props

  const renderGallery = gallery.map((item: IGallery, index: number) => {
    const indexMerged = mergeGallery.map( i => i.link).indexOf(item.link);
    
    const mergeClassName = classNames('col-12 md:col-6 lg:col-4 p-xl-3', {
      [styles.old]: indexMerged === -1
    });

    return (
      <div className={mergeClassName} key={index}>
        <img src={`/api/files/${item.link}`} alt={item.title} style={{ width: "100%" }} />
      </div>
    )
  })

  const newGallery: IGallery[] = [];
  mergeGallery.forEach((item)=> {
    const index = gallery.map( i => i.link).indexOf(item.link);
    if(index === -1) newGallery.push(item)
  });

  const renderNewGallery = newGallery.map((item: IGallery, index: number) => {
    const mergeClassName = classNames('col-12 md:col-6 lg:col-4 p-xl-3', {
      [styles.new]: true,
    });

    return (
      <div className={mergeClassName} key={index}>
        <img src={`/api/files/${item.link}`} alt={item.title} style={{ width: "100%" }} />
      </div>
    )
  });

  return (
    <div className={className + ' ' + styles.merge}>
      {renderGallery}
      {renderNewGallery}
    </div>
  );
}