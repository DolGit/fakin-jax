Fakes webpack's `require.context`, [detailed here](https://github.com/webpack/docs/wiki/context#requirecontext)
Takes four arguments (one additional to the webpack function)

1) Relative context path, e.g. '../../my-folder-to-load'
2) scan sub directories, e.g. go through the child folders
3) regex to match
4) (Additional) dirname, pass in `__dirname`, otherwise it finds the paths relative to where the context index file is.
