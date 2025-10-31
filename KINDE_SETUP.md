# Kiwiz - AI Coloring & Tracing App with Kinde Authentication

A Next.js application that provides AI-powered coloring pages and alphabet tracing activities for children, now integrated with Kinde authentication supporting Google Auth, email, and Stripe integration.

## Features

- 🎨 **AI Coloring Pages**: Generate personalized coloring pages using AI
- ✏️ **Alphabet Tracing**: Interactive tracing exercises for learning
- 🔐 **Authentication**: Secure user authentication with Kinde
- 🌐 **Google OAuth**: Sign in with Google
- 📧 **Email Authentication**: Traditional email/password authentication
- 💳 **Stripe Integration**: Ready for payment processing
- 📱 **Responsive Design**: Mobile-first design with beautiful UI

## Authentication Setup

This application uses [Kinde](https://kinde.com) for authentication, which provides:
- Google OAuth integration
- Email/password authentication
- Stripe integration capabilities
- User management and organization features

## Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)
- A Kinde account ([sign up here](https://kinde.com))

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-coloring-and-tracing
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Kinde Authentication**
   
   a. Create a Kinde account at [kinde.com](https://kinde.com)
   
   b. Create a new application in your Kinde dashboard
   
   c. Configure your application settings:
      - **Application Type**: Web Application
      - **Allowed Callback URLs**: `http://localhost:3000/api/auth/kinde_callback`
      - **Allowed Logout Redirect URLs**: `http://localhost:3000`
      - **Allowed Login Redirect URLs**: `http://localhost:3000/dashboard`

4. **Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   # Kinde Authentication Configuration
   KINDE_CLIENT_ID=<your_kinde_client_id>
   KINDE_CLIENT_SECRET=<your_kinde_client_secret>
   KINDE_ISSUER_URL=https://<your_kinde_subdomain>.kinde.com
   KINDE_SITE_URL=http://localhost:3000
   KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
   KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
   
   # Optional: Add audience for API access
   # KINDE_AUDIENCE=<your-api>
   
   # Optional: Debug mode
   # KINDE_DEBUG_MODE=true
   ```

5. **Configure Google OAuth (Optional)**
   
   In your Kinde dashboard:
   - Go to **Settings > Connections**
   - Add Google as a connection
   - Configure your Google OAuth credentials

6. **Configure Stripe Integration (Optional)**
   
   In your Kinde dashboard:
   - Go to **Settings > Connections**
   - Add Stripe as a connection
   - Configure your Stripe credentials

## Running the Application

1. **Start the development server**
   ```bash
   pnpm dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── api/auth/[kindeAuth]/route.ts  # Kinde auth handlers
│   ├── dashboard/page.tsx             # Protected dashboard
│   ├── AuthProvider.tsx               # Auth context provider
│   ├── layout.tsx                     # Root layout with auth
│   └── page.tsx                       # Home page
├── components/
│   ├── main-app.tsx                   # Main app with auth UI
│   ├── coloring-page.tsx              # Coloring functionality
│   ├── tracing-page.tsx               # Tracing functionality
│   └── ui/                            # UI components
├── middleware.ts                      # Auth middleware
└── .env.local                         # Environment variables
```

## Authentication Flow

1. **Public Access**: Users can access the home page without authentication
2. **Login/Register**: Users can sign up or log in using:
   - Google OAuth
   - Email/password
3. **Protected Routes**: Dashboard and other protected pages require authentication
4. **User Management**: Users can manage their profile through Kinde's self-service portal

## Key Features

### Authentication Components
- `LoginLink`: Redirects to Kinde login
- `RegisterLink`: Redirects to Kinde registration
- `LogoutLink`: Handles user logout
- `useKindeBrowserClient`: Client-side auth state management

### Protected Routes
- `/dashboard`: User dashboard (requires authentication)
- Other routes can be protected by adding them to the middleware configuration

### User Experience
- Seamless authentication flow
- Persistent login state
- Automatic token refresh
- Responsive design for all devices

## Development

### Adding New Protected Routes

To protect additional routes, update the middleware configuration:

```typescript
// middleware.ts
export default withAuth(
  async function middleware(req) {
    // Custom middleware logic
  },
  {
    publicPaths: ["/", "/api/auth/health", "/public-page"], // Add public routes here
    loginPage: "/api/auth/login",
  }
);
```

### Using Authentication in Components

**Server Components:**
```typescript
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function ServerComponent() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }
  
  const user = await getUser();
  return <div>Welcome, {user?.given_name}!</div>;
}
```

**Client Components:**
```typescript
"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function ClientComponent() {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
  
  if (isLoading) return <div>Loading...</div>;
  
  return isAuthenticated ? (
    <div>Welcome, {user?.given_name}!</div>
  ) : (
    <div>Please log in</div>
  );
}
```

## Deployment

### Vercel Deployment

1. **Set environment variables** in your Vercel dashboard
2. **Update callback URLs** in Kinde to include your production domain
3. **Deploy** using Vercel CLI or GitHub integration

### Environment Variables for Production

```bash
KINDE_SITE_URL=https://your-domain.com
KINDE_POST_LOGOUT_REDIRECT_URL=https://your-domain.com
KINDE_POST_LOGIN_REDIRECT_URL=https://your-domain.com/dashboard
```

## Troubleshooting

### Common Issues

1. **"State not found" error**: Ensure your callback URLs match exactly in Kinde dashboard
2. **Authentication not working**: Check that all environment variables are set correctly
3. **Google OAuth issues**: Verify Google OAuth is properly configured in Kinde

### Debug Mode

Enable debug mode by adding to your `.env.local`:
```bash
KINDE_DEBUG_MODE=true
```

### Health Check

Visit `/api/auth/health` to verify your Kinde configuration.

## Support

- [Kinde Documentation](https://docs.kinde.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Kinde Support](https://kinde.com/support)

## License

This project is licensed under the MIT License.
