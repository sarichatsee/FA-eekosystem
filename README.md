# Eek-o-system 🐍

An AI-powered web application for identifying venomous and poisonous animals through image analysis, providing immediate safety guidance and emergency recommendations.

## Features

### 🔍 **Image Analysis**
- Upload images from device or take photos directly with camera
- Drag-and-drop functionality for easy file uploads
- AI-powered animal identification and danger assessment
- Confidence scoring for analysis results

### 🤖 **AI Chatbot Assistant**
- Interactive chatbot for animal safety questions
- Context-aware responses about different animal types
- Emergency guidance and first aid recommendations
- Follow-up question support after image analysis

### 📱 **Mobile-Responsive Design**
- Optimized for mobile devices and tablets
- Touch-friendly interface with large buttons
- Camera integration for on-the-go photo capture
- Responsive grid layouts and adaptive typography

### ♿ **Accessibility Features**
- WCAG AAA compliant color contrast ratios
- Keyboard navigation support
- Screen reader friendly with proper ARIA labels
- Skip links and focus management
- High contrast mode support
- Reduced motion preferences respected

### 🎨 **User Experience**
- Clean, modern interface with intuitive navigation
- Loading states and progress indicators
- Error handling with user-friendly messages
- Smooth animations and transitions
- Offline support (with service worker)

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Inter)
- **Image Handling**: FileReader API, Canvas API
- **Mobile Features**: Camera API, Touch Events
- **Accessibility**: ARIA labels, Semantic HTML
- **PWA Features**: Service Worker ready

## Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Camera access (optional, for taking photos)
- Internet connection for external resources (fonts, icons)

### Installation

1. **Clone or download the project files**
   ```
   index.html
   styles.css
   script.js
   README.md
   ```

2. **Serve the files using a local web server**
   
   **Option A: Using Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Option B: Using Node.js (http-server)**
   ```bash
   npm install -g http-server
   http-server
   ```
   
   **Option C: Using PHP**
   ```bash
   php -S localhost:8000
   ```

3. **Open your browser and navigate to**
   ```
   http://localhost:8000
   ```

### Usage

1. **Upload an Image**
   - Click "Choose File" to select an image from your device
   - Click "Take Picture" to use your camera (mobile devices)
   - Or drag and drop an image onto the upload area

2. **Analyze the Image**
   - Click "Analyze Image" after uploading
   - Wait for the AI analysis to complete
   - Review the results and safety recommendations

3. **Use the Chatbot**
   - Click the chatbot icon in the bottom-right corner
   - Ask questions about animal safety
   - Get follow-up information about your analysis

4. **Emergency Actions**
   - If dangerous animal identified, follow emergency recommendations
   - Use "Call Emergency" button for immediate assistance
   - Review safety tips in the dedicated section

## File Structure

```
FA-eekosystem/
├── index.html          # Main HTML structure
├── styles.css          # Responsive CSS with accessibility features
├── script.js           # JavaScript functionality and AI integration
└── README.md           # Project documentation
```

## Customization

### AI Integration
The current implementation uses mock AI responses for demonstration. To integrate with a real AI service:

1. **Replace the `mockImageAnalysis` function in `script.js`**
2. **Add your AI service API calls** (OpenAI Vision, Google Cloud Vision, etc.)
3. **Update the response format** to match your API's output

Example integration points:
```javascript
// In script.js, replace mockImageAnalysis function
async function mockImageAnalysis(imageFile) {
    // Your AI API integration here
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await fetch('YOUR_AI_API_ENDPOINT', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY'
        }
    });
    
    return await response.json();
}
```

### Styling Customization
- Modify CSS custom properties in `:root` for color scheme changes
- Adjust responsive breakpoints in media queries
- Customize animation timing and effects

### Content Updates
- Update safety tips and emergency information
- Modify chatbot responses in `generateBotResponse` function
- Add new animal categories and safety guidelines

## Browser Compatibility

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile browsers**: iOS Safari 14+, Chrome Mobile 90+

## Accessibility Compliance

This application follows WCAG 2.1 AA guidelines:
- ✅ Minimum contrast ratio of 4.5:1 for normal text
- ✅ Minimum contrast ratio of 3:1 for large text
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus indicators
- ✅ Alternative text for images
- ✅ Semantic HTML structure

## Security Considerations

- Images are processed locally in the browser
- No sensitive data is transmitted without user consent
- File type validation for uploads
- XSS protection through proper HTML escaping
- HTTPS recommended for production deployment

## Performance Optimization

- Lazy loading for images
- Efficient CSS with minimal reflows
- Debounced event handlers
- Service worker for caching
- Optimized image processing

## Known Limitations

1. **AI Analysis**: Currently uses mock responses for demonstration
2. **Offline Mode**: Limited functionality without internet connection
3. **Image Size**: Large images may impact performance on older devices
4. **Browser Support**: Camera features require modern browser APIs

## Future Enhancements

- [ ] Real AI integration with multiple providers
- [ ] Offline AI model for basic identification
- [ ] User accounts and analysis history
- [ ] GPS location tagging for regional animal data
- [ ] Multi-language support
- [ ] Emergency services integration by location
- [ ] Animal database with detailed information
- [ ] Sharing capabilities for educational purposes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper testing
4. Ensure accessibility compliance
5. Submit a pull request with detailed description

## Disclaimer

⚠️ **Important**: This application is for educational and informational purposes only. Always seek professional medical advice for actual emergencies. The AI analysis should not be considered a substitute for expert identification or medical consultation.

## Emergency Contacts

- **Emergency Services**: 911 (US)
- **Poison Control**: 1-800-222-1222 (US)
- **Animal Control**: Contact your local authorities

## License

This project is developed for educational purposes. Please ensure compliance with local regulations and API terms of service when deploying with real AI services.

---

**Built with ❤️ for animal safety education**
