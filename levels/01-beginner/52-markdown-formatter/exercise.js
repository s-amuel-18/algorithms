/**
 * Formateador de Texto Markdown Básico
 * 
 * Descripción: Convierte texto plano a formato Markdown básico (negritas, cursivas, listas).
 * Dificultad: BEGINNER
 * 
 * @param {string} text - Texto plano a formatear
 * @returns {string} Texto formateado en Markdown
 * 
 * Ejemplo:
 * formatMarkdown("**Hello** *world*") // Retorna texto con formato aplicado
 */

function formatMarkdown(text) {
    // TODO: Implementar la solución aquí
    
    // Pista 1: Valida que text sea un string
    if(typeof text !== 'string' ) throw new Error("text is required");
    
    // Pista 2: Convierte negritas: **texto** o __texto__ → <strong>texto</strong>
    
    // Pista 3: Convierte cursivas: *texto* o _texto_ → <em>texto</em>
    
    // Pista 4: Convierte listas no ordenadas: líneas que empiezan con - o * → <ul><li>...</li></ul>
    
    // Pista 5: Convierte listas ordenadas: líneas que empiezan con número. → <ol><li>...</li></ol>
    
    // Pista 6: Convierte encabezados: # Título → <h1>Título</h1>, ## Subtítulo → <h2>Subtítulo</h2>
    
    // Pista 7: Usa expresiones regulares para encontrar y reemplazar patrones
    
    // throw new Error('Función no implementada');
}

module.exports = formatMarkdown;

