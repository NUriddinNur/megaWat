const GET_STAFFS = `
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
group by
    s.staff_name, s.staff_id, s.birth_date, s.gender
`

export default {
    GET_STAFFS
}



    