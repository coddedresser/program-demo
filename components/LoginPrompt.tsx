"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPrompt({ onClose }: { onClose?: () => void }) {
  const router = useRouter();

  // ✅ Scroll user to top + disable background scroll while popup is active
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    // 🟢 Overlay that always stays visible regardless of scroll
    <div
      className="absolute top-0 left-0 w-full h-full z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm animate-fadeIn"
      style={{
        position: "fixed", // ensures it's above all content
        inset: 0, // covers viewport
      }}
    >
      <div
        className="mt-10 w-full max-w-sm px-4"
        style={{ position: "relative", top: 0 }}
      >
        <Card className="p-8 bg-white rounded-2xl shadow-2xl text-center border-4 border-orange-400 w-full">
          <h2 className="text-2xl font-extrabold text-orange-600 mb-4">
            Login to Continue
          </h2>
          <p className="text-gray-700 mb-6">
            You’ve used your 2 free generations. Login to continue creating and
            unlock full access!
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => router.push("/api/auth/login")}
              className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200"
            >
              Login Now
            </Button>
            <Button
              variant="outline"
              className="border-orange-400 text-orange-600 hover:bg-orange-50 transition-all duration-200"
              onClick={onClose}
            >
              Maybe Later
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
