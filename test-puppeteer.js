import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });  // Ejecuta en modo sin cabeza (sin interfaz gráfica)
  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/watch?v=gPyBheckpmQ&list=RDGMEMpH8c9Zsqn6C3SI9mUjwcawVM5Ue5FaL6x1Q&index=4');
  console.log(await page.title());  // Imprime el título de la página
  await browser.close();
})();
