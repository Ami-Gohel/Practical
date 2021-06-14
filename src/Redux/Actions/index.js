import {  GET_GEO_LOCATION_REQUEST } from '../Types'


export const addLocation =  (params)=>{
    return {
        type: GET_GEO_LOCATION_REQUEST,
        params
    }
}
