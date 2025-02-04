import Link from 'next/link';
import Image from 'next/image';
export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-3xl flex flex-col text-center justify-center items-center">
        <Image src="/robot-head.png" alt="Logo" width={128} height={128} className='mb-4'/>
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Your Drawing<br />is the Prompt
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Transform sketches into AI artwork
        </p>
        <Link 
          href="/app" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 hover:scale-105"
          tabIndex={0}
          aria-label="Start Drawing"
        >
          Get Started
        </Link>
        <footer className="fixed bottom-0 w-full p-4 text-center text-sm text-gray-400">
          <nav className="flex flex-wrap justify-center gap-4">
            <Link 
              href="https://tatami.dev"
              className="hover:text-white transition-colors"
              tabIndex={0}
              aria-label="About Us"
            >
              Made by Tatami Tuotanto
            </Link>
            <Link 
              href="/terms"
              className="hover:text-white transition-colors"
              tabIndex={0}
              aria-label="Terms of Use"
            >
              Terms of Use
            </Link>
            <Link 
              href="/privacy"
              className="hover:text-white transition-colors"
              tabIndex={0}
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/gdpr"
              className="hover:text-white transition-colors"
              tabIndex={0}
              aria-label="GDPR Information"
            >
              GDPR
            </Link>
            <Link 
              href="/feedback"
              className="hover:text-white transition-colors"
              tabIndex={0}
              aria-label="Give Feedback"
            >
              Feedback
            </Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}
