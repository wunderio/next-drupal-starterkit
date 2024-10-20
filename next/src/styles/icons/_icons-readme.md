# Icons

To add a new icon, follow the steps below:

1. Add the icon SVG to this directory.
2. Remove any hardcoded `width` and `height` properties from the SVG (`viewBox` must be kept). Ensure it has `style="fill: currentColor;"` so that the icon's colour can be styled with CSS.
3. To use the icon, import it from the `"@/styles/icons"` directory. Since it's a default export, you can name it as you like, but it's common to use the icon name followed by the word "Icon". For example `import ExampleIcon from '@/styles/icons/example.svg';`. Then use it as a component while supplying the Tailwind classNames for styling: `<ExampleIcon className="h-6 w-6 rotate-90 text-dark-blue" />`.
