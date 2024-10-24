// ---------------------------------------------//
// .......ExportaClientes para Whatsapp V1......//             
// ..... JJPedraza Whatsapp: +528333909869 .....//
//----------------------------------------------//

let contactos = []; // Aquí guardamos a nuestros nuevos amigos (y sus mensajes).

function captura() {
    // Vamos a cazar los elementos de la lista de chats como si fueran Pokémon.
    const chatItems = document.querySelectorAll('div[aria-label="Lista de chats"] [role="listitem"]');
    
    chatItems.forEach(function(item) {
        // Sacamos el nombre del contacto, como quien busca un tesoro escondido.
        const nombreContacto = item.querySelector('span[dir="auto"]')?.getAttribute('title');

        // Sacamos el último mensaje, porque todos queremos saber el último chisme.
        const ultimoMensaje = item.querySelector('[aria-label="Último mensaje"]')?.textContent || '';

        // Extraemos la fecha del último mensaje, para saber cuántos días hemos estado esperando esa respuesta.
        const fechaUltimoMensaje = item.querySelector('div._ak8i')?.textContent || '';

        // Aquí vamos a buscar la foto del perfil, porque un contacto sin foto es como una pizza sin queso.
        const fotoPerfil = item.querySelector('img')?.getAttribute('src') || '';

        if (nombreContacto) {
            // Checamos si el nombre es un número, porque ¿quién no quiere tener un contacto en forma de calculadora?
            if (/^\d+$/.test(nombreContacto) || /^[\d\s\+]+$/.test(nombreContacto)) {
                // Vemos si ya tenemos a este contacto en nuestra lista, no queremos repetir amigos.
                const contactoExistente = contactos.find(c => c.nombre === nombreContacto);
                if (!contactoExistente) {
                    // ¡Nuevo contacto a la vista! Agregamos su info como si estuviéramos construyendo una familia.
                    contactos.push({
                        nombre: nombreContacto,
                        mensaje: ultimoMensaje,
                        fecha: fechaUltimoMensaje,
                        foto: fotoPerfil
                    });
                } else {
                    // Ya está en nuestra lista, ¡como un viejo amigo que siempre está presente!
//                    console.log(nombreContacto + ' ya es parte del club de los contactos.');
                }
            } else {
                // Si no es un número, entonces solo estamos coleccionando nombres raros.
     //           console.log(nombreContacto + ' no parece un número, ¡pero sigue siendo interesante!');
            }
        }
    });

    // ¡Hora de lucir nuestras capturas en la consola! 
    console.log(`Ya hemos capturado a ${contactos.length} contactos, ¡sigue navegando o exporta antes de que se escapen!`);
    // console.log(contactos); // Si quieres ver quién se ha unido a la fiesta, descomenta esta línea.
}

// Función para exportar los contactos a un archivo CSV
function exporta() {
    // Primero checamos si hay contactos, no queremos hacer una fiesta si no hay nadie.
    if (contactos.length === 0) {
        console.log("No hay contactos para exportar. ¡A buscar más amigos!");
        return;
    }

    // Mensaje personalizado para el CSV, porque un toque personal nunca está de más.
    const mensajePersonalizado = "'+528333909869', Te sirvio? invitarme una chevecha te dejo mi paypal: printepolis@gmail.com Atte JJPedraza, Saludos";

    // Convertimos la lista de contactos a CSV, porque todos sabemos que los archivos son más divertidos.
    let csvContent = "data:text/csv;charset=utf-8," + 
                     mensajePersonalizado + "\n" + // Añadimos el mensaje que nadie pidió.
                     "Nombre,Fecha\n" + 
                     contactos.map(c => `${c.nombre},"${c.fecha}"`).join("\n");

    // Creamos un enlace para descargar el archivo CSV, como un regalo sorpresa.
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "WhatsApp_contactos.csv");

    // Agregamos el enlace al DOM y hacemos clic para descargar, ¡es como magia!
    document.body.appendChild(link);
    link.click();

    // ¡Adiós enlace! No queremos que se quede en la fiesta por mucho tiempo.
    document.body.removeChild(link);
}

// Función para iniciar la captura cada 10 segundos, porque en el mundo digital, un segundo cuenta.
function captura_iniciar() {
    // Ejecutamos la captura inicialmente, ¡vamos a hacer un gran inicio!
    captura();
    // Actualizamos los contactos cada 3 segundos, porque la vida es corta y los mensajes vuelan.
    setInterval(() => {
        captura(); // Actualizamos los contactos, como el fresco de la mañana.
    }, 3000); // 3000 ms = 3 segundos, porque no hay tiempo que perder.
}

// Ejemplo de uso
captura_iniciar(); // Llamamos a esta función para iniciar la captura, ¡que empiece la fiesta!
