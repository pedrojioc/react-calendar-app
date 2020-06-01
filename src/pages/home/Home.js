import React, { useState, useEffect } from 'react'

import styles from './styles.module.css'
import { months } from '../../constants/dates'
import Month from '../../components/Month'
import Categories from '../../components/Categories'
import CategoryForm from '../../components/CategoryForm'

function Home() {
  const [categories, setCategories] = useState([
    { name: 'Trabajo', color: '#61BD4F', id: 'Trabajo-#61BD4F' },
    { name: 'Vacaciones', color: '#0079BF', id: 'Vacaciones-#0079BF' }
  ])
  const colors = [
    '#61BD4F',
    '#FF9F1A',
    '#EB5A46',
    '#C377E0',
    '#0079BF',
    '#00C2E0'
  ]
  const YEAR = new Date().getFullYear()
  const [visible, setVisible] = useState(false)
  const [category, setCategory] = useState(null)
  const [markers, setMarkers] = useState({})
  // Marker Schema
  // I store the makers in an Object, each property of this Object it's a dayId
  // and the value of the property it's a array with all categories assigned
  const handleCloseForm = () => {
    setVisible(false)
  }
  const handleCreateCategory = (name, color, categoryId) => {
    setCategories([...categories, { name, color, id: categoryId }])
  }
  const handleOnDelete = (id) => {
    const newCategories = categories.filter((category) => category.id !== id)
    console.log(newCategories)
    console.log(id)
    setCategories(newCategories)
  }
  const handleSelectCategory = (id) => {
    if (id === category) return setCategory(null)
    setCategory(id)
  }
  const handleSelectDay = (dayId) => {
    if (category === null) return
    //const marker = `${dayId}_${category}`
    let merged = null
    if (markers[dayId] === undefined) {
      merged = [category]
    } else {
      if (markers[dayId].includes(category)) {
        // Delete marker
        merged = markers[dayId].filter(m => m !== category)
      } else {
        merged = [...markers[dayId], category]
      }

    }
    console.log('In selectDay', merged)
    setMarkers({ ...markers, [dayId]: merged })

  }

  useEffect(() => {
    console.log(markers)
  }, [markers])
  console.log('Renderizando Home')
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.leftSideBar}>
          <Categories
            categories={categories}
            onClickAdd={() => setVisible(true)}
            onDelete={handleOnDelete}
            onSelect={handleSelectCategory}
            selected={category}
          />
          <CategoryForm
            colors={colors}
            isVisible={visible}
            onClose={handleCloseForm}
            onCreate={handleCreateCategory}
            categories={categories}
          />
        </div>
        <div className={styles.calendarContent}>
          {
            months.map((month, index) => (
              <Month
                monthName={month}
                monthNumber={index}
                year={YEAR}
                key={`${YEAR}${index}`}
                onSelectDay={handleSelectDay}
                markers={markers}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home