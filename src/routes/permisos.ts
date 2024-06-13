import { Router } from 'express';
import { UserPer, actualizar_Permiso, newPermiso } from '../controllers/permisos';

const router = Router();

router.post('/newpermisos',newPermiso);
router.put('/updatepermiso',actualizar_Permiso);
router.post('/getpermisos',UserPer);


export default router;