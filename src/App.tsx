import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import { useReveal } from "@/hooks/useReveal";
import { CartProvider } from "@/context/CartContext"; 

const queryClient = new QueryClient();

const App = () => {
  useReveal();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider> 
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/produto" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>

        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;