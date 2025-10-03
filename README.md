# {StartupName} - Starter Website Package

This package contains the starter front-end assets for the {StartupName} website, a project focused on providing water recovery solutions for the brewing industry.

## Project Structure

```
/
├── index.html              # Home page
├── technology.html         # Technology & How It Works page
├── sustainability.html     # Sustainability & Impact page
├── roi.html                # ROI & Case Studies page
├── about.html              # About page
├── contact.html            # Contact page
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   ├── main.js         # Main JavaScript functionality
│   │   └── roi-calculator.js # ROI calculator module
│   └── images/
│       ├── placeholder-*.svg # Placeholder images
└── README.md               # This file
```

## Getting Started

This is a vanilla HTML, CSS, and JavaScript project with no build dependencies. To get started, simply open the `index.html` file in your web browser.

### Local Development

For a better development experience, you can use a simple local server. If you have Python installed, you can run:

```bash
python -m http.server
```

This will start a local server, and you can view the website at `http://localhost:8000`.

## Recommended Framework Path

While this starter package is built with vanilla technologies for simplicity, we recommend using a modern front-end framework for a production-ready website. Our recommended path is **Tailwind CSS** with a simple static site generator like **Eleventy** or **Astro**.

### Why Tailwind CSS?

- **Utility-First:** Rapidly build custom designs without writing custom CSS.
- **Responsive:** Easily create responsive layouts with intuitive utility classes.
- **Component-Based:** Perfect for building reusable UI components.
- **Performance:** Highly optimized for production with minimal CSS output.
- **Customizable:** Easily extend and customize the design system.

### Getting Started with Tailwind CSS

1.  **Install Dependencies:**

    ```bash
    npm install -D tailwindcss
    npx tailwindcss init
    ```

2.  **Configure `tailwind.config.js`:**

    ```javascript
    module.exports = {
      content: ["./**/*.html"],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

3.  **Create a CSS input file:**

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

4.  **Build the CSS:**

    ```bash
    npx tailwindcss -i ./src/input.css -o ./assets/css/styles.css --watch
    ```

This setup will provide a robust foundation for building a modern, responsive, and maintainable website.

## Placeholders

This project uses several placeholders that need to be replaced with actual values:

- `{StartupName}`
- `{ProductName}`
- `{TargetRegion}`
- `{AnnualWaterCost}`
- `{PaybackYears}`
- `{SustainabilityMetrics}`

These placeholders are found throughout the HTML, CSS, and JavaScript files. A global find-and-replace will be necessary to populate the site with real data.

## Next Steps

1.  **Replace Placeholders:** Update all placeholder values with actual project data.
2.  **Generate Visuals:** Create and replace all placeholder images with final brand assets.
3.  **Refine Copy:** Review and refine all website copy to match the final brand voice.
4.  **Deploy:** Deploy the website to a hosting provider like Netlify, Vercel, or GitHub Pages.

