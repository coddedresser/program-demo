# OpenRouter API Setup for Kiwiz

## Environment Variables Required

Add these environment variables to your Vercel dashboard:

### OpenRouter Configuration
```
OPENROUTER_API_KEY=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
OPENROUTER_SITE_URL=https://ai-coloring-and-tracing.vercel.app
OPENROUTER_SITE_NAME=Kiwiz - AI Coloring & Tracing
```

### Existing Kinde Configuration (Already Set)
```
KINDE_CLIENT_ID=31b50a6479614b3996a1a15d7174e424
KINDE_CLIENT_SECRET=<your_client_secret_from_kinde_dashboard>
KINDE_ISSUER_URL=https://fansp.kinde.com
KINDE_SITE_URL=https://ai-coloring-and-tracing.vercel.app
KINDE_POST_LOGOUT_REDIRECT_URL=https://ai-coloring-and-tracing.vercel.app
KINDE_POST_LOGIN_REDIRECT_URL=https://ai-coloring-and-tracing.vercel.app/dashboard
```

## Features Implemented

### 🎨 Real Image Generation
- **OpenRouter API Integration**: Using Gemini 2.5 Flash model
- **Enhanced Prompts**: AI-optimized prompts for better results
- **Coloring Pages**: Generate child-friendly coloring pages
- **Tracing Worksheets**: Create educational tracing content

### 📚 CSV Prompts Integration
- **Flashcard Prompts**: From ai_prompts.csv file
- **Letter Learning**: Alphabet tracing worksheets
- **Educational Content**: Age-appropriate prompts (2-8 years)
- **Dynamic Suggestions**: Random prompt selection

### 🔐 Seamless Authentication
- **No Barriers**: Users can explore freely
- **Smart Gates**: Authentication only when downloading/saving
- **High Conversion**: Engaged users provide emails
- **Professional UX**: Beautiful, trust-building modals

## API Endpoints

### Coloring Generation
- **Endpoint**: `/api/generate-coloring`
- **Method**: POST
- **Body**: `{ "prompt": "A butterfly on a flower" }`
- **Response**: Generated coloring page data

### Tracing Generation  
- **Endpoint**: `/api/generate-tracing`
- **Method**: POST
- **Body**: `{ "prompt": "Trace Alphabet A" }`
- **Response**: Tracing worksheet data

## Usage Examples

### Coloring Prompts
```javascript
// Simple prompts
"A kite flying in sky"
"A girl playing football on ground"
"An elephant eating grasses"

// Flashcard prompts
"Toddler flashcards, 6 images"
"Animal flashcards for kids"
"Fruit flashcards, simple style"
```

### Tracing Prompts
```javascript
// Letter tracing
"Trace Alphabet A"
"Trace alphabet a in smaller letter"
"Trace alphabet z in cursive"

// Number tracing
"Trace number 8"
"Trace number 5"

// Word tracing
"Spelling of One"
"Spelling of Two"
```

## Next Steps

1. **Add Environment Variables**: Set OPENROUTER_API_KEY in Vercel
2. **Redeploy Application**: Trigger new deployment
3. **Test Generation**: Try generating coloring pages and tracing worksheets
4. **Monitor Usage**: Track API usage and costs

## Cost Optimization

- **Prompt Optimization**: Enhanced prompts reduce API calls
- **Caching**: Consider implementing response caching
- **Rate Limiting**: Monitor usage to control costs
- **User Limits**: Implement daily generation limits if needed

## Troubleshooting

### Common Issues
1. **API Key Error**: Verify OPENROUTER_API_KEY is set correctly
2. **Rate Limits**: Check OpenRouter usage limits
3. **Model Availability**: Ensure Gemini 2.5 Flash is available
4. **Network Issues**: Check API connectivity

### Debug Mode
Enable debug logging by adding:
```
OPENROUTER_DEBUG=true
```

## Support

- **OpenRouter Docs**: https://openrouter.ai/docs
- **Gemini 2.5 Flash**: https://openrouter.ai/google/gemini-2.5-flash/api
- **API Status**: Check OpenRouter status page
