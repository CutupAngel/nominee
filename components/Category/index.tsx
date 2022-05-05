import React from 'react'
import Nominee from '../Nominee'
import { INominee } from '../../types/INominee'
import { ICategory } from '../../types/ICategory'

interface Props {
  categoryData: ICategory
  selecteItems: (categoryId: string, nominee: INominee) => void
}

const Category: React.FC<Props> = ({ categoryData, selecteItems }) => {
  return (
    <div className="mb-7 sm:mb-12">
      <h2 className="capitalize text-2xl mmd:text-3xl font-semibold bg-hover-color p-2 mb-5 mmd:mb-8">
        {categoryData.id}
      </h2>
      <div className="grid sm:grid-cols-2 mmd:grid-cols-3 gap-6">
        {categoryData.items &&
          categoryData.items.length &&
          categoryData.items.map((card) => (
            <Nominee
              nominee={card}
              key={card.id}
              categoryId={categoryData.id}
              selecteItems={selecteItems}
            />
          ))}
      </div>
    </div>
  )
}

export default Category
