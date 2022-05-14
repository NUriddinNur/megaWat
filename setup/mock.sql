

-- branches
insert into branches (branch_name, address) values ('Tashkent', 'Chilonzor street 21');
insert into branches (branch_name, address) values ('Samarqand', 'Samarqand 32');

-- staffs
insert into staffs ( staff_name, password, birth_date, gender) values 
('Alo', 'Alo1', '2001-01-21', 1),
('John', 'Alo1', '1999-06-12', 1),
('Admin', '0afb00138d8e73348ec1fe41fd3d3a8fcbd90156b263bfa5791ba0e095f42cfc', '2000-11-30', 2),
('Guli', 'Alo1', '2000-10-30', 2),
('Alex', 'Alo1', '1995-12-04', 1)
;


-- branch staffs
insert into branches_staffs (branch_id, staff_id) values
('e3a11271-fcd2-4a89-b21e-75617074c174', 'bf7e8361-89b8-43bf-891b-881a834f9081'),
('b8984f72-c741-4e73-9215-efced875e6d8', '65426033-f545-4df2-9adc-365965200a43'),
('e3a11271-fcd2-4a89-b21e-75617074c174', '1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31'),
('b8984f72-c741-4e73-9215-efced875e6d8', 'f7c1532c-3c91-436a-96d2-dd8425a9187c'),
('e3a11271-fcd2-4a89-b21e-75617074c174', 'd3fa3e11-adb1-4b37-a3de-57bbca741f0f'),
('b8984f72-c741-4e73-9215-efced875e6d8', '1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31')
;

-- brands
insert into brandes (brand_name) values ('Lada');
insert into brandes (brand_name) values ('Tayota');

-- cars
insert into cars(
    car_model, 
    car_color, 
    car_img,
    price,
    brand_id,
    branch_id
) values (
    'Vesta',
    'white',
    'vesta.jpeg',
    12000,
    'ff3c3347-9187-4f05-8539-97927a112f1a',
    'c3bbc161-ba2a-4be4-baa7-deb4fed8199e'
);

insert into cars(
    car_model, 
    car_color, 
    car_img,
    price,
    brand_id,
    branch_id
) values (
    'Prado',
    'black',
    'prado.jpeg',
    13000,
    'a7ff799c-b449-4f38-b345-f52adfe8affd',
    'c3bbc161-ba2a-4be4-baa7-deb4fed8199e'
);

insert into cars(
    car_model, 
    car_color, 
    car_img,
    price,
    brand_id,
    branch_id
) values (
    'Land Cruiser',
    'black',
    'prado.jpeg',
    35000,
    'a7ff799c-b449-4f38-b345-f52adfe8affd',
    '4c9a45cf-a4c8-41f6-8f27-42b1c136e976'
);


-- permission_modules
insert into permission_modules(permission_modules_name) values ('cars'), ('branches'), ('permissions');

-- permissions
insert into permissions(permission_name) values ('create'), ('read'), ('delete'), ('update');


create table staff_permissions (
    staff_permissions_id uuid default uuid_generate_v4() primary key,
    staff_id uuid not null references staffs(staff_id),
    branch_id uuid not null references branches(branch_id),
    permission_modules_id not null uuid references permission_modules(permission_modules_id),
    permission_id uuid not null references permissions(permission_id)
);


insert into staff_permissions (staff_id, branch_id, permission_modules_id, permission_id) values 
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '59684882-8d5f-4e92-a692-3e43864dc7f6', 'ddc7dc63-7d14-4e21-83de-7fcbede6a6a8'), 
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '59684882-8d5f-4e92-a692-3e43864dc7f6', 'da0cc463-c174-4aee-8348-a166f5313e11'), 
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '59684882-8d5f-4e92-a692-3e43864dc7f6', '76975cfe-cc03-46c6-8ea7-a91e473e24c2'), 
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '59684882-8d5f-4e92-a692-3e43864dc7f6', '9303a0d1-3c16-48ef-aa36-a030a1e933df'),

