import { Switch, Route, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import BlogPost from "@/pages/BlogPost";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Photography from "@/pages/Photography";
import PhotoDetail from "@/pages/PhotoDetail";
import About from "@/pages/About";
import BlogIndex from "@/pages/BlogIndex";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Switch location={location}>
              <Route path="/" component={Home} />
              <Route path="/blog" component={BlogIndex} />
              <Route path="/blog/:slug" component={BlogPost} />
              <Route path="/projects" component={Projects} />
              <Route path="/projects/:slug" component={ProjectDetail} />
              <Route path="/photography" component={Photography} />
              <Route path="/photography/:id" component={PhotoDetail} />
              <Route path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
