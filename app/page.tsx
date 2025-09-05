"use client"

import { useState, useEffect } from "react"
import { GradientBackground } from "@/components/gradient-background"
import { Button } from "@/components/ui/button"
import { Instrument_Serif, Roboto, Dancing_Script } from "next/font/google"
import { cn } from "@/lib/utils"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

const screens = [
  {
    id: 0,
    text: "Ma princesse?",
    subtext: "Lettre de ton président...",
    button: "Débuter",
    isLanding: true,
    hasSubtext: true,
  },
  {
    id: 1,
    text: "Je désire t'inviter à un rendez-vous exclusif.",
    button: "Je promets",
    isPromise: true,
  },
  {
    id: 2,
    text: "Promets moi une chose, Madame…",
    button: "Laquelle",
  },
  {
    id: 3,
    text: "Que tu seras ravissante pour ce moment unique.",
    button: "Je promets",
    isPromise: true,
  },
  {
    id: 4,
    text: "Promets moi de venir avec ta joie et toute ta tendresse. Sois très apaisée ce jour là.",
    button: "Je promets",
    isPromise: true,
  },
  {
    id: 5,
    text: "Si ce jour là je vois la moindre distraction en toi je sors la ceinture noire. Oui c'est une menace sérieuse ma fleur.",
    button: "Je promets papa",
  },
  {
    id: 6,
    text: "**Samedi, 20h30**\n**Dress code :** Rouge ou Noir\n**Lieu :** Facetime",
    button: "Je confirme",
    isProfessional: true,
    isDarkButton: true,
  },
  {
    id: 7,
    text: "Je t'attendrai. N'oublie pas la boîte blanche okay ?",
    button: "Promis mon Daddy ❤️",
  },
  {
    id: 8,
    text: "Ma Reine Esther ?",
    button: "Mon papa ?",
  },
  {
    id: 9,
    text: "Je t'aime ❤️",
    signature: "RT",
    isLast: true,
  },
]

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const [isInitialBlur, setIsInitialBlur] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialBlur(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleNext = () => {
    if (current.isDarkButton) {
      setShowSignature(true)
      setTimeout(() => {
        setShowSignature(false)
        if (currentScreen < screens.length - 1) {
          setIsAnimating(true)
          setTimeout(() => {
            setCurrentScreen(currentScreen + 1)
            setIsAnimating(false)
          }, 300)
        }
      }, 2000)
    } else if (currentScreen < screens.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentScreen(currentScreen + 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const current = screens[currentScreen]

  return (
    <main className="relative h-screen flex items-center justify-center overflow-hidden">
      <GradientBackground />

      <section
        className={cn(
          "relative z-20 px-8 max-w-2xl mx-auto text-center transition-all duration-1000 ease-in-out",
          isAnimating ? "opacity-0 scale-95 blur-md" : "opacity-100 scale-100",
          isInitialBlur ? "blur-lg opacity-60" : "blur-none opacity-100",
          current.isProfessional && !isAnimating ? "bg-black border border-white/10 rounded-[15px] p-5 shadow-2xl shadow-black/90" : "",
        )}
      >
        <div className={cn("space-y-12", current.isProfessional ? "space-y-5" : "")}>
          {/* Main text */}
          <div className="space-y-6">
            <h1
            className={cn(
              current.isProfessional ? roboto.className : instrumentSerif.className,
              "text-white text-balance",
                current.isLast ? "text-5xl italic font-normal" : "text-4xl md:text-5xl",
                current.isLanding ? "text-4xl md:text-5xl font-bold tracking-widest" : "",
                current.isProfessional
                  ? "font-normal text-base leading-normal"
                  : "font-normal leading-relaxed",
              )}
            >
              {/* Main text */}
              {current.text.split("\n").map((line, index) => {
                // Parse bold markdown syntax
                const parts = line.split(/\*\*(.*?)\*\*/);
                return (
                  <span key={index} className={cn(
                    "block", 
                    current.isProfessional ? "mb-4" : "",
                    // Apply letter spacing except for "Ma Esther?" (first line of first screen)
                    !(current.id === 0 && index === 0) ? "tracking-wider" : ""
                  )}>
                    {parts.map((part, partIndex) => 
                       partIndex % 2 === 1 ? (
                         <span key={partIndex} className="font-bold transition-all duration-300 ease-in-out">{part}</span>
                       ) : (
                         part
                       )
                     )}
                    {index < current.text.split("\n").length - 1 && <br />}
                  </span>
                );
              })}
              
              {/* Subtext */}
              {current.subtext && (
                <span className="block text-sm opacity-70 mt-2 tracking-wider">
                  {current.subtext}
                </span>
              )}
            </h1>

            {current.signature && (
              <div className="mt-8">
                <p className="text-white font-bold text-2xl tracking-wider">{current.signature}</p>
              </div>
            )}

            {showSignature && (
              <div className="mt-8">
                <p className={cn(dancingScript.className, "text-white text-4xl")}>Esther</p>
              </div>
            )}
          </div>

          {/* Button */}
          {current.button && (
            <div className="flex justify-center">
              <Button
                onClick={handleNext}
                variant={current.isPromise ? "ghost" : "default"}
                size="lg"
                className={cn(
                  "transition-all duration-300 hover:scale-105",
                  current.isPromise
                    ? "text-black bg-white hover:bg-white border-2 border-white px-8 py-4 text-lg"
                    : current.isDarkButton
                    ? "bg-black text-white hover:bg-gray-900 border border-white/20 rounded-[15px] px-4 py-4 text-base font-medium"
                    : "bg-white text-black hover:bg-white px-8 py-4 text-lg font-medium",
                )}
              >
                {current.button}
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
