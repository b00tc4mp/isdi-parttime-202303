import { svg } from '../../assets/svg-paths.js'

export default function initThemeToggle(context) {
    const svgMoon = document.querySelector('.theme-toggle__label--moon').querySelector('path')
    const svgSun = document.querySelector('.theme-toggle__label--sun').querySelector('path')
    
    svgMoon.setAttribute('d', svg.moon)
    svgSun.setAttribute('d', svg.sun)
        
    let storedTheme = context.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme)

    const themeCheckbox = document.querySelector('.theme-toggle__checkbox');

    themeCheckbox.addEventListener('change', (event) => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let targetTheme = 'light';
        if (currentTheme === 'light') targetTheme = 'dark';
        document.documentElement.setAttribute('data-theme', targetTheme)
        context.setItem('theme', targetTheme);
    });
}