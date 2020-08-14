import {api} from './config'

export default {
    
    searchSymbols(){
        return api.get('symbols')
    }
}