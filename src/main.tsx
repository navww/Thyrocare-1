import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BackgroundProvider } from './contexts/BackgroundContext.tsx';
import { BlogProvider } from './contexts/BlogContext.tsx';
import { BloodTestProvider } from './contexts/BloodTestContext.tsx';
import { SliderProvider } from './contexts/SliderContext.tsx';

createRoot(document.getElementById("root")!).render(
  <BackgroundProvider>
    <BlogProvider>
      <BloodTestProvider>
        <SliderProvider>
          <App />
        </SliderProvider>
      </BloodTestProvider>
    </BlogProvider>
  </BackgroundProvider>
);
