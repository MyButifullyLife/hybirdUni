import actions from './action'
import mutations from './mutation'
import getters from './getter'

const common = {
    namespaced: true,
    state: {
        loadingStatus: false,
        alertStatus: false,
        alertText: ''
    },
    actions,
    mutations,
    getters
}

export default common
