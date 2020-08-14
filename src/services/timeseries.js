import {api} from './config'

export default {
    
    currencyHistory(start_date, end_date, currency){
        return api.get('timeseries?start_date=' + end_date + '&end_date=' + start_date + '&base=BRL&symbols=' + currency)
    }
}