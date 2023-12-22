import React from 'react';

import styles from './styles.module.css';
import { Checkbox } from 'primereact/checkbox';

interface IProps {
  categories: Array<any>;
  currentCategories: Array<string>;
  mergeCategories: Array<string>;
  className?: string;
}

export const MergeCategories: React.FC<IProps> = (props: IProps) => {
  let { 
    categories, 
    currentCategories, 
    mergeCategories, 
    className = "flex flex-column col-12" 
  } = props

  const renderCategories = categories.map((category: any, index: number) => {
    const indexMerged = currentCategories.map( (i: any ) => i.id ).indexOf(category.id);
    
    return (
      <div className="p-field-checkbox p-col-4 p-mb-0" key={category.id}>
        <Checkbox inputId={category.id} name="city" value={category.id} checked={indexMerged !== -1} />
        <label htmlFor={category.id}>{category.name}</label>
      </div>
    )
  })

  const renderNewCategories = categories.map((category: any, index: number) => {
    const indexMerged = !mergeCategories ? -1 : mergeCategories.indexOf(category.id);

    return (
      <div className="p-field-checkbox p-col-4 p-mb-0" key={category.id}>
        <Checkbox inputId={category.id} name="city" value={category.id} checked={indexMerged !== -1} />
        <label htmlFor={category.id}>{category.name}</label>
      </div>
    )
  });

  return (
    <div className={className + ' ' + styles.merge}>
      <div className="col-12 md:col-6 pl-0">
        <span className="col-12 pl-0">Старое значение: </span>
        <div 
          style={{ border: "1px solid #7a7a7a4a", backgroundColor: "#f5f5f5"}}
          className="flex flex-wrap"
        >
          {renderCategories}
        </div>
      </div>
      <div className="col-12 md:col-6 p-pr-0">
        <span className="col-12 pl-0">Новое значение: </span>
        <div 
          style={{ border: "1px solid #7a7a7a4a", backgroundColor: "#f5f5f5"}}
          className="flex flex-wrap"
        >
          {renderNewCategories}
        </div>
      </div>
    </div>
  );
}