const CHECK_PERMISSION = `
select 
    sp.staff_id
from     
    staff_permissions as sp
where 
    sp.staff_id = $1 and
    sp.permission_modules_id = $2 and
    sp.permission_id = $3
`
const INSERT_BRANCH = `
insert into 
    branches (branch_name, address) 
values 
    ($1, $2)
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

const CHANGE_BRANCH = `
    update branches b set
        branch_name = (
    case
        when length($2) > 0 then $2
        else branch_name
    end
        ),
    address = (
    case
        when length($3) > 0 then $3
        else address
    end
    )
    where branch_id = $1
    returning *
`

const DELETE_BRANCH = `
delete from
    branches
where
    branch_id = $1
returning *
`







const DELETE_PERMISSIONS =  `
delete from
    staff_permissions
where
    staff_id = $1 and
    branch_id = $2 and
    permission_modules_id = $3  and
    permission_id = $4
returning *
`


export default {
    CHECK_PERMISSION,
    INSERT_BRANCH,
    CHANGE_BRANCH,
    DELETE_BRANCH,
    GET_BRANCH
}