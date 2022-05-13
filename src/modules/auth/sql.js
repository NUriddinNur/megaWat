const REGISTER_STAFF = `
    insert into staffs( 
        staff_name, 
        password, 
        birth_date, 
        gender) values ($1, $2, $3, $4)
        returning *
`

const LOG_IN = `
select 
    s.staff_id,
    s.staff_name,
    s.birth_date,
    s.gender,
    array_agg(branch.branch_name) as branches
from 
    staffs as s
left join 
    branches_staffs as br 
on 
    br.staff_id = s.staff_id
left join 
    branches as branch
on 
    branch.branch_id = br.branch_id 
where 
    s.staff_name = $1 and s.password = $2
group by
    s.staff_name, s.staff_id, s.birth_date, s.gender
`

export default {
    REGISTER_STAFF,
    LOG_IN
}