const mutations = {
    LOADING_SHOW (state, params) {
        state.loadingStatus = params;
    },
    ALERT_SHOW (state, params) {
        state.alertStatus = params.alertStatus
        state.alertText = params.alertText ||'系统错误'
    },
}
export default mutations
