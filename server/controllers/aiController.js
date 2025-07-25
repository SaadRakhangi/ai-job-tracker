const fs = require('fs');
const pdfParse = require('pdf-parse');

// Resume Scanner: Extract text from uploaded PDF
exports.scanResume = async (req, res) => {
  try {
    const fileBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(fileBuffer);
    fs.unlinkSync(req.file.path); // cleanup

    res.json({
      text: data.text,
      info: `✅ Resume extracted successfully!`,
    });
  } catch (err) {
    console.error('Resume parsing failed:', err);
    res.status(500).json({ message: '❌ Failed to parse resume.' });
  }
};

// Resume Analyzer: Process extracted text using AI
exports.analyzeResume = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'No resume text provided.' });

    // For now, just mock the response. Later we'll use OpenAI or LLM.
    const summary = `This resume includes experience in ${text.slice(0, 50)}...`;

    res.json({ summary });
  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({ message: '❌ Failed to analyze resume.' });
  }
};
