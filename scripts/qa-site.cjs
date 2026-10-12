const { chromium } = require('playwright')
const fs = require('node:fs/promises')

const baseUrl = process.env.QA_BASE_URL || 'http://localhost:5174'
const outputDir = process.env.QA_OUTPUT_DIR || '/tmp/ai-pm-portfolio-qa'
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

async function runViewport(browser, name, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
  const errors = []
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1150)
  await page.screenshot({ path: `${outputDir}/${name}-intro.png` })

  const introMetrics = await page.evaluate(() => ({
    viewport: [window.innerWidth, window.innerHeight],
    document: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
    bodyOverflow: getComputedStyle(document.body).overflow,
  }))

  await page.getByRole('button', { name: '进入作品集' }).click()
  await page.waitForTimeout(1100)
  await page.screenshot({ path: `${outputDir}/${name}-portfolio.png` })

  const portfolioMetrics = await page.evaluate(() => {
    const scroller = document.querySelector('.horizontal-scroller')
    return {
      document: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
      projectSlides: document.querySelectorAll('.project-slide').length,
      scrollerOverflowX: scroller ? getComputedStyle(scroller).overflowX : null,
      scrollerOverflowY: scroller ? getComputedStyle(scroller).overflowY : null,
    }
  })

  await page.getByRole('button', { name: '确认执行' }).click()
  const confirmed = await page.getByRole('button', { name: /已确认/ }).isVisible()
  await page.getByRole('button', { name: /返回介绍/ }).click()
  const returned = await page.getByRole('button', { name: '进入作品集' }).isVisible()

  await page.close()
  return { name, errors, introMetrics, portfolioMetrics, confirmed, returned }
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true })
  const browser = await chromium.launch({ executablePath: chromePath, headless: true })
  const results = [
    await runViewport(browser, 'desktop', { width: 1440, height: 1000 }),
    await runViewport(browser, 'mobile', { width: 390, height: 844 }),
  ]
  await browser.close()
  await fs.writeFile(`${outputDir}/results.json`, JSON.stringify(results, null, 2))
  console.log(JSON.stringify(results, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
