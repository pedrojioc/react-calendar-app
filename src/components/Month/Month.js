import React from 'react'
import styles from './Month.module.css'
import { getNumDaysOfMonth, getDayOfWeek } from '../../lib/utils'

function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i + 1));
  }
  return <>{items}</>;
}

function Month({ monthName, monthNumber, year, onSelectDay, markers }) {

  const numOfDays = getNumDaysOfMonth(monthNumber, year)
  const daysOut = getDayOfWeek(year, monthNumber, 1)

  return (
    <div className={styles.month}>
      <div className={styles.monthTitle}>{monthName}</div>
      <div className={styles.monthHeader}>
        <div>Lun</div>
        <div>Mar</div>
        <div>Mie</div>
        <div>Jue</div>
        <div>Vie</div>
        <div>Sab</div>
        <div>Dom</div>
      </div>
      <div className={styles.monthBody}>
        <Repeat numTimes={daysOut - 1}>
          {(index) => <div key={`d--o${index}`} className={styles.noDay}>-</div>}
        </Repeat>
        <Repeat numTimes={numOfDays}>
          {
            (index) => {
              let dayId = `${year}-${monthNumber}-${index}`
              return (
                <div
                  key={dayId}
                  className={styles.day}
                  onClick={() => onSelectDay(`${year}-${monthNumber}-${index}`)}
                >
                  {index}
                  <div className={styles.catContainer}>
                    {
                      (markers[dayId] && markers[dayId].map(m => {
                        return (<div key={m} style={{ backgroundColor: m.split('-')[1] }} className={styles.category}></div>)
                      }
                      ))
                    }
                  </div>
                </div>
              )
            }
          }
        </Repeat>
      </div>

    </div>
  )
}

export default Month