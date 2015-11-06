var dojoConfig = {
    async: true,
    packages: [
        {
            name: "calclab",
            location: location.pathname.replace(/\/[^/]*$/, '') + '/resources/js/calclab'
        }, {
            name: "cm",
            location: location.pathname.replace(/\/[^/]*$/, '') + '/resources/js/lib/codemirror-5.8'
        }
    ]
};