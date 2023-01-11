import { Router } from 'express';
import { body } from 'express-validator';
import { createProduct, deleteProduct, getOneProduct, getUserProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUserUpdates, updateUpdate } from './handlers/update';
import { handleInputErrors } from './modules/middleware';

const router = Router();


// Product
router.get('/product', getUserProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)
router.post('/product', body('name').isString(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)

//Update
router.get('/update', getUserUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED' ,'DEPRECATED']).optional,
    body('version').optional(),
    updateUpdate)

router.post('/update',
    body('title').exists().isString,
    body('body').exists().isString(), 
    body('productId').exists().isString(),
    createUpdate)

router.delete('/update/:id', deleteUpdate)

//Update Point
router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => { }
)
router.post('/updatepont',
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('updateId').exists().isString(),
    () => { }
)
router.delete('/updatepont/:id', () => { })

export default router;