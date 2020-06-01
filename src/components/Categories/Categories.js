import React from 'react'
import { ReactComponent as IconAdd } from '../../assets/icons/add.svg'
import { ReactComponent as IconRemove } from '../../assets/icons/remove.svg'
import styles from './Categories.module.css'

function Categories({ categories, onClickAdd, onDelete, onSelect, selected }) {

  const handleClick = (evt) => {
    evt.persist()
    onSelect(evt._targetInst.key)
  }
  return (
    <div className={styles.categories}>
      <div className={styles.categoriesHeader}>
        <span>Categorías</span>
        <IconAdd className={styles.iconAdd} onClick={onClickAdd} />
      </div>
      <div className={styles.categoriesBody}>
        {
          categories.map((category) => {

            let classes = category.id === selected ? styles.selected : ''
            return (
              <div onClick={handleClick} key={category.id} className={styles.category}>
                <div className={styles.nameAndColor}>
                  <div className={classes} style={{ backgroundColor: category.color }}></div>
                  <span>{category.name}</span>
                </div>
                <IconRemove
                  onClick={() => onDelete(category.id)}
                  className={styles.iconRemove}
                />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Categories