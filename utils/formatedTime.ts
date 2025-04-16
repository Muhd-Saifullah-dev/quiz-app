import moment from "moment"

export const formatedTime=(date:Date)=>{
    return moment(date).format("Do MMMM YYYY, HH:mm")
}