"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const factura_1 = require("../controllers/factura");
const router = (0, express_1.Router)();
router.post('/newFactura', factura_1.newFactura);
router.post('/DetalleFactura', factura_1.detalle_factura);
router.get('/MostrarFacturas', factura_1.mostrar_facturas);
router.get('/getFactura/:cod', factura_1.getfactura);
router.get('/getDetalleFactura/:cod', factura_1.getDetallefactura);
router.delete('/:cod', factura_1.deleteFactura);
exports.default = router;
//# sourceMappingURL=factura.js.map