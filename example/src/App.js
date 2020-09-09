import React from 'react'
import { Header, GaugeChart, EquipmentContainer, TrendChartFT, TrendChartPSI, TrendContainer } from 'jct'
import { TabPanels, TabPanel, TabList, Tab } from '@chakra-ui/core'
import 'jct/dist/index.css'

import NavigationDrawer from './NavigationDrawer'
import SettingsDrawer from './SettingsDrawer'

const App = () => {
  return (
    <>
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
    </>
  )
}

export default App
