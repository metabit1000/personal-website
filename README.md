# Àlex Aguilera Martínez - Portfolio

A modern, high-performance personal portfolio website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. 

This project showcases my professional experience, technical skills, and featured projects in a sleek, dark-mode interface with glassmorphism effects and smooth animations. It features an integrated **AI Chatbot** powered by Google Gemini with gemma-3-27b to answer questions about my profile in real-time.

![Portfolio Preview](https://github.com/metabit1000/personal-website/raw/main/public/preview.png)

## 🚀 Features

- **Modern UI/UX:** Premium dark aesthetic with glassmorphism cards and responsive design.
- **Interactive AI Chatbot:** A floating chat widget that uses RAG (Retrieval-Augmented Generation) to answer questions about my background, skills, and projects.
- **Smooth Animations:** Powered by `framer-motion` for engaging scroll reveals and interactions.
- **Dynamic Content:** Sections for Experience, Skills, Projects, Certifications, and Contact.
- **Performance Optimized:** Built on Next.js App Router for optimal speed and SEO.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/docs) + [Google Gemini API](https://ai.google.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/metabit1000/personal-website.git
   cd personal-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Google Gemini API key:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
├── app/                  # Next.js App Router pages and API routes
│   ├── api/chat/         # API route for the AI chatbot
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main landing page
├── components/           # Reusable UI components
│   ├── Certifications.tsx
│   ├── ChatWidget.tsx    # AI Chatbot component
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   └── ...
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/metabit1000/personal-website/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**© 2025 Àlex Aguilera Martínez**
