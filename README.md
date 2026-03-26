# Altered Cardboard static site scaffold

This is a one-page static showcase site built with plain HTML, CSS, and JavaScript. There is no framework and no server component.

## Structure

- `index.html` contains the section layout and anchor navigation.
- `css/style.css` contains the visual system and responsive layout.
- `js/data.js` is the content source for the repeatable sections.
- `js/main.js` renders the data and handles navigation behavior.
- `assets/images/` is reserved for screenshots, logos, and other visuals.

## How to update content

Most future edits should happen in `js/data.js`.

### Update company copy

Edit these objects:

- `hero`
- `about`
- `bga`
- `contact`

### Add a new showcased project

Add another object to the `projects` array with these fields:

- `title`
- `subtitle`
- `status`
- `role`
- `description`
- `url`
- `linkLabel`
- `palette` as an array of two hex colors
- `tags` as an array of short labels

### Add a published game or external link

Add another object to the `published` array with these fields:

- `title`
- `type`
- `summary`
- `url`
- `linkLabel`

## Images

The scaffold currently uses styled placeholder panels instead of requiring images. If you want to introduce screenshots later, add the files to `assets/images/` and extend the project card rendering in `js/main.js`.

## Preview locally

Because the site is plain static files, you can open `index.html` directly in a browser.

If you prefer a local server for cleaner testing, run one of these from the project root:

```bash
python3 -m http.server
```

or

```bash
npx serve .
```

Then open the local URL shown in the terminal.