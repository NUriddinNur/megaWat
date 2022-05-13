import model from './model.js'

export default {
    Query: {
        staffs: async() => {
            return await model.getStaffs()
            
        }
    },

    Staff: {
        staff_id: global => global.staff_id,
        staff_name: global => global.staff_name,
        birth_date: global => String(global.birth_date),
        gender: global => global.gender == 1 ? 'Male' : 'Femal',
        branches: global => global.branches,
    },
}