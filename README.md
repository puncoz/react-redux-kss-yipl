# KSS - React Redux

#

First install **create-react-app** [https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app)

_&gt; npm install -g create-react-app_

&gt; create-react-app react-redux-kss



To understand what is Redux we must first understand what is the state.

A stateful React component is a Javascript ES6 class. [[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)]

In a React component the state holds up data and the component might render such data.

The state could also change in response to actions and events: to update the local component&#39;s state use setState.

# what problem does Redux solve?

A typical JavaScript application is full of states.

State is everywhere in JavaScript.

As you can see even the simplest JavaScript application has a state.

Here are some examples of state:

- what the user sees (data)
- what data are we fetching
- what URL are we showing to the user
- what items are selected inside the page
- are there errors in the applications? That&#39;s state too

As long as the application remains small, we can get by with keeping the state within a parent React component.

Then things will become tricky, when application became complex.

Also   **frontend shouldn&#39;t know about the business logic**. Ever.

So one of the alternatives for managing the state of a React component: **Redux**

**Redux solves a problem that might not be clear in the beginning** : it helps giving **each React component** the **exact piece of state** it needs.

Redux holds up the **state** within a **single location**.

Also with Redux the **logic for fetching and managing the state** lives **outside React**.

# should I learn Redux?

- Redux is **framework agnostic**. Learn it once, use it everywhere (Vue JS, Angular)

Redux is just a library among the others (like flux, mobx etc), which might of-course disappear in future :) But the **patterns will stick forever**.

# should I use Redux?

**consider using Redux** when:

- multiple React components needs to access the same state but do not have any parent/child relationship
- you start to feel awkward passing down the state to multiple components with props

Be aware that Redux is not useful for smaller apps. It really shines in bigger ones.

Dan Abramov says &quot;_Flux libraries are like glasses: you&#39;ll know when you need them._&quot;

Dan Abramov =&gt; Working on @reactjs. Co-author of Redux and Create React App.

