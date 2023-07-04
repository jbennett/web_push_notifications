const path = require('path')
const esbuild = require('esbuild')

const watching = process.argv.includes("--watch")

esbuild.context({
    entryPoints: ["application.js"],
    bundle: true,
    outdir: path.join(process.cwd(), "app/assets/builds"),
    absWorkingDir: path.join(process.cwd(), "app/javascript"),
    sourcemap: true,
    minify: false,
    loader: {
        '.js': 'jsx',
        '.png': 'file',
        '.svg': 'file',
        '.jpg': 'file',
    },
}).then((ctx) => {
    if (watching) {
        ctx.watch()
    } else {
        ctx.rebuild()
        ctx.dispose()
    }
}).catch(() => process.exit(1))


esbuild.context({
    entryPoints: ["service_worker.js"],
    bundle: true,
    outdir: path.join(process.cwd(), "public"),
    absWorkingDir: path.join(process.cwd(), "app/javascript"),
    sourcemap: true,
    minify: false,
    loader: {
        '.js': 'jsx',
        '.png': 'file',
        '.svg': 'file',
        '.jpg': 'file',
    },
}).then((ctx) => {
    if (watching) {
        ctx.watch()
    } else {
        ctx.rebuild()
        ctx.dispose()
    }
}).catch(() => process.exit(1))
