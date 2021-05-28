# MiscProps

This repository is a collection of useful react tools that I've made throughout building my projects.

# Current Components:

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

# Current Hooks:

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
The paragraph tags (the component) will update only when the width of the window goes to (or passes) 800 or the height of the window goes to (or passes) 20 or 30.

</details>

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
