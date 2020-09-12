import React from 'react'
import { Header, GaugeChart, EquipmentContainer, TrendChartFT, TrendChartPSI, TrendContainer } from 'jct'
import { Box } from '@chakra-ui/core'
import 'jct/dist/index.css'

import NavigationDrawer from './NavigationDrawer'
import SettingsDrawer from './SettingsDrawer'

const App = () => {
  return (
    <Box px={3}>
      <Header siteName="JCT" date="12-12-2020" time="1:00 PM" mavigation={ <NavigationDrawer /> } settings={ <SettingsDrawer iconImage="none" /> } />
        {/* <NavigationDrawer />
        <SettingsDrawer iconImage="settings" /> */}
      <EquipmentContainer name='SWD'>
        <GaugeChart
          name='Tank'
          maxLevel={16}
          currentLevel={12.67}
          alarmOn={12}
          alarmOff={14}
        />

      </EquipmentContainer>
      <TrendChartPSI trendData={[
        {mDate: '08-31-2020', mTime: 12, SWDPRESS: 863.97},
        {mDate: '08-31-2020', mTime: 12, SWDPRESS: 796.52},
        {mDate: '08-31-2020', mTime: 12, SWDPRESS: 1240.10},
        {mDate: '08-31-2020', mTime: 12, SWDPRESS: 1265.43},
        {mDate: '08-31-2020', mTime: 13, SWDPRESS: 988.94},
        {mDate: '08-31-2020', mTime: 13, SWDPRESS: 1240.10},
        {mDate: '08-31-2020', mTime: 13, SWDPRESS: 877.70},
        {mDate: '08-31-2020', mTime: 13, SWDPRESS: 807.20},
        {mDate: '08-31-2020', mTime: 14, SWDPRESS: 988.94},
        {mDate: '08-31-2020', mTime: 14, SWDPRESS: 1240.10},
        {mDate: '08-31-2020', mTime: 14, SWDPRESS: 877.70},
        {mDate: '08-31-2020', mTime: 14, SWDPRESS: 807.20},
      ]} comp="TEST" maxPressure={2000} subtractor={250} hourCount={4} />
    </Box>
  )
}

export default App
