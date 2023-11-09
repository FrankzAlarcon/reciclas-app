import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

interface SkeletonProps {
  width: string | number;
  height: string | number;
  props?: React.CSSProperties
}

const Skeleton = ({ width, height, props }: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3))

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 800
        }),
        Animated.timing(opacity.current, {
          toValue: 0.2,
          useNativeDriver: true,
          duration: 800
        })
      ])).start()
  }, [opacity])

  return (
    <Animated.View style={{ opacity: opacity.current, height, width, backgroundColor: '#bababa', ...props }} />
  )
}

export default Skeleton
