import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';  // Importar 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname);  // Esto simula `__dirname` en ES Modules


export const realizarScraping = async (dni) => {
  let browser;
  let page;
  try {
    // Lanzar el navegador en modo headless (sin UI) para mayor eficiencia
    browser = await puppeteer.launch({
      headless: false,  // Usar `false` para que se vea el navegador durante el scraping
      args: ['--no-sandbox', '--disable-setuid-sandbox'],  // Asegura compatibilidad
    });

    page = await browser.newPage();

    // Navegar a la página con espera explícita
    await page.goto(`https://servicios.distriluz.com.pe/OficinaVirtualConsulta/Consultas/Consultas/ConsultaMiRecibo?dni=${dni}`, {
      waitUntil: 'domcontentloaded',  // Espera a que se cargue el contenido básico de la página
    });

    // Esperar a que el selector del campo 'cmbType' esté disponible y sea visible
    await page.waitForSelector('#cmbType', { visible: true });

    // Seleccionar la opción 'DNI'
    await page.select('#cmbType', '2');

    // Esperar a que el campo de entrada del DNI esté disponible y sea visible
    await page.waitForSelector('#txtIdNroServicio', { visible: true });

    // Escribir el DNI completo
    await page.focus('#txtIdNroServicio');
    await page.type('#txtIdNroServicio', dni);

    // Esperar a que el botón 'Consultar' sea visible y clickeable
    await page.waitForSelector('#btnSearch', { visible: true });

    // Hacer clic en el botón 'Consultar'
    await page.click('#btnSearch');


    // Esperar a que el elemento con id "imgRecibo" esté visible
    await page.waitForSelector('#imgRecibo', { visible: true,});  // Esperar hasta 30 segundos

    

     

    

    // Esperar un poco más para asegurarnos de que la página cargue la respuesta
    // Definir la ruta para guardar el PDF
    const folderPath = path.join( 'expedientes', dni); // Ruta para la carpeta del cliente
    const pdfPath = path.join(folderPath, 'consulta.pdf'); // Ruta del archivo PDF

    // Crear la carpeta si no existe
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }


    // Generar el PDF de la página
    await page.pdf({
      path: pdfPath,        // Ruta donde guardar el PDF
      format: 'A4',         // Tamaño de página
      printBackground: true // Imprimir los fondos (útil si la página tiene fondos de color)
    });

    console.log(`PDF guardado en: ${pdfPath}`);

    

    // Verificar si la página no se cerró inesperadamente
    if (page.isClosed()) {
      console.error("La página se cerró inesperadamente.");
      return;
    }

    

    

  } catch (error) {
    console.error("Error durante el scraping:", error);
  } finally {
    if (browser) {
      // Cerrar el navegador
      
    }
  }
};
