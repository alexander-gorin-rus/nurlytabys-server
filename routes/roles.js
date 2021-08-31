const express = require('express')
const auth = require('../middleware/auth');
const { 
    CreateRole, 
    GetAllRoles, 
    GetRoleById, 
    UpdateRole, 
    DeleteRole
 } = require('../controllers/company_management/roles')

const router = express.Router();

router.post('/create-role', auth, CreateRole);
router.get('/get-roles', GetAllRoles);
router.get('/get-role-by-id/:id', auth, GetRoleById);
router.put('/update-role/:id', auth, UpdateRole);
router.delete('/delete-role/:id', auth, DeleteRole)

module.exports = router
