import express from 'express';
import invoiceController from '../api/controllers/invoice.controller';

export const router = express.Router();

router.get('/invoices', invoiceController.findAll);
router.post('/invoices', invoiceController.create);
router.put('/invoices/:id', invoiceController.update);
router.delete('/invoices/:id', invoiceController.delete);
router.get('/invoices/:id', invoiceController.findOne);
