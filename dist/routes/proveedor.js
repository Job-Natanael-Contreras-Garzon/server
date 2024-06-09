"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const poveedor_1 = require("../controllers/poveedor");
const router = (0, express_1.Router)();
router.get('/', poveedor_1.getProveedores);
router.get('/:codigo', poveedor_1.getProveedor);
router.delete('/:codigo', poveedor_1.deleteProveedor);
router.post('/', poveedor_1.newProveedor);
router.put('/:codigo', poveedor_1.updateProveedor);
exports.default = router;
//# sourceMappingURL=proveedor.js.map