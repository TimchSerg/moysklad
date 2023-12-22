import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';

interface IProps {
  hashtags: Array<any>;
  mergeHashtags: Array<any>;
  className?: string;
}

export const MergeHashtags: React.FC<IProps> = (props: IProps) => {
  let { hashtags, mergeHashtags, className = "flex flex-column col-12" } = props

  const renderHashtags = hashtags.map((item: any, index: number) => {
    const indexMerged = mergeHashtags.map( i => i.id).indexOf(item.id);
    
    const mergeClassName = classNames('col-12 md:col-6 lg:col-4 p-xl-3', {
      [styles.old]: indexMerged === -1,
    });

    return (
      <div className={mergeClassName} key={index}>
        <span>{item.name}</span>
      </div>
    )
  })

  const newHashtags: any[] = [];
  mergeHashtags.forEach((item)=> {
    const index = hashtags.map( i => i.id).indexOf(item.id);
    if(index === -1) newHashtags.push(item)
  });

  const renderNewHashtags = newHashtags.map((item: any, index: number) => {
    const mergeClassName = classNames('col-12 md:col-6 lg:col-4 p-xl-3', {
      [styles.new]: true,
    });

    return (
      <div className={mergeClassName} key={index}>
        <span>{item.name}</span>
      </div>
    )
  });

  return (
    <div className={className + ' ' + styles.merge}>
      {renderHashtags}
      {renderNewHashtags}
    </div>
  );
}