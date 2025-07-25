const express = require('express');
const router = express.Router();
const multer = require('multer');
const { scanResume, analyzeResume } = require('../controllers/aiController'); // ✅ Import controllers

// Set up multer storage
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ✅ File upload route
router.post('/scan-resume', upload.single('resume'), scanResume);

// ✅ AI analysis route (text-based)
router.post('/analyze-resume', analyzeResume);

module.exports = router;
