import React from 'react'
import { StyleSheet, View } from 'react-native'
import Skeleton from '../../global/components/Skeleton'

const Keleton = () => {
  return (
    <View style={{ height: 240, width: 320 }}>
      <View style={styles.imagen}>
        <Skeleton width={320} height={140} props={{ borderTopRightRadius: 25, borderTopLeftRadius: 25 }} />
      </View>
      <View style={{ height: 100, width: 320, backgroundColor: 'rgb(174, 171, 171)', top: -20, borderRadius: 25, alignItems: 'center', paddingVertical: 15 }}>
        <Skeleton width={250} height={15} />
        <View style={{ height: 10 }} />
        <Skeleton width={250} height={15} />
        <Skeleton width={100} height={15} props={{ top: 10, left: 75 }} />
      </View>
    </View>
  )
}
const SkeletonNews = () => {
  return (
    <>
      <Keleton />
      <Keleton />
      <Keleton />
    </>
  )
}

export default SkeletonNews

const styles = StyleSheet.create({
  container: {
    height: 240,
    width: 320,
    borderRadius: 25,
    marginBottom: 20,
    backgroundColor: 'rgb(174, 171, 171)'
  },
  imagen: {
    height: 140,
    width: 320,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  }
})
