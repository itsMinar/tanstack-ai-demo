## Chat Application

This project is a chat application built using Next.js and the TanStack AI library. It provides a real-time chat interface with an AI assistant.

### Features

- **Real-time Messaging**: Communicate with the AI assistant in real-time.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Customizable UI**: Built with Tailwind CSS for easy customization.

### Screenshot

Below is a screenshot of the application:

![Chat Application Screenshot](./Screenshot.png)

### How to Use

1. Clone the repository:

   ```bash
   git clone https://github.com/itsMinar/tanstack-ai-demo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd tanstack-ai-demo
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### File Structure

- `src/app/page.tsx`: Main chat interface.
- `src/app/api/chat/route.ts`: API route for handling chat messages.
- `src/lib/utils.ts`: Utility functions.

### Technologies Used

- **Next.js**: React framework for building server-side rendered applications.
- **@tanstack/ai-react**: Library for AI-powered chat functionality.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### License

This project is licensed under the MIT License.
