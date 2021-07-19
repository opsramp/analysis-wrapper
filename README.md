## Analysis Wrapper

It is a sub project under [OpsRamp Analaytics SDK](https://github.com/opsramp/analytics-sdk).

It is a react project and renders the left panel for OpsRamp analytics apps.

#### Background
Since the analytics apps are written in [Dash](https://dash.plotly.com/introduction), there are lots of limitations to build custom pages. One of them is to write custom components for non standard components. This is not realistic to meet the UI requirements.

To avoid this issue, we build custom UI pages/sections using the OpsRamp design system and combine them into the apps. 

This project will be compiled into static files and be embedded into the sdk.

- Run the Project
```
npm install
npm run start
```

- Build  the project
```
npm run build
```

You get compiled js and css file under /build/static/js and /build/static/css, and put them under the SDK's /analysis-wrapper folder.

At this time, the files should be renamed _main.wrapper.js_ and _main.wrapper.css_.
