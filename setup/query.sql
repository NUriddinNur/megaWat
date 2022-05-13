select 
    c.car_model,
    br.brand_name,
    b.branch_name
from cars as c
natural join branches as b 
natural join brandes as br 
;


select c.car_model, b.address from cars as c natural join branches as b where b.branch_id = c.branch_id;

select 
    s.staff_name,
    s.birth_date,
    s.gender,
    b.branch_name,
    b.address
from 
    staffs as s
natural join branches as b
;

-- get branch staffs
select 
    s.staff_id,
    s.staff_name,
    s.birth_date,
    s.gender,
    sp.branch_id (
        select branch_name from branch where branch_id = sp.branch_id

    )
from
    staffs as s
natural join staff_permissions as sp
group by s.staff_id, sp.branch_id
-- s.staff_name, s.birth_date, sp.branch_id
;


-- get staffs branches, permissions modules and permissions 
select 
    s.staff_name,
    br.branch_name,
    pr.permission_modules_name,
    array_agg(per.permission_name)
from 
    staff_permissions as sp
natural join staffs as s
natural join branches as br
natural join permission_modules as pr
natural join permissions as per
group by s.staff_name, br.branch_name, pr.permission_modules_name
;


select 
    s.staff_name,
    s.birth_date,
    s.gender,
    array_agg(br.branch_name) as branches
from 
    staffs as s
natural join branches_staffs as bs
natural join branches as br
group by s.staff_name, s.birth_date, s.gender
;
 


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
;


-- login query 

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
;

-- check permissions staff auery

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
                s.staff_id = '1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31'
        ) as t1
        where 
            t1.branch_id = 'e3a11271-fcd2-4a89-b21e-75617074c174'
    ) as t2
where 
    t2.permission_modules_id = '4374150d-93df-4008-9de9-91c9c10e559f'
) as t3
where
    t3.permission_id = '09bdce78-0ac4-4012-9466-e02465414746'
;


-- insert staff to branches staffs 
select 
    *
from 
    branches_staffs
where
    staff_id = $1 and branch_id = $2
;


-- delete staff permission
delete from
    staff_permissions
where
    staff_id = '52349c82-e626-4e3c-a0f6-b6b8819639f9' and
    branch_id = 'c3bbc161-ba2a-4be4-baa7-deb4fed8199e' and
    permission_modules_id = '6b9dfecd-c9cf-4402-b4ca-dc53104bb9e0'  and
    permission_id = '679c2484-7047-4a6a-9c39-3ea2e52993f1' 
;


-- get permissions 
select 
    * 
from 
    permissions
;


-- delete and add permission response query

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
                s.staff_id = '99ba4f75-e3af-4dea-863f-a1b4f61a19b8'
        ) as t1
        natural join permission_modules as per
        where 
            t1.branch_id = 'c3bbc161-ba2a-4be4-baa7-deb4fed8199e'
    ) as t2
    natural join permissions as p
    where
        t2.permission_modules_id = '6b9dfecd-c9cf-4402-b4ca-dc53104bb9e0'
) as t3
where 
    t3.permission_id = '679c2484-7047-4a6a-9c39-3ea2e52993f1'
;


-- check permission for create branch
select 
    sp.staff_id
from     
    staff_permissions as sp
where 
    sp.staff_id = $1 and
    sp.permission_modules_id = $2 and
    sp.permission_id = $3
;


select 
    *
from 
    staff_permissions
where
    permission_modules_id = '4374150d-93df-4008-9de9-91c9c10e559f' and
    staff_id = '1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31' and 
    branch_id = 'e3a11271-fcd2-4a89-b21e-75617074c174' and
    permission_id = 'ddc7dc63-7d14-4e21-83de-7fcbede6a6a8'
;

-- chande branch
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

