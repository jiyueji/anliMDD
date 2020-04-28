import { observable, computed, action, runInAction } from 'mobx'
import ApiService from '../services/ApiService'
import StorageService from '../services/StorageService'
import history from '../services/history'
import routes from '../routes'

class AuthStore {
    @observable isAuthenticated = false
    @observable isLoading = false
    @observable isFailure = false
    @observable currentUser = null
    @observable profileErrors = null

    @action async login(params) {
        const LOGIN_ERR_MSG = 'Username and password combination is incorrect'
        try {
            const res = await ApiService.login(params)

            // console.log('LOGIN RES: ', res)
            if (!res.access_token) {
                alert(LOGIN_ERR_MSG)
                throw LOGIN_ERR_MSG
            }
            StorageService.setToken(res.access_token)
            runInAction(() => {
                this.currentUser = res.username
                this.isAuthenticated = true
                this.isFailure = false
                this.isLoading = false
            })
        } catch (e) {
            runInAction(() => {
                this.isAuthenticated = false
                this.isFailure = true
                this.isLoading = false
            })
        }
    }

    @action async logout() {
        await ApiService.logout(StorageService.getToken())
        StorageService.removeToken()
        runInAction(() => {
            this.isAuthenticated = false
            this.isFailure = false
            this.currentUser = null
            this.isLoading = false
            history.push('/')
        })
    }

    @action async fetchProfile() {
        try {
            if (!StorageService.getToken()) {
                throw new Error('No token provided!')
            }
            this.isLoading = true
            const res = await ApiService.current_user(StorageService.getToken())
            runInAction(() => {
                this.isAuthenticated = true
                this.currentUser = res
                this.isLoading = false
                this.isFailure = false
            })
        } catch (e) {
            runInAction(() => {
                console.error(e.message)
                // auto log out if we can't get profile
                StorageService.removeToken()
                this.isAuthenticated = false
                this.isFailure = false
                this.currentUser = null
                this.isLoading = false
                history.push(routes.login)
            })
        }
    }
}

export default new AuthStore()
export { AuthStore }