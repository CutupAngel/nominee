import Image from 'next/image'
import { INominee } from '../../types/INominee'

interface Props {
  nominee: INominee
  key?: string
  selecteItems: (categoryId: string, card: INominee) => void
  categoryId: string
}

function Nominee({ nominee, selecteItems, categoryId }: Props) {
  return (
    <div className="group text-center bg-nominee-bg hover:bg-nominee-hover-bg rounded-xl p-5 transition-all hover:shadow-card-hv-shadow hover:scale-105">
      <h3 className="text-2xl font-bold mb-4 group-hover:text-white">
        {nominee.title}
      </h3>
      <div className="px-5 mb-4">
        <Image
          src={nominee.photoUrL}
          alt={nominee.title}
          width={300}
          height={420}
          layout="responsive"
        />
      </div>
      <button
        className="text-white hover:text-black focus:text-black bg-nominee-selected-bg hover:bg-nominee-bg focus:bg-btn-focus-bg px-5 py-2 rounded transition-all"
        onClick={() => selecteItems(categoryId, nominee)}
      >
        Select Nominee
      </button>
    </div>
  )
}

export default Nominee
