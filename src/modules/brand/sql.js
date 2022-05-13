const ADD_BRAND = `
    insert into brandes(brand_name) values ($1)
        returning *
`

const GET_BRANDS = `
    select 
        *
    from 
        brandes
`

export default {
    ADD_BRAND,
    GET_BRANDS
}