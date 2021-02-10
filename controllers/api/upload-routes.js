const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Upload } = require('../../models');

// GET /api/upload
router.get('/', (req, res) => {});

// GET /api/upload/1
router.get('/:id', (req, res) => {});

// POST /api/upload
router.post('/', (req, res) => {});

// PUT /api/upload/1
router.put('/:id', (req, res) => {});

// DELETE /api/upload/1
router.delete('/:id', (req, res) => {});


module.exports = router;