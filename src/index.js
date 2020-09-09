import React from 'react'
import { VictoryArea, VictoryAxis, VictoryPie } from 'victory'
import { Heading, Flex, Text, Box, Tabs } from "@chakra-ui/core"
import { dateFormatter, dataPoints } from './timeFormatter'


/** 
 * 
 *  EQUIPMENT CONTAINER
 * 
 * */

export const EquipmentContainer = ({ name, children }) => {
  return(
    <Box display='flex' flexDirection='column' mb={3}>
      <Box
        border='none'
        bg={'#292929'}
        py={3}
        display='flex'
        alignItems='center'
        justifyContent='center'
        color='#fff'
        fontWeight='bold'
        >
        { name }
      </Box>
      { children }
    </Box>
  )
}


/** 
 * 
 *  GAUGE CHART
 * 
 * */

export const GaugeChart = ({
  name,
  maxLevel,
  currentLevel,
  alarmOn,
  alarmOff
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '20% 1fr',
        gridTemplateColumns: '1fr',
        placeItems: 'center center'
      }}
    >
      <h1 style={{ gridColumn: 1, gridRow: 1, fontSize: 16 }}>{name}</h1>
      <VictoryPie
        data={[
          { y: maxLevel - currentLevel },
          { x: currentLevel, y: currentLevel }
        ]}
        width={100}
        height={100}
        startAngle={150}
        endAngle={-150}
        innerRadius={37}
        padding={{ bottom: 0, top: 0 }}
        style={{
          data: {
            fill: ({ datum }) =>
              datum._x === 0
                ? 'rgba(0,0,0,.1)'
                : datum._x < alarmOn
                ? datum._x > alarmOff
                  ? 'yellow'
                  : 'green'
                : 'red'
          },
          labels: {
            fillOpacity: 0
          }
        }}
        containerComponent={
          <svg width={100} height={100} style={{ gridColumn: 1, gridRow: 2 }} />
        }
      />
      <div
        style={{
          gridColumn: 1,
          gridRow: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div>{currentLevel.toFixed(2)}</div>
      </div>
    </div>
  )
}




/** 
 * 
 *  TREND CHART (FT)
 * 
 * */

export const TrendChartFT = ({ trendData, comp, height, hourCount }) => {

  const data = trendData
  const timeline = []
  const levels = []
  const myTrend = []
  
  const date = new Date()
  const jsMonth = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`
  const jsDay = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
  const jsDate = `${jsMonth}-${jsDay}-${date.getFullYear()}`


  for(let i = 0; i < data.length; i++){
    if(dateFormatter(data[i].mDate) === jsDate){
      myTrend.push({ x: data[i].mTime, y: data[i][`${comp}`] })
    }
  }

  
  const newData = dataPoints(myTrend, hourCount)
  

  for(let i = 0; i <= 24; i++){
    if((i % 4) === 0){
      if(i === 0 || i === 24){
        timeline.push('12am')
      } else if(i === 12) {
        timeline.push('12pm')
      } else if(i > 12){
        timeline.push(`${i-12}pm`)
      } else {
        timeline.push(`${i}am`)
      }
    }
  }
  

  for(let i = 0; i <= height; i++){
    if((i % 2) === 0){
      levels.push(i)
    }
  }

  return(
    <div>
      <svg style={{ boxSizing: 'border-box', display: 'inline' }} viewBox="0 0 425 300">
        <VictoryAxis dependentAxis
          standalone={false}
          tickValues={levels}
          domain={[ 0, height ]}
          style={{
            axis: { strokeOpacity: 0 },
            tickLabels: { fontFamily: 'Industry', fill: '#' },
            grid: { stroke: '#eee' }
          }}
          padding={{ top: 50, left: 40, right: 50, bottom: 50 }}
        />
        
        <VictoryAxis
          standalone={false}
          tickValues={timeline}
          style={{
            axis: { strokeOpacity: 0 },
            tickLabels: { fontFamily: 'Industry', fill: '#292929', padding: 5},
          }}
          padding={{ top: 50, left: 50, right: 50, bottom: 40 }}
        />

        <VictoryArea 
          standalone={false}
          data={newData}
          domain={{ x: [0, 23], y: [0, height] }}
          interpolation='natural'
          style={{
            data: {
              stroke: '#ff7e3c',
              fill: `url(#${comp})`,
              fillOpacity: 0.7,
            },
          }}
          padding={{ top: 50, left: 40, right: 50, bottom: 50 }}
        />
        <defs>
          <linearGradient id={comp} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#ff7e3c" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}


