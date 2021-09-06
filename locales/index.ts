
import id from './id/_id'
import en from './en/_en'

const locales = (lng: any) => lng === "id" ? id : en

export default locales