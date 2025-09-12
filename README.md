# <img src="./public/cutfly_logo.webp" alt="Cutfly logo" width="36" style="vertical-align:middle; margin-right:8px"> Cutfly

**Fly shorter, Reach further**

A modern, open-source URL shortener built with Next.js 15, designed for developers who demand control and performance. Create short links with smart insights and a beautiful, responsive interface.

## ✨ Features

- 🔗 **Custom Short Codes** - Create memorable, branded short links
- 📊 **Click Analytics** - Track link performance with click counters
- 🎨 **Beautiful UI** - Modern design with dark/light theme support
- 🔐 **GitHub Authentication** - Secure login with GitHub OAuth
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed
- 🗄️ **Turso Database** - Powered by SQLite for reliability
- 🎯 **Protected Routes** - Prevents conflicts with system routes
- 📈 **Link Management** - Full CRUD operations for your links
- 🌈 **Animated UI** - Beautiful animations and micro-interactions

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + Custom components
- **Database:** [Turso](https://turso.tech/) (SQLite)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) with GitHub provider
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- GitHub OAuth App
- Turso account and database

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/cutfly.git
   cd cutfly
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in your environment variables:

   ```env
   # NextAuth
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000

   # GitHub OAuth
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret

   # Turso Database
   TURSO_DATABASE_URL=your-turso-database-url
   TURSO_AUTH_TOKEN=your-turso-auth-token
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Creating Short Links

1. **Sign in** with your GitHub account
2. **Navigate** to the dashboard
3. **Click** "Create Link" button
4. **Fill in** the form:
   - **URL:** The original URL you want to shorten
   - **Short Code:** Custom short code (or leave empty for auto-generation)
   - **Description:** Optional description for the link
5. **Save** and start sharing your short link!

### Managing Links

- **View all links** in your dashboard
- **Edit links** by clicking the edit button
- **Delete links** with confirmation dialog
- **Track clicks** with real-time counters
- **Copy links** with one-click copy button

### Accessing Short Links

Simply visit: `https://yoursite.com/[code]` and you'll be redirected to the original URL.

## 🔧 Configuration

### Protected Routes

The following routes are automatically protected and cannot be used as short codes:

- `dashboard`
- `login`
- `api`

You can modify this list in [`src/lib/data.ts`](src/lib/data.ts):

```typescript
const PROTECTED_ROUTES = ["dashboard", "login", "api"];
```

### Link Limits

Each user can create up to 30 links. This limit can be modified in [`src/lib/actions.ts`](src/lib/actions.ts):

```typescript
if (userLinks.length >= 30) {
  return { success: false, error: "Link limit reached. Maximum 30 links allowed per user." };
}
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── [code]/            # Dynamic route for short links
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Authentication page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ui/               # UI components (buttons, dialogs, etc.)
│   ├── magicui/          # Animated UI components
│   ├── ConfirmationDialog.tsx
│   ├── Header.tsx
│   ├── LinkCard.tsx
│   └── ...
├── lib/                  # Utility functions
│   ├── actions.ts        # Server actions
│   ├── data.ts          # Database queries
│   ├── utils.ts         # Utility functions
│   └── turso-client.ts  # Database client
├── hooks/               # Custom React hooks
├── schemas/            # Zod validation schemas
└── assets/            # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Made by [Omar Mancilla](https://github.com/omancillav)

⭐ Star this repository if you find it helpful!
