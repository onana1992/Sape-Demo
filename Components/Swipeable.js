import React, { useState } from 'react';
import { StyleSheet, Text, View,style } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';

export default Swipeable = () => {
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(true);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  return (
    <View >
      
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
         {/* Your Content Here */}
      </SwipeablePanel>
    </View>
  );
};