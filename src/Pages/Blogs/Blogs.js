import React from "react";
import useTitle from "../../Hooks/useTitle";

const Blogs = () => {
  useTitle("Blogs");

  return (
    <div className="py-3 mx-auto">
      <div className="bg-slate-300 rounded-lg mx-5 mb-5 md:mx-10">
        <h2 className="bg-slate-400 text-xl font-bold px-4 py-3 rounded-t-lg">
          What are the different ways to manage a state in a React application?
        </h2>
        <div className="px-4 py-3">
          There are four main types of state you need to properly manage in your
          React apps:
          <ul className="ml-5 list-disc">
            <li>Local state</li>
            <li>Global state</li>
            <li>Server state</li>
            <li>URL state</li>
          </ul>
          <br />
          <b>Local state:</b> Local state is data we manage in one or another
          component. Local state is most often managed in React using the
          useState hook. For example, local state would be needed to show or
          hide a modal component or to track values for a form component, such
          as form submission, when the form is disabled and the values of a
          form's inputs.
          <br />
          <b>Global state:</b> Global state is data we manage across multiple
          components. Global state is necessary when we want to get and update
          data anywhere in our app, or in multiple components at least. A common
          example of global state is authenticated user state. If a user is
          logged into our app, it is necessary to get and change their data
          throughout our application.
          <br />
          <b>Server state:</b> Data that comes from an external server that must
          be integrated with our UI state. Server state is a simple concept, but
          can be hard to manage alongside all of our local and global UI state.
          There are several pieces of state that must be managed every time you
          fetch or update data from an external server, including loading and
          error state. Fortunately there are tools such as SWR and React Query
          that make managing server state much easier.
          <br />
          <b>URL state:</b> Data that exists on our URLs, including the pathname
          and query parameters. URL state is often missing as a category of
          state, but it is an important one. In many cases, a lot of major parts
          of our application rely upon accessing URL state. Try to imagine
          building a blog without being able to fetch a post based off of its
          slug or id that is located in the URL!
        </div>
      </div>
      <div className="bg-slate-300 rounded-lg mx-5 mb-5 md:mx-10">
        <h2 className="bg-slate-400 text-xl font-bold px-4 py-3 rounded-t-lg">
          How does prototypical inheritance work?
        </h2>
        <p className="px-4 py-3">
          The Prototypal Inheritance is a feature in javascript used to add
          methods and properties in objects. It is a method by which an object
          can inherit the properties and methods of another object.
          Traditionally, in order to get and set the [[Prototype]] of an object,
          we use Object. getPrototypeOf and Object
        </p>
      </div>
      <div className="bg-slate-300 rounded-lg mx-5 mb-5 md:mx-10">
        <h2 className="bg-slate-400 text-xl font-bold px-4 py-3 rounded-t-lg">
          What is a unit test? Why should we write unit tests?
        </h2>
        <p className="px-4 py-3">
          A unit test is a way of testing a unit - the smallest piece of code
          that can be logically isolated in a system.
          <br />
          Developers write unit tests for their code to make sure that the code
          works correctly. This helps to detect and protect against bugs in the
          future. Sometimes developers write unit tests first, then write the
          code.
        </p>
      </div>
      <div className="bg-slate-300 rounded-lg mx-5 mb-5 md:mx-10">
        <h2 className="bg-slate-400 text-xl font-bold px-4 py-3 rounded-t-lg">
          React vs. Angular vs. Vue?
        </h2>
        <p className="px-4 py-3">
          Angular JS, Vue JS and React JS frameworks are used to create web
          interfaces for front end development.
          <br />
          Angular utilizes real DOM, which renders the entire web/app page even
          when a single component is changed. On the other hand, Vue. js employs
          Virtual DOM, which only renders the real DOM upon the components that
          have been changed.
          <br />
          The difference between React and Vue is in the methods used to render
          content in the DOM. Vue uses HTML and JSX templates, while React uses
          only JSX. While JSX is designed to speed up and greatly simplify
          complex tasks, it can also greatly complicate what was originally
          intended to be a simple task.
        </p>
      </div>
    </div>
  );
};

export default Blogs;