/** 
 * 
 *  TREND CHART (PSI)
 * 
 * */

export const TrendChartPSI = ({ trendData, comp, maxPressure, subtractor, hourCount }) => {

  const data = trendData
  const company = comp
  const timeline = []
  const pressureLevels = [maxPressure]
  const myTrend = []

  const date = new Date()
  const jsMonth = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`
  const jsDay = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
  const jsDate = `${jsMonth}-${jsDay}-${date.getFullYear()}`


  for(let i = 0; i < data.length; i++){
    if(dateFormatter(data[i].mDate) === jsDate){
      myTrend.push({ x: data[i].mTime, y: data[i][`${company}`] })
    }
  }

  
  const newData = dataPoints(myTrend, hourCount)
  

  for(let i = 0; i <= 24; i++){
    if((i % 4) === 0){
      if(i === 0 || i === 24){
        timeline.push('12am')
      } else if(i === 12) {
        timeline.push('12pm')
      } else if(i > 12){
        timeline.push(`${i-12}pm`)
      } else {
        timeline.push(`${i}am`)
      }
    }
  }


  for(let i = 0; i < 7; i++){ pressureLevels.push(pressureLevels[i] - subtractor) }
  
  
  return(
    <div>
      <svg style={{ boxSizing: 'border-box', display: 'inline' }} viewBox="0 0 425 300">
        <VictoryAxis dependentAxis
          standalone={false}
          tickValues={pressureLevels.reverse()}
          domain={[ pressureLevels[0], pressureLevels[7] ]}
          padding={{ top: 50, left: 45, right: 50, bottom: 50 }}
          style={{
            axis: { strokeOpacity: 0 },
            tickLabels: { fontFamily: 'Industry', fill: '#292929' },
            grid: { stroke: '#eee' }
          }}
        />
        
        <VictoryAxis
          standalone={false}
          tickValues={timeline}
          padding={{ top: 50, left: 50, right: 50, bottom: 40 }}
          style={{
            axis: { strokeOpacity: 0 },
            tickLabels: { fontFamily: 'Industry', fill: '#292929', padding: 5 },
          }}
        />

        <VictoryArea 
          standalone={false}
          data={newData}
          domain={{ x: [0, 23], y: [pressureLevels[0], pressureLevels[7]] }}
          interpolation='natural'
          padding={{ top: 50, left: 40, right: 50, bottom: 50 }}
          style={{
            data: {
              stroke: '#ff7e3c',
              fill: `url(#${comp}`,
              fillOpacity: 0.7,
            },
          }}
          y0={() => pressureLevels[0]}
        />
        <defs>
          <linearGradient id={comp} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#ff7e3c" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}


/** 
 * 
 *  HEADER
 * 
 * */

export const Header = ({ navigation, siteName, date, time, settings }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0 1.5rem"
      bg="#292929"
      color="white"
      mb={3}
    >
      { navigation }

      <Flex align="center" direction="column" align="center" justify="center">
        {/* <Heading fontSize={3} color="#fff" mt={2} mb={0} fontFamily="Industry">{siteName}</Heading>
        <Text fontSize={1} color="#fff" mt={0} mb={2} fontFamily="Industry">{date} - {time}</Text> */}
        <Heading fontSize='1.25rem' color="#fff" mt={2} mb={0} fontFamily="Industry">{siteName}</Heading>
        <Text fontSize='.88rem' color="#fff" mt={0} mb={2} fontFamily="Industry">{date} - {time}</Text>
      </Flex>

      { settings }

    </Flex>
  );
};



/**
 * 
 *  TREND CONTAINER
 * 
 */

export const TrendContainer = ({ children }) => {
  return(
    <Flex direction="column">                  
      <Box border='none' backgroundColor='#292929' py={3} display="flex" alignItems="center" justifyContent="center" color="#fff" fontWeight="bold">
        Trend
      </Box>

      <Tabs>
        { children }
      </Tabs>
    </Flex> 
  )
}