('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '8c17d522-1de4-44cb-a5c0-549e4ccdb654', 'ddc7dc63-7d14-4e21-83de-7fcbede6a6a8'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '8c17d522-1de4-44cb-a5c0-549e4ccdb654', 'da0cc463-c174-4aee-8348-a166f5313e11'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '8c17d522-1de4-44cb-a5c0-549e4ccdb654', '76975cfe-cc03-46c6-8ea7-a91e473e24c2'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '8c17d522-1de4-44cb-a5c0-549e4ccdb654', '9303a0d1-3c16-48ef-aa36-a030a1e933df'),

('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '4374150d-93df-4008-9de9-91c9c10e559f', 'ddc7dc63-7d14-4e21-83de-7fcbede6a6a8'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '4374150d-93df-4008-9de9-91c9c10e559f', 'da0cc463-c174-4aee-8348-a166f5313e11'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '4374150d-93df-4008-9de9-91c9c10e559f', '76975cfe-cc03-46c6-8ea7-a91e473e24c2'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '4374150d-93df-4008-9de9-91c9c10e559f', '9303a0d1-3c16-48ef-aa36-a030a1e933df'),


('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'b8984f72-c741-4e73-9215-efced875e6d8', '59684882-8d5f-4e92-a692-3e43864dc7f6', 'ddc7dc63-7d14-4e21-83de-7fcbede6a6a8'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'b8984f72-c741-4e73-9215-efced875e6d8', '59684882-8d5f-4e92-a692-3e43864dc7f6', 'da0cc463-c174-4aee-8348-a166f5313e11'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'b8984f72-c741-4e73-9215-efced875e6d8', '59684882-8d5f-4e92-a692-3e43864dc7f6', '76975cfe-cc03-46c6-8ea7-a91e473e24c2'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'b8984f72-c741-4e73-9215-efced875e6d8', '59684882-8d5f-4e92-a692-3e43864dc7f6', '9303a0d1-3c16-48ef-aa36-a030a1e933df'),

('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'b8984f72-c741-4e73-9215-efced875e6d8', '8c17d522-1de4-44cb-a5c0-549e4ccdb654', 'ddc7dc63-7d14-4e21-83de-7fcbede6a6a8'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'b8984f72-c741-4e73-9215-efced875e6d8', '8c17d522-1de4-44cb-a5c0-549e4ccdb654', 'da0cc463-c174-4aee-8348-a166f5313e11'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'b8984f72-c741-4e73-9215-efced875e6d8', '8c17d522-1de4-44cb-a5c0-549e4ccdb654', '76975cfe-cc03-46c6-8ea7-a91e473e24c2'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'b8984f72-c741-4e73-9215-efced875e6d8', '8c17d522-1de4-44cb-a5c0-549e4ccdb654', '9303a0d1-3c16-48ef-aa36-a030a1e933df'),

('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'b8984f72-c741-4e73-9215-efced875e6d8', '4374150d-93df-4008-9de9-91c9c10e559f', 'ddc7dc63-7d14-4e21-83de-7fcbede6a6a8'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'b8984f72-c741-4e73-9215-efced875e6d8', '4374150d-93df-4008-9de9-91c9c10e559f', 'da0cc463-c174-4aee-8348-a166f5313e11'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'b8984f72-c741-4e73-9215-efced875e6d8', '4374150d-93df-4008-9de9-91c9c10e559f', '76975cfe-cc03-46c6-8ea7-a91e473e24c2'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'b8984f72-c741-4e73-9215-efced875e6d8', '4374150d-93df-4008-9de9-91c9c10e559f', '9303a0d1-3c16-48ef-aa36-a030a1e933df')
;

insert into staff_permissions (staff_id, branch_id, permission_modules_id, permission_id) values 
('94b07b7f-6049-40b8-a814-db894e8d1865', 'c3bbc161-ba2a-4be4-baa7-deb4fed8199e', '6b9dfecd-c9cf-4402-b4ca-dc53104bb9e0', '679c2484-7047-4a6a-9c39-3ea2e52993f1'),
('94b07b7f-6049-40b8-a814-db894e8d1865', 'c3bbc161-ba2a-4be4-baa7-deb4fed8199e', '6b9dfecd-c9cf-4402-b4ca-dc53104bb9e0', '83debcfc-e6b8-4b81-9fe0-da13f9fcefca'),


('2049cbc9-7786-477f-b3cd-cec43896a63c', '4c9a45cf-a4c8-41f6-8f27-42b1c136e976', '9df116eb-3168-4df3-be17-e4d1979bd6d5', '09bdce78-0ac4-4012-9466-e02465414746'),
('2049cbc9-7786-477f-b3cd-cec43896a63c', '4c9a45cf-a4c8-41f6-8f27-42b1c136e976', '9df116eb-3168-4df3-be17-e4d1979bd6d5', '679c2484-7047-4a6a-9c39-3ea2e52993f1')
;




insert into staff_permissions (staff_id, branch_id, permission_modules_id, permission_id) values 
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '4374150d-93df-4008-9de9-91c9c10e559f', 'ddc7dc63-7d14-4e21-83de-7fcbede6a6a8'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '4374150d-93df-4008-9de9-91c9c10e559f', 'da0cc463-c174-4aee-8348-a166f5313e11'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '4374150d-93df-4008-9de9-91c9c10e559f', '76975cfe-cc03-46c6-8ea7-a91e473e24c2'),
('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'e3a11271-fcd2-4a89-b21e-75617074c174', '4374150d-93df-4008-9de9-91c9c10e559f', '9303a0d1-3c16-48ef-aa36-a030a1e933df');



('1b0c7d50-d8ae-4fb5-aeb6-78036ac1ff31', 'b8984f72-c741-4e73-9215-efced875e6d8', '', '')