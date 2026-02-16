import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Solution from "../components/Solution";
import Testimonials from "../components/Testimonials";
import CTAFinal from "../components/CTAFinal";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className="bg-white min-h-screen text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white">
                Passer au contenu principal
            </a>

            <Navbar />

            <main id="main-content">
                <Hero />
                <Problem />
                <Solution />
                <Testimonials />
                <CTAFinal />
            </main>

            <Footer />
        </div>
    );
}
