export const getUserInfo = store => store?.user.userInfo
export const getUserLoadSelector = store => store?.user.onLoad
export const registerLoad = store => store.user.onLoadRegister
export const registerError = store => store.user.onErrorRegister