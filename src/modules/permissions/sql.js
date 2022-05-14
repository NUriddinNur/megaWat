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

const ALLOW = `
    insert into 
        staff_permissions (
            staff_id, 
            branch_id, 
            permission_modules_id, 
            permission_id) 
    values ($1, $2, $3, $4) 
    returning *

`

const CHECH_BRANCH = `
select 
    *
from 
    branches_staffs
where
    staff_id = $1 and branch_id = $2
`

const INSERT_TO_BRANCH = `
insert into 
    branches_staffs(branch_id, staff_id) values
    ($2, $1)
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

const GET_ALL_PERMISSIONS = `
select 
    * 
from 
    permissions
`

const GET_PERMISSIONS_MODULES = `
    select
        *
    from 
        permission_modules
`

const ADDED_PERMISSION = `
select 
t3.staff_name,
t3.branch_name,
t3.permission_modules_name,
t3.permission_name
from (
select 
    t2.staff_name,
    t2.branch_name,
    t2.permission_modules_name,
    p.permission_id,
    p.permission_name
from (
    select
        t1.staff_name,
        t1.branch_name,
        per.permission_modules_id,
        per.permission_modules_name
    from (
        select 
            s.staff_name,
            b.branch_id,
            b.branch_name
        from 
            staffs as s
        natural join 
            branches as b
        where 
            s.staff_id = $1
    ) as t1
    natural join permission_modules as per
    where 
        t1.branch_id = $2
) as t2
natural join permissions as p
where
    t2.permission_modules_id = $3
) as t3
where 
t3.permission_id = $4
`


const OWN_PWRMISSIONS = `
select 
    t1.branch_name,
    t1.permission_modules_name,
    t1.permissions
from (
select 
    s.staff_name,
    br.branch_name,
    pr.permission_modules_name,
    array_agg(per.permission_name) as permissions
from 
    staff_permissions as sp
natural join staffs as s
natural join branches as br
natural join permission_modules as pr
natural join permissions as per
group by s.staff_name, br.branch_name, pr.permission_modules_name
) as t1
where t1.staff_name = $1
`

const GET_STAFF = `
    select * from staffs where staff_id = $1 
`

export default {
    GET_PERMISSIONS_MODULES,
    GET_ALL_PERMISSIONS,
    DELETE_PERMISSIONS,
    ADDED_PERMISSION,
    CHECK_PERMISSION,
    INSERT_TO_BRANCH,
    OWN_PWRMISSIONS,
    CHECH_BRANCH,
    GET_STAFF,
    ALLOW
}