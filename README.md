# MiscProps

This repository is a collection of useful react tools that I've made throughout building my projects.
It also includes useful Remix.js specific hoots and pre-scripts that do stuff like minifying css

# Table of contents

-   [Components](#components)
-   [Hooks](#hooks)
-   [Pre-Scripts](#pre-scripts)

# Components:

## [FetchData](components/fetchdata)

This component provides an easy way to provide fallback (pagination) and data fetching to your react project.

<details>
  <summary>Example</summary>

```JSX
// Where Page is a component
// https://randomuser.me/api is the data to fetch
<Data
    Display={Page}
    Fallback={<h1>Custom Fallback!</h1>}
    whereToFetch="https://randomuser.me/api"
    dummyProp={"testing!"}
    objTest={{firstOne: 1, secondOne: 2}}
/>
// For the example, https://randomuser.me/api" returns the object:
// {firstName: "Zack", lastName: "Santana"}
```

While the component loads, the "Fallback" will render.
Upon loading, "Page" will render **with** the following prop structure:

```javascript
{
    data: {
        firstName: "Zack",
        lastName: "Santana"
    },
    dummyProp: "testing!",
    objTest: {
        firstOne: 1,
        secondOne: 2
    }
}
```

</details>

## [Image](components/image)

This component allows you to use a potentially unsupported image type and supply a fallback image with a different type

<details>
  <summary>Example</summary>

```JSX
// Where img is a string pointing to the potentially unsupported image
// and imgAlt is the fallback image
<Image
    src={img}
    srcAlt={imgAlt}
    alt={"Showing an example of the Image Component!"}
    className="cool red"
    id="#cool-image"
    loading="lazy" />
```

</details>

# Hooks:

## [useElementSize](hooks/elementSize)

Allows a component to access an element's width and height and dynamically render based on them. You can also specify specific widths/heights to render on.

<details>
  <summary>Example</summary>

```JSX
export function DisplayDimensions() {
  const ref = useRef(); // Creates the ref to use on the <h1>
  const [width, height] = useElementSize(ref, [800], [20, 30]); // Calls hook, which returns array of [width, height]

  return (
    <div>
      <h1 ref={ref}>Header</h1>
      <p>Width of header: {width}</p>
      <p>Height of header: {height}</p>
    </div>
  );
}
```

The page will render a header and two paragraph tags that display the width and the height of the header.
The paragraph tags (the component) will update only when the width of the header goes to (or passes) 800 or the height of the header goes to (or passes) 20 or 30.

</details>

## [useWindowSize](hooks/windowSize)

Allows a component to access the window's width and height and dynamically render based on them. You can also specify specific widths/heights to render on.

<details>
  <summary>Example</summary>

```JSX
export function DisplayDimensions() {
  const [width, height] = useWindowSize([800], [20, 30]); // Calls hook, which returns array of [width, height]

  return (
    <div>
      <p>Width of header: {width}</p>
      <p>Height of header: {height}</p>
    </div>
  );
}
```

The page will render two paragraph tags, that display the width and height of the window (page).
<b>The paragraph tags (the component) will update only when the width of the window goes to (or passes) 800 or the height of the window goes to (or passes) 20 or 30.</b>

</details>

## [useEvent](hooks/event)

A short hook that allows for event listening and event dispatching.

<details>
  <summary>Example</summary>

```JSX
// A sample component that registers a listener, and dispatches an event on click
export function EventAndDispatch() {
  // Registering an event listener to the event "custombutton:click"
  const customButtonClick = useEvent("custombutton:click", (event) => {
    console.log(event); // Log the event object
  });

  // The button dispatches a custombutton:click
  return (
    <div>
      <p>Heyyy</p>
      <button onClick={customButtonClick({ type: "A test" })}>Click me!</button>
    </div>
  );
}
```

Clicking the button will log the event!

</details>

## [useForceUpdate](hooks/forceUpdate)

Returns a function that will force the component to rerender. The main purpose for this is when data changes outside of state.

<details>
  <summary>Example</summary>

```JSX
export function APIUser() {
    const location = useLocation();
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        forceUpdate();
    }, [forceUpdate, location]);

    return (
        <div>
            <p>Current Location: {location}</p>
        </div>
    );
}
```

In this example, the location variable might change and not cause a rerender of the component

</details>

## [useIsOverflow](hooks/overflow)

Monitors if a ref is overflowing from its parent

<details>
  <summary>Example</summary>

```JSX
export function APIUser() {
    const ref = createRef<HTMLDivElement>();
    const fetcher = useFetcher();

    useIsOverflow(
        ref,
        (of) => {
            if (of) {
                ref.current?.parentElement.classList.add("w-[500px]");
            }
        },
        40
    );

    return (
        <div className="w-[5px]">
            <div ref={ref}>Hey I might be a bunch of text or something!</div>
        </div>
    );
}
```

The code above will test if the div with text overflows outside its parent. It does so it adds a new class to the parent in the callback. It also specifies that the overflow has to be 40% more (i.e. if the child has 40% or less that is overflowing).

</details>

# Pre-Scripts

## [MinifyCSS](pre-scripts/minify-css.js)

Minifies/cleans all files in target directory. The default target directory is "app/\*\*" for the .js/.jsx/.tsx files and "app/styles" for the css files. This can be changed inside the file.

The file has two commands:

-   node minify-css.js clean
    -   Changes all references from ".min.css" to ".css"
    -   Deletes all minified css files (if any exists)
-   node minify-css.js minify
    -   Changes all references from ".css" to ".min.css" (if it is already .min.css, it does not change it)
    -   Creates all minified css files (overwriting if any exist)

You can add it to your package.json scripts, example shown:

```json
"start": "node minify-css.js minify && node ./start-file.js",
"dev": "node minify-css.js clean && node ./start-file.js"
```

or:

```json
"minify": "node minify-css.js",
"css:clean": "npm run minify -- clean",
"css:minify": "npm run minify -- minify"
```

Note that once you run `node minify-css.js minify` the files will NOT get the updated css files. This is meant for a production build.

## [Generate ENV](pre-scripts/generate-env.js)

Generates the ENV specified in the code. Is a simple way to help automate init scripts.

# Repo-specific information

## Motivation

After developing useful components or hooks, I usually forget about them- this is unfortunate as some of them are quite useful and can be used over and over. So I decided to make a repository that contains all of the ones I create.

## Code style

Components go inside the components folder, while hooks go inside the hooks folder. Each separate component/hook as its own folder that also has a test usecase/example, as well as comments alongside the code (if not there, TBA for that specific one) to understand why certain methods are used for the component/hook.

## Tech/framework used

<b>Built with</b>

<ul>
<li>- [<a href="https://reactjs.org/">React</a>] - Is the framework of this repo</li>
</ul>

Each component/hook is only using react.js unless specficially stated otherwise in the header of the file.

## Installation

Simply copying and pasting the hook/component is enough to use it, you may delete or edit them as you like.
If you would like to use any of the hooks/components, please credit me in the file.
