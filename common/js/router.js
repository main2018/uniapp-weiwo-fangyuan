function $navigateTo(obj) {
  const baseObj = {
    animationType: 'pop-in',
    animationDuration: 200
  }
  uni.navigateTo(Object.assign(baseObj, obj));
}

export default {
  $navigateTo
}