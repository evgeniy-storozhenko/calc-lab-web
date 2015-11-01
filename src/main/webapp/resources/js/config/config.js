// Instead of using data-dojo-config, we're creating a dojoConfig
// object *before* we load dojo.js; they're functionally identical,
// it's just easier to read this approach with a larger configuration.
var dojoConfig = {
    async: true,
    // This code registers the correct location of the "demo"
    // package so we can load Dojo from the CDN whilst still
    // being able to load local modules
    packages: [{
        name: "demo",
        location: location.pathname.replace(/\/[^/]*$/, '') + '/demo'
    }]
};