You Might Not Need Redux [[https://medium.com/@dan\_abramov/you-might-not-need-redux-be46360cf367](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)]

# getting to know the Redux store

The store in Redux is like the human brain: it&#39;s kind of magic.

The **Redux store is fundamental** : the **state of the whole application** lives **inside the store**.

So to start playing with Redux we should **create a store for wrapping up the state**.

_&gt; yarn add redux_

Create a directory for the store:

_&gt; mkdir -p src/store_

Create a new file named index.js in src/store and finally initialize the store:

1. import{ createStore } from &quot;redux&quot;;
2. import reducer from &quot;./reducer&quot;;
3.
4. const store = createStore(reducer);
5.
6. exportdefault store;

createStore is the function for creating the Redux store. [[https://redux.js.org/api-reference/createstore](https://redux.js.org/api-reference/createstore)]

createStore takes a reducer as the first argument, [rootReducer in our case, which we will create in a while].

We may also pass an initial state to createStore. But most of the times we don&#39;t have to. Passing an initial state is useful for server side rendering. Anyway, **the state comes from reducers**.

**Problem** _: Reducer returned undefined during initialization [_ [_https://stackoverflow.com/questions/36619093/why-do-i-get-reducer-returned-undefined-during-initialization-despite-pr_](https://stackoverflow.com/questions/36619093/why-do-i-get-reducer-returned-undefined-during-initialization-despite-pr) _]_

_In Redux_ **reducers produce the state** _._

# getting to know Redux reducers

**A reducer is just a Javascript function**. A reducer **takes two parameters** : **the current state** and an **action** (more about actions soon).

Third Principle of Redux says that the state is immutable and cannot change in place.

Note: Three principle of Redux [[https://redux.js.org/introduction/three-principles](https://redux.js.org/introduction/three-principles)]

This is why the reducer must be pure. [_A pure function is one that returns the exact same output for the given input._]

In plain React the local state changes in place with setState. In Redux you cannot do that.

Lets create a file inside _src/store_ directory called _reducer.js_

1. const initialState ={
2.  articles:[]
3. };
4.
5. const reducer =(state = initialState, action)=&gt; state;
6.
7. exportdefault reducer;

In our example we created a **simple reducer taking the initial state** as the first parameter. As a **second parameter** we had provided **action**. As of now the reducer will do nothing than returning the initial state.

# getting to know Redux actions

Redux reducers are without doubt the most important concept in Redux. **Reducers produce the state of the application**.

But **how does a reducer know when to produce the next state**?

The second principle of Redux says the **only way to change the state is by sending a signal to the store**. This signal is an **action**. &quot; **Dispatching an action**&quot; is the process of sending out a signal.

**Redux actions are nothing more than Javascript objects**. This is what an action looks like:

1. {
2.  type:&#39;ADD\_ARTICLE&#39;,
3.  payload:{ name:&#39;React Redux KSS, id:1}
4. }

Every action needs a type property for describing how the state should change.

We can specify a payload as well. In the above example the payload is a new article. A reducer will add the article to the current state later.

It is a best practice to **wrap every action within a function**. Such function is an **action creator**.

Let&#39;s put everything together by creating a simple Redux action.

1. // src/store/js
2.
3. exportconst addArticle = article =&gt;({ type:&quot;ADD\_ARTICLE&quot;, payload: article });

So, the **type property** is nothing more than a string.

The reducer will use that string to determine how to calculate the next state.

Since strings are prone to typos and duplicates it&#39;s **better to have action types declared as constants**.

This approach helps **avoiding errors that will be difficult to debug**.

1. // src/store/types.js
2.
3. exportconst ADD\_ARTICLE =&quot;ADD\_ARTICLE&quot;;

Now, update the action to use action types:

1. // src/store/actions.js
2.
3. import{ ADD\_ARTICLE } from &quot;./types&quot;;
4.
5. exportconst addArticle = article =&gt;({ type: ADD\_ARTICLE, payload: article });

# refactoring the reducer

**reducer calculates the next state depending on the action type**. Moreover, **it should return at least the initial state when no action type matches**.

When the action type matches a case clause the **reducer calculates the next state** and **returns a new object**.

1. import{ ADD\_ARTICLE } from &quot;./types&quot;;
2.
3. const initialState ={
4.  articles:[]
5. };
6.
7. const reducer =(state = initialState, action)=&gt;{
8.   **switch** (action.type){
9.     **case** ADD\_ARTICLE:
10.      state.articles.push(action.payload);
11.       **return** state;
12.    default:
13.       **return** state;
14.  }
15. };
16.
17. exportdefault reducer;

Although it&#39;s valid code the **above reducer breaks** the main Redux principle: **immutability**.

[Array.prototype.push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) is an impure function: it alters the original array.

Making our reducer compliant is easy. Using [Array.prototype.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) in place of Array.prototype.push is enough to keep the initial array immutable:

1. import{ ADD\_ARTICLE } from &quot;./types&quot;;
2.
3. const initialState ={
4.  articles:[]
5. };
6.
7. const reducer =(state = initialState, action)=&gt;{
8.   **switch** (action.type){
9.     **case** ADD\_ARTICLE:
10.       **return** {...state, articles: state.articles.concat(action.payload)};
11.    default:
12.       **return** state;
13.  }
14. };
15.
16. exportdefault reducer;

With the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) we can make our reducer even better:

**return** {...state, articles:[...state.articles, action.payload]};

for **avoiding mutations in Redux** :

- [Using concat(), slice(), and …spread](https://egghead.io/lessons/react-redux-avoiding-array-mutations-with-concat-slice-and-spread) for arrays
- [Using Object.assign() and …spread](https://egghead.io/lessons/react-redux-avoiding-object-mutations-with-object-assign-and-spread) for objects

# connecting React with Redux

Redux on its own is framework agnostic. We can use it with vanilla Javascript. Or with Angular. Or with React. Or with VueJS. There are bindings for joining together Redux with your favorite framework/library or we can use redux&#39;s own functionalities.

For React there is **react-redux** , a bindings of reactJs and Redux. It&#39;s a small library for connecting Redux and React in an efficient way.

_&gt; yarn add react-redux_

# react-redux

The most important method we&#39;ll work with react-redux is **connect()**

What does react-redux&#39;s **connect** do? Unsurprisingly it connects a React component with the Redux store.

Other fundamental things to know are:

- the **mapStateToProps** function
- the **mapDispatchToProps** function

**What does mapStateToProps do** in react-redux?

mapStateToProps does exactly what its name suggests: it **connects a part of the Redux state** to the props of a React component. By doing so a connected React component will have access to the exact part of the store it needs. (So read it as **mapStoreToProps** )

**What does mapDispatchToProps** do in react-redux?

mapDispatchToProps does something similar, but for actions. **mapDispatchToProps connects Redux actions to React props**. This way a connected React component will be able to dispatch actions.

# Example:

# App component and Redux store

We saw that mapStateToProps connects a portion of the Redux state to the props of a React component. You may wonder: is this enough for connecting Redux with React? No, it&#39;s not.

To start off **connecting Redux with React we&#39;re going to use Provider**.

**Provider** is an high order component coming from react-redux.

Using layman&#39;s terms, Provider wraps up your React application and makes it aware of the entire Redux&#39;s store.

Open up src/index.js, wipe out everything and update the file with the following code:

1. import React from &quot;react&quot;;
2. import{ render } from &quot;react-dom&quot;;
3. import{ Provider } from &quot;react-redux&quot;;
4. import store from &quot;./store/index&quot;;
5. import App from &quot;./components/App&quot;;
6.
7. render(
8.  &lt;Provider store={store}&gt;
9.    &lt;App /&gt;
10.  &lt;/Provider&gt;,
11.  document.getElementById(&quot;root&quot;)
12. );

Provider wraps up your entire React application. Moreover it gets the store as a prop.

Now, create the **App** component that import a List component and render itself.

1. // src/components/App.js
2. import React from &quot;react&quot;;
3. import List from &quot;./List&quot;;
4.
5. const App =()=&gt;(
6.  &lt;div className=&quot;row mt-5&quot;&gt;
7.    &lt;div className=&quot;col-md-4 offset-md-1&quot;&gt;
8.    &lt;h2&gt;Articles&lt;/h2&gt;
9.      &lt;List /&gt;
10.    &lt;/div&gt;
11.  &lt;/div&gt;
12. );
13.
14. exportdefault App;

# List component and Redux state

our new component, List, will interact with the Redux store.

1. // src/components/List.js
2.
3. import React from &quot;react&quot;;
4. import{ connect } from &quot;react-redux&quot;;
5.
6. const mapStateToProps = state =&gt;{
7.   **return** { articles: state.articles};
8. };
9.
10. const ConnectedList =({ articles })=&gt;(
11.  &lt;ul className=&quot;list-group list-group-flush&quot;&gt;
12.    {articles.map(article =&gt;(
13.      &lt;li className=&quot;list-group-item&quot; key={article.id}&gt;
14.        {article.title}
15.      &lt;/li&gt;
16.    ))}
17.  &lt;/ul&gt;
18. );
19.
20. const List = connect(mapStateToProps)(ConnectedList);
21.
22. exportdefault List;

# Form component and Redux actions

The Form component we&#39;re going to create a **stateful component**.

_A stateful component in React is a component carrying its own local state_

Create a new file named Form.js inside src/components. It should look like the following:

1. // src/components/Form.js
2. import React,{ Component } from &quot;react&quot;;
3. import{ connect } from &quot;react-redux&quot;;
4. import uuidv1 from &quot;uuid&quot;;
5. import{ addArticle } from &quot;../store/actions&quot;;
6.
7. const mapDispatchToProps = dispatch =&gt;{
8.   **return** {
9.    addArticle: article =&gt; dispatch(addArticle(article))
10.  };
11. };
12.
13. class ConnectedForm extends Component {
14.  constructor(){
15.    super();
16.
17.     **this**.state={
18.      title:&quot;&quot;
19.    };
20.
21.     **this**.handleChange= **this**.handleChange.bind( **this** );
22.     **this**.handleSubmit= **this**.handleSubmit.bind( **this** );
23.  }
24.
25.  handleChange(event){
26.     **this**.setState({[event.target.id]: event.target.value});
27.  }
28.
29.  handleSubmit(event){
30.    event.preventDefault();
31.    const{ title }= **this**.state;
32.    const id = uuidv1();
33.     **this**.props.addArticle({ title, id });
34.     **this**.setState({ title:&quot;&quot;});
35.  }
36.
37.  render(){
38.    const{ title }= **this**.state;
39.     **return** (
40.      &lt;form onSubmit={ **this**.handleSubmit}&gt;
41.        &lt;div className=&quot;form-group&quot;&gt;
42.          &lt;label htmlFor=&quot;title&quot;&gt;Title&lt;/label&gt;
43.          &lt;input
44.            type=&quot;text&quot;
45.            className=&quot;form-control&quot;
46.            id=&quot;title&quot;
47.            value={title}
48.            onChange={ **this**.handleChange}
49.          /&gt;
50.        &lt;/div&gt;
51.        &lt;button type=&quot;submit&quot; className=&quot;btn btn-success btn-lg&quot;&gt;
52.          SAVE
53.        &lt;/button&gt;
54.      &lt;/form&gt;
55.    );
56.  }
57. }
58.
59. const Form = connect(null, mapDispatchToProps)(ConnectedForm);
60.
61. exportdefault Form;

Update App to include the Form component:

1. import React from &quot;react&quot;;
2. import List from &quot;./List&quot;;
3. import Form from &quot;./Form&quot;;
4.
5. const App =()=&gt;(
6.  &lt;div className=&quot;row mt-5&quot;&gt;
7.    &lt;div className=&quot;col-md-4 offset-md-1&quot;&gt;
8.      &lt;h2&gt;Articles&lt;/h2&gt;
9.      &lt;List /&gt;
10.    &lt;/div&gt;
11.    &lt;div className=&quot;col-md-4 offset-md-1&quot;&gt;
12.      &lt;h2&gt;Add a new article&lt;/h2&gt;
13.      &lt;Form /&gt;
14.    &lt;/div&gt;
15.  &lt;/div&gt;
16. );
17.
18. exportdefault App;

# wrapping up

**Redux protip** : the reducer will grow as our app will become bigger. We can split a big reducer into separate functions and combine them with **combineReducers** [[https://redux.js.org/docs/api/combineReducers.html](https://redux.js.org/docs/api/combineReducers.html)]

Also, we are currently following &quot; **re-ducks**&quot; structure to manage store in larger application ( [https://github.com/alexnm/re-ducks](https://github.com/alexnm/re-ducks))

Scaling your Redux App with ducks

[https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be#.4ppptx7oq](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be#.4ppptx7oq)

We have everything explained in Redux&#39;s documentation

- -- [https://redux.js.org/](https://redux.js.org/)
