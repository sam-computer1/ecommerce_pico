# PICo.

A modern, responsive e-commerce platform built with Next.js, TypeScript, and Tailwind CSS. PICo. offers a seamless shopping experience with features like dark mode, responsive design, and a user-friendly interface.

## Features

### 🛍️ Shopping Experience
- Responsive product grid with filtering and sorting options
- Category-based navigation (Men, Women, Kids)
- Detailed product pages with size selection
- Shopping cart functionality
- Wishlist management
- Search functionality with real-time results

### 🎨 User Interface
- Modern and clean design
- Dark/Light mode toggle
- Responsive layout for all devices
- Smooth animations and transitions
- Interactive dropdown menus
- Mobile-friendly navigation

### 👤 User Features
- User account management
- Order tracking
- Wishlist management
- Shopping cart persistence
- Profile settings

### 🛠️ Technical Features
- Built with Next.js 14 and TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Context API for state management
- Responsive design
- SEO optimized
- Server-side rendering

## Tech Stack

- **Framework:** Next.js 
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** React Context API
- **UI Components:** Custom components with shadcn/ui
- **Icons:** Lucide Icons
- **Theme:** next-themes

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pico-ecommerce.git
cd pico-ecommerce
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
pico-ecommerce/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (shop)/            # Shop routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # UI components
│   ├── header.tsx        # Navigation header
│   └── footer.tsx        # Footer component
├── context/              # React Context providers
├── lib/                  # Utility functions
├── public/              # Static assets
└── styles/              # Global styles
```

## Features in Detail

### Navigation
- Responsive header with dropdown menus
- Mobile-friendly navigation
- Category-based navigation
- Search functionality
- Cart and wishlist indicators

### Product Management
- Product filtering by category, size, color
- Sorting options
- Product grid view
- Detailed product pages
- Size selection
- Add to cart/wishlist functionality

### User Experience
- Smooth page transitions
- Loading states
- Error handling
- Form validation
- Responsive design for all devices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)
