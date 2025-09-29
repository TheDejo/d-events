


# **Divine's Corner**

### **How to run this application**


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Create `.env.local` paste these Environment variables:

```ts
NEXT_PUBLIC_BASE_URL=https://events-api.dice.fm/v1
NEXT_PUBLIC_ENVIRONMENT=development
```

# **How I approached solving the problem?**

I approached the solution looking at it as a client facing product and factored in three things, SEO, Accesibility and Internalization.

## **SEO, Accessibility & Internationalization**

### **SEO (Search Engine Optimization)**
- **Semantic HTML**: Proper heading hierarchy (`<h1>`, `<h2>`, `<h4>`) and semantic elements (`<main>`, `<section>`, `<article>`, `<time>`)
- **Metadata**: Root layout includes proper `title` and `description` for search engines
- **Image optimization**: Next.js Image component with descriptive alt text and priority loading
- **Structured data**: `<time>` elements with `dateTime` attributes for event dates

### **Accessibility (A11y)**
- **ARIA implementation**: Comprehensive landmarks, live regions, and state indicators
- **Keyboard navigation**: Full keyboard support with arrow keys, Enter/Space, and focus management
- **Screen reader support**: Descriptive labels, status announcements, and context information
- **Component accessibility**: All interactive elements have meaningful `aria-label` and `aria-labelledby` attributes

### **Internationalization (i18n)**
- **Text externalization**: All user-facing text stored in component-level `.texts.json` files
- **Locale-aware formatting**: `Intl.NumberFormat` and `date-fns` for currency, dates, and numbers
- **Template strings**: Dynamic content with placeholders like `{venue}`, `{title}`, `{price}`
- **Contextual messaging**: Different text based on component state and user interactions

## **Code Architecture & Approach**

### **Component-Driven Development**
- **Modular components**: Each component is self-contained with its own styles, tests, and translations
- **Reusable patterns**: Button, Accordion, and other UI components follow consistent prop interfaces
- **Separation of concerns**: Business logic in custom hooks, UI logic in components

### **Architecture & Abstractions**
- **Central configuration**: Environment variables, API routes, and constants centralized in `config/constants.ts`
- **Service layer**: Abstracted API calls with typed interfaces and error handling in `config/services/`
- **Type system**: Comprehensive TypeScript interfaces and enums for type safety across the application
- **Custom hooks**: Reusable logic for debouncing, keyboard navigation, and state management
- **Utility functions**: Centralized helpers for formatting, date manipulation, and common operations

### **State Management**
- **Context API**: Global event state management with `EventsContext` and `EventsProvider`
- **SWR integration**: Server state management with caching, revalidation, and error handling
- **Local state**: Component-level state for UI interactions (accordion, search, etc.)
- **Persistent storage**: Custom `useLocalStorage` hook for client-side data persistence (recent venues)

### **Testing Strategy**
- **Comprehensive coverage**: Unit tests for components, integration tests for user flows
- **Mock strategy**: Real context providers with mocked data layers for realistic testing

### **Performance Optimization**
- **Code splitting**: Strategic use of `'use client'` for interactive components only
- **Image optimization**: Next.js Image component with priority loading and responsive images

### **Developer Experience**
- **TypeScript**: Full type safety with custom interfaces and utility types
- **SCSS modules**: Scoped styling with design tokens and mixins
- **ESLint/Prettier**: Consistent code formatting and quality standards

### **Tools**:
    - Next.js: Since Create React App is being deprecated (as noted on the React website), Next.js is the recommended choice. It also enables me to showcase server-side rendering (SSR), which is important for this project because the events are client-facing and need to be optimized for SEO, ensuring they appear in search results when users look for events.
    
    - SASS: I chose a preprocessor so I can define mixins, functions, and style tokens that capture design decisions. This allows consistent styling across the events application and makes the codebase more maintainable and scalable.

    - date-fns: A lightweight library that makes working with and formatting dates seamles

    - classnames: Utility for cleaner, more readable conditional styling, avoiding complex template literals when applying multiple classes.

    - SWR: Integrated to enable frontend data caching with stale-while-revalidate, ensuring fast rendering from cache while seamlessly updating with fresh data in the background.

    - Lodash: Used for concise and reliable helper functions, simplifying common data manipulation tasks.

### **Time Spent**

I spent approximately **5.5 hours** on this exercise.

### **What I would add if I had more time and how?**

#### **Testing Infrastructure**
- **MSW (Mock Service Worker)**: Initially attempted but removed due to high overhead and complexity. Would implement for more realistic API mocking in development and testing environments
- **E2E Testing**: Cypress for end-to-end user journey testing

#### **User Experience**
- **More Filters**: Add tags, promoters, date from filters
- **Map Integration**: Show event locations on an interactive map

#### **Developer Experience**
- **Storybook**: Component documentation and design system showcase

<img width="439" height="457" alt="Screenshot 2025-09-29 at 20 32 46" src="https://github.com/user-attachments/assets/65cdf029-0261-4feb-ab74-872966daebac" />







