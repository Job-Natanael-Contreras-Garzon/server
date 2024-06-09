"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nota_salida_1 = require("../controllers/nota_salida");
const router = (0, express_1.Router)();
router.post('/newNotaSalida', nota_salida_1.newNotaSalida);
router.get('/getNotasSalida', nota_salida_1.getNotas_de_Salida);
router.get('/getNotaSalida/:cod', nota_salida_1.getNota_Salida);
router.put('/updateNotaSalida/:cod', nota_salida_1.updateNota_Salida);
router.delete('/deleteNotaSalida/:cod', nota_salida_1.deleteNota_Salida);
router.post('/newDetNotaSalida', nota_salida_1.newDetalleSalida);
router.get('/getDetsNotaSalida/:cod', nota_salida_1.getDetalleSalida);
router.put('/updateDeNotaSalida', nota_salida_1.updateDetalleSalida);
router.delete('/deleteDeNotaSalida/:cod', nota_salida_1.deleteDetalleSalida);
exports.default = router;
//# sourceMappingURL=nota_salida.js.map