# Accomplishment Tracking Platform

This is a **Next.js** application designed for organizations to track, manage, and showcase student accomplishments. The codebase is modular, scalable, and follows best practices for maintainability and future updates.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Key Features](#key-features)
- [Customization](#customization)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

---

## Project Overview

This platform allows organizations to:

- List and filter student profiles by category (Academics, Athletics, Awards, etc.)
- View detailed accomplishment summaries
- Download profiles as PDF
- Manage user authentication and profiles
- Provide a responsive, modern UI

---

## Tech Stack

- **Frontend:** Next.js (React), Tailwind CSS
- **State Management:** React Query, Formik
- **Validation:** Yup
- **Notifications:** react-hot-toast
- **Icons & Images:** SVG, Next/Image
- **Other:** ESLint, Prettier, Husky (pre-commit hooks)

---

## Folder Structure

```
├── public/                # Static assets (images, fonts)
├── src/
│   ├── app/               # Next.js app directory (routing, global styles)
│   ├── components/        # Reusable UI and common components
│   ├── constants/         # Static data, enums, routes
│   ├── schemas/           # Form validation schemas (Yup)
│   ├── services/          # API calls and mutations
│   ├── views/             # Page views (Home, Profile, Auth, Student Details)
│   ├── lib/               # Utility functions
│   ├── providers/         # Context and providers (React Query)
│   └── middleware.ts      # Route protection logic
├── .husky/                # Git hooks
├── .eslintrc.json         # ESLint config
├── .prettierrc.js         # Prettier config
├── next.config.ts         # Next.js config
├── package.json           # Project metadata and scripts
└── README.md              # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm, npm, or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-org/accomplishment.git
   cd accomplishment
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```sh
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Key Features

- **Student Profiles:** Modular cards for Academics, Athletics, Awards, Talents, Employment, etc.
- **Filtering:** Categories defined in [`src/constants/filters.ts`](src/constants/filters.ts)
- **Authentication:** Sign Up, Sign In, Password Reset, Email Verification
- **Profile Management:** Edit profile, change password, delete account ([`src/views/pages/Profile`](src/views/pages/Profile/index.tsx))
- **Subscription:** Modal-based subscription management ([`src/views/pages/Profile/subscription.tsx`](src/views/pages/Profile/subscription.tsx))
- **PDF Download:** Download accomplishment summaries ([`src/views/pages/Student-Details/index.tsx`](src/views/pages/Student-Details/index.tsx))
- **Responsive Design:** Custom fonts ([`public/fonts.ts`](public/fonts.ts)), Tailwind CSS ([`src/app/globals.css`](src/app/globals.css))
- **Notifications:** Toast feedback for user actions

---

## Customization

- **Add/Remove Categories:** Update [`src/constants/filters.ts`](src/constants/filters.ts)
- **Change UI Styles:** Edit [`src/app/globals.css`](src/app/globals.css)
- **Update Fonts:** Modify [`public/fonts.ts`](public/fonts.ts)
- **Edit Profile Sidebar:** See [`src/constants/profile.ts`](src/constants/profile.ts)
- **API Endpoints:** Update in [`src/services/`](src/services/) and [`src/constants/routes.ts`](src/constants/routes.ts)
- **Validation Rules:** Edit schemas in [`src/schemas/`](src/schemas/).

---

## Deployment

Deploy on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) or any platform supporting Next.js.

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## Contributing

- Follow code style guidelines (ESLint, Prettier)
- Use feature branches and submit pull requests
- Write clear commit messages
- Add documentation for new features

---

## Support

For issues or feature requests, contact your organization’s project manager or open an issue in the repository.

---

## License

MIT

---

**For future developers:**

- All UI components are in [`src/components/`](src/components/).
- Page logic and routing are in [`src/views/`](src/views/) and [`src/app/`](src/app/).
- API and mutations are in [`src/services/`](src/services/).
- Update validation schemas in [`src/schemas/`](src/schemas/).
- Use the modular structure for easy feature addition or modification..
