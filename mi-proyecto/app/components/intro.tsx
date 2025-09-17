export default function HomePage() {
    return (
        <header>
            <h1>Primer acercamiento a Next.js</h1>
            <nav style={{ marginTop: '10px' }}>
                <a href="#" style={{ marginRight: '10px' }}>Inicio</a>
                <a href="/about" style={{ marginRight: '10px' }}>Acerca de mí</a>
                <a href="/contact">Contacto</a>
            </nav>
        </header>
        
    );
}