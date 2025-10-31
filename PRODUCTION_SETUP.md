# Production Configuration for Kiwiz App

## Vercel Environment Variables

Add these environment variables to your Vercel dashboard:
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:

```
KINDE_CLIENT_ID=31b50a6479614b3996a1a15d7174e424
KINDE_CLIENT_SECRET=<your_client_secret_from_kinde_dashboard>
KINDE_ISSUER_URL=https://fansp.kinde.com
KINDE_SITE_URL=https://ai-coloring-and-tracing.vercel.app
KINDE_POST_LOGOUT_REDIRECT_URL=https://ai-coloring-and-tracing.vercel.app
KINDE_POST_LOGIN_REDIRECT_URL=https://ai-coloring-and-tracing.vercel.app/dashboard
KINDE_DEBUG_MODE=false
```

## Kinde Dashboard Configuration

### Callback URLs to set in Kinde:

**Application homepage URI:**
```
https://ai-coloring-and-tracing.vercel.app
```

**Application login URI:**
```
https://ai-coloring-and-tracing.vercel.app/api/auth/login
```

**Allowed callback URLs:**
```
https://ai-coloring-and-tracing.vercel.app/api/auth/kinde_callback
```

**Allowed logout redirect URLs:**
```
https://ai-coloring-and-tracing.vercel.app
```

## Next Steps

1. Update the callback URLs in your Kinde dashboard
2. Add the environment variables to Vercel
3. Redeploy your application
4. Test the authentication flow

## Testing Authentication

After configuration:
1. Visit https://ai-coloring-and-tracing.vercel.app
2. Click "Sign Up" or "Login"
3. Complete the authentication flow
4. Verify you're redirected to the dashboard
