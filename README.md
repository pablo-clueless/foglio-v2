# Foglio v2

**The next generation portfolio and resume builder**

Foglio is a modern, AI-powered platform that helps professionals create ATS-friendly resumes and stunning portfolios. Build, customize, and deploy your professional presence with ease.

## Features

- **AI-Powered Resume Building** - Create ATS-friendly, keyword-rich resumes with intelligent optimization and scoring
- **8 Professional Templates** - Choose from Classic, Corporate, Creative, Elegant, Executive, Minimal, Modern, and Professional designs
- **Rich Text Editing** - Full-featured editor with drag-and-drop functionality
- **Instant Deploy** - Global CDN hosting with SSL certificates
- **Real-time Notifications** - WebSocket-powered live updates
- **Job Management** - Browse, apply, and track job applications
- **Recruiter Tools** - Post jobs, discover talent, and manage applications
- **Analytics & SEO** - Track performance with built-in analytics

## Tech Stack

| Category         | Technologies                               |
| ---------------- | ------------------------------------------ |
| Framework        | Next.js 15, React 19, TypeScript 5         |
| State Management | Redux Toolkit (RTK Query), Zustand, XState |
| Styling          | Tailwind CSS 4, Radix UI, shadcn/ui        |
| Animation        | Framer Motion                              |
| Forms            | Formik, Yup                                |
| Rich Text        | Tiptap                                     |
| Real-time        | Socket.io                                  |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/pablo-clueless/foglio-v2.git
cd foglio-v2

# Install dependencies
pnpm install
# or
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_SERVER_URI="https://foglio-v2-go.onrender.com/api/v2"
NEXT_PUBLIC_WSS_URI="wss://foglio-v2-go.onrender.com/api/v2/ws"
SERVER_URI="https://foglio-v2-go.onrender.com/api/v2"
WSS_URI="wss://foglio-v2-go.onrender.com/api/v2/ws"
NODE_ENV="development"
```

### Development

```bash
# Start development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Scripts

| Command                  | Description                             |
| ------------------------ | --------------------------------------- |
| `npm run dev`            | Start development server with Turbopack |
| `npm run build`          | Build for production                    |
| `npm start`              | Start production server                 |
| `npm run lint`           | Run ESLint                              |
| `npm run prettier:check` | Check code formatting                   |
| `npm run prettier:write` | Format source files                     |
| `npm run check`          | Run lint and format check               |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── admin/             # Admin panel
│   ├── jobs/              # Public job listings
│   └── ...
├── api/                    # RTK Query API definitions
├── components/
│   ├── ui/                # Base UI components
│   ├── shared/            # Shared components
│   ├── modules/           # Feature modules
│   └── providers/         # React context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── store/                  # State management
├── types/                  # TypeScript types
└── config/                 # Configuration files
```

## Resume Templates

Foglio includes 8 professionally designed resume templates:

- **Classic** - Traditional, timeless design
- **Corporate** - Business-focused professional look
- **Creative** - Bold design for creative professionals
- **Elegant** - Refined, sophisticated styling
- **Executive** - Premium design for senior roles
- **Minimal** - Clean, distraction-free layout
- **Modern** - Contemporary, fresh aesthetic
- **Professional** - Balanced, versatile design

## Authentication

- Email/password authentication
- GitHub OAuth integration
- OTP verification
- Role-based access (Talent/Recruiter)
- Secure token-based sessions

## License

This project is private and proprietary.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## Links

- [Live Demo](https://foglio-v2.vercel.app)
- [Backend API](https://foglio-v2-go.onrender.com)
