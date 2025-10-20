"use client"

export default function Footer() {
  return (
    <footer
        style={{
            width: '100%',
            backgroundColor: '#333',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
        }}
    >
        <p>© 2025 Pokédex. All rights reserved.</p>
        <p> Made by Guido Bailon (Por favor no me demandes Nintendo)</p>
    </footer>
  );
}
