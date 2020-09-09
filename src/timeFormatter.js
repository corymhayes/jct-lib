export const timeFormatter = (time) => {
  let partTime
  let ampm

  /**   
   *   FIRST CHECK IF 12 HOUR CLOCK   
   *   OTHERWISE JUST RETURN TIME W/O SECONDS
   */

  if(time.substring(0).includes('M')){
    if(time.substring(0,2).includes(':')){
      partTime = time.substring(0,4)
      ampm = time.substr(-2)
      return `${partTime} ${ampm}`
    } else {
      partTime = time.substring(0,5)
      ampm = time.substr(-2)
      return `${partTime} ${ampm}`
    }
  } else {
    if(time.substring(11, 13) <= 11){
      return `${time.substring(11,16)} AM`
    } else {
      return `${time.substring(11, 13) - 12}:${time.substring(14, 16)} PM`
    }
  }
}



export const dateFormatter = (date) => {
  const newDate = date.substring(0, 10)
  const year = newDate.substring(0, 4)
  const monthDay = newDate.substring(5, 10)

  return `${monthDay}-${year}`
}



export const dataPoints = (trend, hourCount) => {
  let newTrend = []
  let newNewTrend = []

  for(let i = 0; i < (trend.length / hourCount); i++){
    newTrend.push([])
  }

  for(let i = 0; i < trend.length; i++){
    for(let j = 0; j < (trend.length / hourCount); j++){
      if(trend[i].x === j){
        newTrend[j].push(trend[i])
      }
    }
  }

  for(let i = 0; i < newTrend.length; i++){
    let sum = 0
    let avg = 0

    for(let j = 0; j < newTrend[i].length; j++){
      sum += newTrend[i][j].y
    }

    avg = (sum / newTrend[i].length)

    newNewTrend.push(
      { 
        x: i, 
        y: Number(avg.toFixed(2))
      }
    )
  }

  return newNewTrend
}