## Link to ticket:

[Add link to ticket]

## Link to feature environment:

[Add link to feature environment]

## Changes proposed in this PR:

[Explain what was done and why. You can also add screenshots here if it helps.]

## How to test:

### Testing locally:

1. rebuild the project locally with Lando, starting from scratch `./setup-lando.sh -c`
2. open another terminal window while both frontend and backend are running and run the Cypress tests: `lando npm run cypress:run`
3. also run the Ddev setup by running `./setup-ddev.sh -c` after having shut down lando with `lando poweroff` 

## Best practices:

<details>
<summary><h3>Accessibility:</h3></summary>
<p>
This project must support WCAG accessibility level AA <em>(edit this according to the requirements of your project)</em>. To ensure this standard is met, remember to:

- Perform automated checks using a tool such as Wave or SiteImprove.
- Test keyboard navigation: are all parts of the UI navigable using only the keyboard? Is the tab order logical? Can popups, menus etc be dismissed with the escape key?
- Test responsiveness, scaling and text reflow.
- Make sure no accessibility issues exist on either desktop or mobile views.
- If you have time, test with a screen reader such as VoiceOver (macOS), NVDA (Windows), or Orca (Linux).

Use the [Accessibility Testing Cheat Sheet](https://intra.wunder.io/info/accessibility-group/accessibility-testing-cheat-sheet) for information on how to run these tests.

</p>
</details>
