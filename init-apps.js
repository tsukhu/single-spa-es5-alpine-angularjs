function toggleAngularJSApp() {
  window.showAngularJSApp = !window.showAngularJSApp;
  window.showAlpineApp = false;
  singleSpa.triggerAppChange();
}

function toggleAlpineJSApp() {
  window.showAlpineApp = !window.showAlpineApp;
  window.showAngularJSApp = false;
  singleSpa.triggerAppChange();
}


// Initialize Angular JS App
const angularJSApp = window.singleSpaAngularjs.default({
  angular: angular,
  mainAngularModule: "main-module",
  uiRouter: false,
  preserveGlobal: true,
  template: "<root />",
});

angular.module("main-module", []);

angular.module("main-module").component("root", {
  template: `<div class="mui-container">
  <div class="mui-panel">
    <div class="mui--text-headline">Hello from angularjs!</div>
  </div>
  </div>
  `,
  controllerAs: "vm",
  controller: function () {
    var vm = this;

    vm.$onInit = function () {
      console.log("mounting root angular component");
    };

    vm.$onDestroy = function () {
      console.log("unmounting root angular component!");
    };
  },
});

const appTemplate = (props) = Promise.resolve(`
<div class="mui-container">
<div>
<div class="mui-panel">
<div class="mui--test-display1"> Test x-show</div>
    <button class="mui-btn mui-btn--primary" @click="open = !open">
      Open/Close
    </button>
    <div x-show="open" class="mui--text-display4">
      Hey, I'm open
    </div>
    </div>
    <div class="mui-panel">
    <div class="mui--test-display1"> Test x-model input binding</div>
    <div x-data="{ name: 'Single SPA Integrated AlpineJS'}">
      <div class="mui-textfield">
        <input type="text" name="name" id="name" x-model="name" />
      </div>
      <div class="mui--test-display2">
        My name is <span x-text="name"></span>
      </div>
    </div>
    </div>
    <div class="mui-panel">
    <div class="mui--test-display1"> TODO App Test </div>
    <div x-data="{ todos: ['Learn Single-SPA', 'Try AlpineJS'], newTodo: 'Integrate'}">
      <div class="mui-textfield">
        <input type="text" name="todo" id="todo" x-model="newTodo" />
      </div>
      <button class="mui-btn mui-btn--primary" @click="todos.push(newTodo)">
        Add
      </button>

      <table class="mui-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        <template x-for="todo in todos" :key="todo">
          <tr>
            <td x-text="todo""></td>
            <td><button class="mui-btn mui-btn--small mui-btn--fab mui-btn--danger"  @click="todos = todos.filter(item => item !== todo)">
            -
          </button></td>
          </tr>
          </template>

        </tbody>
      </table>
      
    </div>
  </div>
  </div>
  <div class="mui-panel">
  <div class="mui--test-display1"> Test x-bind to change background color (red/purple) on even/odd numbers </div>
  <div x-data="{ count: 0}">
    <div class="mui-textfield">
      <input type="text" name="count" id="count" x-model="count" />
    </div>
    <div x-bind:class="{ 'mui--bg-color-red-500': count %2 === 0, 'mui--bg-color-purple-500': count %2 !== 0}">
      Big when even
    </div>
  </div>
  </div>
  </div>
`);
// Initialize Alpine JS App
const alpineApp = window.singleSpaAlpineJs({
  template: (props) => appTemplate,
  xData: () => ({ open: false }),
});

singleSpa.registerApplication({
  name: "my-alpine-app",
  app: alpineApp,
  activeWhen: () => window.showAlpineApp, //parseQuery(document.location.search).app === "alpine",
});

singleSpa.registerApplication({
  name: "my-angularjs-app",
  app: angularJSApp,
  activeWhen: () => window.showAngularJSApp, //parseQuery(document.location.search).app === "angularjs",
});

singleSpa.start();
