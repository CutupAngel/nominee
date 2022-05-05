import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { toast } from 'react-toastify'
import axios from 'axios'
import Category from '../components/Category'
import SubmitModal from '../components/SubmitModal'
import { INominee } from '../types/INominee'
import { ICategory } from '../types/ICategory'

export interface SelectedNominee {
  [key: string]: INominee
}

const Home: NextPage = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [selectedNominee, setSelectedNominee] = useState<SelectedNominee>({})
  const [isOpen, setIsOpen] = useState(false)

  // get data from API and store to state
  useEffect(() => {
    const getCategoriesData = async () => {
      const response = await axios.get('api/ballots')
      if (response) setCategories(response.data.items)
    }
    getCategoriesData()
  }, [])

  // Update selected items
  const selectItems = (categoryId: string, nominee: INominee) => {
    const tNominees = { ...selectedNominee }
    tNominees[categoryId] = nominee
    setSelectedNominee({ ...tNominees })
  }

  // Handle submit items
  const submitItems = () => {
    // Include submit logic here
    console.log('Include submit logic here')
    if (!Object.keys(selectedNominee).length) {
      toast.warn('No nominees selected!')
      return
    }
    setIsOpen(true)
    toast.success('Submitted successfuly!')
  }

  // handle modal close
  const handleModalClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="min-h-screen py-0 px-4 bg-pg-bg">
      <Head>
        <title>Take Home Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-roboto">
        <div className="py-10 mmd:py-20 max-w-7xl mx-auto relative">
          <h1 className=" text-3xl mmd:text-5xl uppercase font-bold text-center text-white mb-6 mmd:mb-10">
            Awards 2021
          </h1>
          {categories.map((categoryData) => (
            <Category
              categoryData={categoryData}
              key={categoryData.id}
              selecteItems={selectItems}
            />
          ))}
          <button
            className="absolute bottom-5 right-0 text-white hover:text-black focus:text-black bg-nominee-selected-bg hover:bg-nominee-bg focus:bg-btn-focus-bg px-5 py-2 rounded transition-all"
            onClick={submitItems}
          >
            Submit ballot
          </button>
        </div>
      </main>
      {isOpen && (
        <SubmitModal
          isOpen={isOpen}
          selectedNominees={selectedNominee}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  )
}

export default Home