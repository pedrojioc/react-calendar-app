import React, { useState, useEffect } from 'react'
import styles from './CategoryForm.module.css'
import { ReactComponent as IconAdd } from '../../assets/icons/brush.svg'

function CategoryForm({ colors, isVisible, onClose, onCreate, categories }) {
  const [colorSelected, setColorSelected] = useState(colors[0])
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [customColor, setCustomColor] = useState('lightpink')

  const colorRef = React.createRef()

  const handleChangeColor = (color) => {
    setColorSelected(color)
  }
  const handleChangeValue = (event) => {
    setName(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const categoryId = `${name}-${colorSelected}`
    if (!name) return setError('Ingrese un nombre')
    const rs = categories.find(c => c.id.toLowerCase() === categoryId.toLowerCase())
    if (rs) return setError('La categoría ya existe')
    if (!colors.includes(colorSelected) && colorSelected !== customColor) return setError('Seleccione un color')
    onCreate(name, colorSelected, categoryId)
    setName('')
    setColorSelected(colors[0])
    onClose()
  }
  const handleAdd = () => {
    colorRef.current.click()
  }
  const handleCustomColor = (event) => {
    setCustomColor(event.target.value)
  }
  useEffect(() => {
    if (error) setTimeout(() => setError(null), 3000)
  }, [error])

  return (
    <>
      {
        isVisible && (
          <div>
            <div className={styles.overlay} onClick={onClose}>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.categoryForm}>
                <div className={styles.formHeader}>Nueva Categoría</div>
                <div className={StyleSheet.formBody}>
                  <input type="text" value={name} onChange={handleChangeValue} className="input is-rounded" placeholder="Nombre de la categoría" />
                  <div className={styles.colors}>
                    {
                      colors.map(color => {
                        if (color === colorSelected) {
                          return (
                            <div
                              key={color}
                              className={styles.color}
                              style={{ backgroundColor: color }}>
                              <span className={styles.iconCheck}></span>
                            </div>
                          )
                        }
                        return (
                          <div
                            onClick={() => handleChangeColor(color)}
                            key={color}
                            className={styles.color}
                            style={{ backgroundColor: color }}>
                          </div>
                        )
                      })
                    }
                    <div className={styles.separator}></div>
                    {/* Custom color control */}
                    {customColor === colorSelected

                      ?
                      <div
                        className={styles.color}
                        style={{ backgroundColor: customColor }}
                      >
                        <span className={styles.iconCheck}></span>
                      </div>
                      :
                      <div
                        onClick={() => handleChangeColor(customColor)}
                        className={styles.color}
                        style={{ backgroundColor: customColor }}
                      >
                      </div>
                    }


                    <IconAdd onClick={handleAdd} className={styles.iconPaint} />
                    {/* Custom color input */}
                    <input onInput={handleCustomColor} type="color" ref={colorRef} className={styles.inputColor} />
                  </div>
                </div>
                <div className={styles.formFooter}>
                  <button type="submit" className="button is-primary is-rounded">Crear</button>
                  {
                    (error && (<div className={styles.error}>{error}</div>))
                  }
                </div>
              </div>
            </form>
          </div>
        )
      }
    </>
  )
}


export default CategoryForm