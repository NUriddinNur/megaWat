
const GET_CARS =  `
select 
    c.*, 
    c.car_added_at::varchar,
    b.brand_name as brand,
    br.branch_name as branch
from 
    cars as c
natural join 
    brandes as b
natural join branches as br
`

const GET_CAR = `
    select 
        * 
    from
        cars
    where
        car_id = $1
`

const CHECK_PERMISSION = `
select 
    *
from (
    select 
        *
    from (
        select 
            *
        from (
            select 
                s.staff_id,
                sp.branch_id,
                sp.permission_modules_id,
                sp.permission_id
            from 
                staffs as s
            natural join staff_permissions as sp
            where 
                s.staff_id = $1
        ) as t1
        where 
            t1.branch_id = $2
    ) as t2
where 
    t2.permission_modules_id = $3
) as t3
where
    t3.permission_id = $4
`

const GET_BRAND = `
    select 
        *
    from 
        brandes
    where
        brand_id = $1
`

const GET_CAR_MODEL = `
select 
    *
from 
    cars
where
    lower(car_model) = lower($1) and
    branch_id = $2        
`

const INSERT_CAR = `
insert into cars(
    car_model, 
    car_color, 
    car_img,
    price,
    brand_id,
    branch_id
    ) values ($1, $2, $3, $4, $5, $6)
    returning *
    `
    
const GET_BRANCH = `
    select 
        * 
    from 
        branches
    where
        branch_id = $1
`

const CHANGE_CAR = `
    update cars set
        car_color = (
    case
        when length($2) > 0 then $2
        else car_color
    end
        ),
    car_model = (
    case
        when length($3) > 0 then $3
        else car_model
    end
    ),
    price = (
    case
        when length($3) > 0 then $4
        else price
    end
    )
    where car_id = $1
    returning *
`

const DELETE_CAR = `
delete from
    cars
where
    car_id = $1
returning *
`

export default {
    CHECK_PERMISSION,
    GET_CAR_MODEL, 
    INSERT_CAR,
    DELETE_CAR,
    CHANGE_CAR,
    GET_BRAND,
    GET_BRANCH,
    GET_CARS,
    GET_CAR,



    
}